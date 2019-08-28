import BigNumber from "bignumber.js";
import Web3 from "web3";
import Contract from "web3/eth/contract";
import erc20ABI from "../abis/erc20.abi.json";
import { AccountService } from "./account.service";

const DAI_ADDRESS = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
const TACO_ADDRESS = "0x36efe52b14e4d0ca4e3bd492488272e1fb2d7e1b";

export interface IBalanceEntry {
  symbol: string;
  name: string;
  contractAddress: string;
  value: BigNumber;
  usdValue: number;
}

export class BalanceService {
  private readonly web3: Web3;
  private readonly daiContract: Contract;
  private readonly tacoContract: Contract;

  constructor(public readonly accountService: AccountService) {
    this.web3 = accountService.web3();
    this.daiContract = new this.web3.eth.Contract(erc20ABI, DAI_ADDRESS);
    this.tacoContract = new this.web3.eth.Contract(erc20ABI, TACO_ADDRESS);
  }

  public async assetPrice(symbol: string): Promise<number> {
    const endpoint = `https://data.messari.io/api/v1/assets/${symbol}/metrics`;
    const response = await fetch(endpoint);
    const payload = await response.json();
    return payload.data.market_data.price_usd;
  }

  public async balance(address: string): Promise<IBalanceEntry[]> {
    const ethBalance = new BigNumber(await this.web3.eth.getBalance(address));
    const ethBalanceUsd = ethBalance.dividedBy(10 ** 18).multipliedBy(await this.assetPrice("ETH"));
    const daiBalance = new BigNumber(await this.daiContract.methods.balanceOf(address).call());
    const daiBalanceUsd = daiBalance.dividedBy(10 ** 18).multipliedBy(await this.assetPrice("DAI"));
    const tacoBalance = await this.tacoContract.methods.balanceOf(address).call();
    return [
      {
        symbol: "ETH",
        name: "Ether",
        contractAddress: "0x00",
        value: ethBalance,
        usdValue: ethBalanceUsd.toNumber()
      },
      {
        symbol: "DAI",
        name: "DAI",
        contractAddress: DAI_ADDRESS,
        value: daiBalance,
        usdValue: daiBalanceUsd.toNumber()
      },
      {
        symbol: "TACO",
        name: "MetaCartel Tacos",
        contractAddress: TACO_ADDRESS,
        value: new BigNumber(tacoBalance),
        usdValue: 0
      }
    ];
  }
}
