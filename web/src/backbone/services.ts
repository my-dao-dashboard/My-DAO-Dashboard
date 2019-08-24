import Web3 from 'web3'
import {DaoInstanceState} from "./State";
import aragonTokenABI from './aragon-token.abi.json'
import aragonTokenControllerABI from './aragon-token-controller.abi.json'

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

export class DaosService {
    private readonly web3: Web3

    constructor (private readonly accountService: AccountService) {
        this.web3 = accountService.web3()
    }

    async getDaos (address: string): Promise<Array<DaoInstanceState>> {
        const endpoint = `http://api.etherscan.io/api?module=account&action=tokentx&address=${address}#tokentxns&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`
        const data = await fetch(endpoint)
        const body = await data.json()
        const tokenTransactions = body.result
        const tokenContracts = uniq<string>(tokenTransactions.map((t: any) => t.contractAddress))
        let aragonKernels = []
        for await (const contractAddress of tokenContracts) {
            const contract = new this.web3.eth.Contract(aragonTokenABI, contractAddress)
            const signature = await contract.methods.controller().encodeABI()
            const isAragonToken = await hasMethod(this.web3, contractAddress, signature)
            if (isAragonToken) {
                const controllerAddress = await contract.methods.controller().call()
                const controller = new this.web3.eth.Contract(aragonTokenControllerABI, controllerAddress)
                const kernel = await controller.methods.kernel().call()
                const dao = {
                    address: kernel
                }
                aragonKernels.push(dao)
            }
        }
        return aragonKernels
    }
}

export const accountService = new AccountService()
export const dasosService = new DaosService(accountService)
