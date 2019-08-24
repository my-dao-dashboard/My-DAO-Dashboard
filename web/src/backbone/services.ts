import Web3 from 'web3'

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

export const accountService = new AccountService()
