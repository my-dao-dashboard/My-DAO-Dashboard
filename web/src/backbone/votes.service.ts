import Web3 from 'web3'
import {AccountService} from "./account.service";
import aragonKernelABI from "./aragon-kernel.abi.json";
import aragonVotingABI from "./aragon-voting.abi.json";
import BigNumber from "bignumber.js";

function isMinting(txInput: string) {
    return txInput.indexOf('d948d468') >= 0
}

export enum TransactionKind {
    MINTING = 'MINTING',
    WHATEVER = 'WHATEVER'
}

export enum VoteStatus {
    OPEN = 'OPEN',
    ENACTED = 'ENACTED',
    REJECTED = 'REJECTED'
}

const MINTING_MARK = '40c10f19'

async function parseMinting(web3: Web3, voteId: number, creator: string, txInput: string, blockNumber: number, votingAddress: string, voteStatus: VoteStatus) {
    const markIndex = txInput.indexOf(MINTING_MARK)
    const txStuff = txInput.slice(markIndex, txInput.length)
    const amount = web3.eth.abi.decodeParameter('uint256', txStuff.slice(txStuff.length - 64, txStuff.length))
    const humanAmount = new BigNumber(amount).dividedBy(10 ** 18).toNumber()
    const address = web3.eth.abi.decodeParameter('address', txStuff.slice(txStuff.length - 128, txStuff.length - 64))
    const title = `Minting ${humanAmount} tokens to ${address}`
    const block = await web3.eth.getBlock(blockNumber)
    const timestamp = new Date(block.timestamp * 1000)
    return {
        kind: TransactionKind.MINTING,
        creator,
        voteId,
        title,
        timestamp,
        votingAddress,
        status: voteStatus
    }
}

async function parseTx(web3: Web3, voteId: number, creator: string, txInput: string, blockNumber: number, votingAddress: string, voteStatus: VoteStatus) {
    const block = await web3.eth.getBlock(blockNumber)
    const timestamp = new Date(block.timestamp * 1000)
    return {
        kind: TransactionKind.WHATEVER,
        creator,
        voteId,
        title: `Proposal by ${creator}`,
        timestamp,
        votingAddress,
        status: voteStatus
    }
}

export class VotesService {
    private readonly web3: Web3
    constructor (private readonly accountService: AccountService) {
        this.web3 = accountService.web3()
    }

    async getVotes(kernelAddress: string) {
        const kernelContract = new this.web3.eth.Contract(aragonKernelABI, kernelAddress)
        // kind appId
        const votingImplementationAddress = await kernelContract.methods.apps('0xf1f3eb40f5bc1ad1344716ced8b8a0431d840b5783aea1fd01786bc26f35ac0f', '0x9fa3927f639745e587912d4b0fea7ef9013bf93fb907d29faeab57417ba6e1d4').call()
        console.log('kernel', kernelAddress)
        console.log('expected', '0xe9FB3a91a30b9B61EE9C50cDc20864EeB9d4c906', votingImplementationAddress)
        console.log(kernelContract.options.address)
        const setAppEvents = await kernelContract.getPastEvents('allEvents', {
            fromBlock: 0,
            toBlock: 'latest',
            topics: ['0xd880e726dced8808d727f02dd0e6fdd3a945b24bfee77e13367bcbe61ddbaf47']
        })
        const filter = setAppEvents.find((event: any | undefined) => {
            const data = event.raw.data
            return data.includes('9fa3927f639745e587912d4b0fea7ef9013bf93fb907d29faeab57417ba6e1d4')
        })
        const raw = Buffer.from(filter!.raw!.data.slice(2, filter!.raw!.data.length), 'hex')
        const votingAddress = this.web3.eth.abi.decodeParameter('address', raw.slice(0, 32).toString('hex'))
        const votingContract = new this.web3.eth.Contract(aragonVotingABI, votingAddress)
        const startVoteEvents = await votingContract.getPastEvents('StartVote', {
            fromBlock: 0, toBlock: 'latest'
        })
        for await (const event of startVoteEvents) {
            const creator = event.returnValues.creator
            const voteId = Number(event.returnValues.voteId)
            const transactionHash = event.transactionHash
            const tx = await this.web3.eth.getTransaction(transactionHash)
            const txInput = tx.input.replace('0x', '')
            const functionCallIndex = txInput.indexOf(MINTING_MARK)
            const voteEntry = await votingContract.methods.getVote(voteId).call()
            let voteStatus: VoteStatus = VoteStatus.REJECTED
            if (voteEntry.executed && !voteEntry.open) {
                voteStatus = VoteStatus.ENACTED
            } else if (!voteEntry.executed && voteEntry.open) {
                voteStatus = VoteStatus.OPEN
            }
            if (functionCallIndex >= 0) {
                const parsed = await parseMinting(this.web3, voteId, creator, txInput, tx.blockNumber, votingAddress, voteStatus)
                console.log(parsed)
            } else {
                const parsedWhatever = await parseTx(this.web3, voteId, creator, txInput, tx.blockNumber, votingAddress, voteStatus)
                console.log(txInput)
                console.log(parsedWhatever)
            }
        }
    }
}
