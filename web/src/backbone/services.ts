import Web3 from 'web3'
import {DaoInstanceState, DaoKind} from "./State";
import aragonTokenABI from './aragon-token.abi.json'
import aragonTokenControllerABI from './aragon-token-controller.abi.json'
import ApolloClient, {gql} from 'apollo-boost';
import BigNumber from "bignumber.js";

export class AccountService {
    web3 (): Web3 {
        const provider = (window as any).web3.currentProvider
        return new Web3(provider)
    }

    async getAddress (): Promise<string> {
        const addresses = await this.web3().eth.getAccounts()
        return addresses[0]
    }
}

function uniq<A>(array: Array<A>): Array<A> {
    return array.filter((v, i) => {
        return array.indexOf(v) === i;
    })
}

async function hasMethod (web3: Web3, contractAddress: string, signature: string): Promise<boolean> {
    const code = await web3.eth.getCode(contractAddress);
    return code.indexOf(signature.slice(2, signature.length)) > 0;
}

const rABI = [{"constant":true,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"},{"name":"contentTypes","type":"uint256"}],"name":"ABI","outputs":[{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],"name":"setPubkey","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"content","outputs":[{"name":"ret","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"addr","outputs":[{"name":"ret","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],"name":"setABI","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"name","outputs":[{"name":"ret","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"name","type":"string"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes32"}],"name":"setContent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"pubkey","outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"addr","type":"address"}],"name":"setAddr","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"ensAddr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"a","type":"address"}],"name":"AddrChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes32"}],"name":"ContentChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"name","type":"string"}],"name":"NameChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"contentType","type":"uint256"}],"name":"ABIChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"y","type":"bytes32"}],"name":"PubkeyChanged","type":"event"}]

export class DaosService {
    private readonly web3: Web3
    private readonly ensApollo: ApolloClient<unknown>
    private names: Map<string, Map<string, string>> = new Map()

    constructor (private readonly accountService: AccountService) {
        this.web3 = accountService.web3()
        this.ensApollo = new ApolloClient({
            uri: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
        })
    }

    async fetchName(parent: string, labelhash: string, skip: number = 0): Promise<string | null> {
        const page = await this.ensApollo.query({
            query: gql`
                query {
                    domain(id: "${parent}") {
                        subdomains(orderBy: id, skip: ${skip}) {
                            labelName
                            labelhash
                        }
                    }
                }
            `
        })
        const subdomains = page.data.domain.subdomains as Array<{labelName: string, labelhash: string}>
        const found = subdomains.find(s => s.labelhash === labelhash)
        if (found) {
            return found.labelName
        } else {
            return this.fetchName(parent, labelhash, skip + 100);
        }
    }

    async getDaos (address: string): Promise<Array<DaoInstanceState>> {
        const endpoint = `http://api.etherscan.io/api?module=account&action=tokentx&address=${address}#tokentxns&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`
        const data = await fetch(endpoint)
        const body = await data.json()
        const tokenTransactions = body.result
        const tokenContracts = uniq<string>(tokenTransactions.map((t: any) => t.contractAddress))
        let aragonKernels = []
        for await (const contractAddress of tokenContracts) {
            const tokenContract = new this.web3.eth.Contract(aragonTokenABI, contractAddress)
            const signature = await tokenContract.methods.controller().encodeABI()
            const isAragonToken = await hasMethod(this.web3, contractAddress, signature)
            if (isAragonToken) {
                const controllerAddress = await tokenContract.methods.controller().call()
                const controller = new this.web3.eth.Contract(aragonTokenControllerABI, controllerAddress)
                const kernel: string = await controller.methods.kernel().call()
                const a = await this.ensApollo.query({
                    query: gql`
                        query {
                            domains(where: {resolvedAddress: "${kernel.toLowerCase()}"}) {
                                name
                                labelhash
                                parent {
                                    id
                                }
                            }    
                        }
                    `
                })
                const labelHash = a.data.domains[0].labelhash
                const parentId = a.data.domains[0].parent.id.toLowerCase()
                const name = await this.fetchName(parentId, labelHash);
                const balance = await tokenContract.methods.balanceOf(address).call()
                const totalSupply = await tokenContract.methods.totalSupply().call()
                const dao: DaoInstanceState = {
                    address: kernel,
                    name: name,
                    kind: DaoKind.ARAGON,
                    balance: new BigNumber(balance),
                    totalSupply: new BigNumber(totalSupply)
                }
                aragonKernels.push(dao)
            }
        }
        console.log(aragonKernels)
        return aragonKernels
    }
}

export const accountService = new AccountService()
export const dasosService = new DaosService(accountService)
