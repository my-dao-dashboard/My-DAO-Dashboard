import BigNumber from "bignumber.js";
import Web3 from "web3";
import Contract from "web3/eth/contract";
import erc20ABI from "../abis/erc20.abi.json";
import { Asset } from "../model/asset";
import { ANT_ADDRESS, DAI_ADDRESS, GEN_ADDRESS, TACO_ADDRESS } from "../constants";
import { MessariService } from "./messari.service";
import { first } from "rxjs/operators";

export class BalanceService {
  private readonly antContract: Contract;
  private readonly daiContract: Contract;
  private readonly genContract: Contract;
  private readonly tacoContract: Contract;

  constructor(private readonly web3: Web3, private readonly messariService: MessariService) {
    this.antContract = new this.web3.eth.Contract(erc20ABI, ANT_ADDRESS);
    this.daiContract = new this.web3.eth.Contract(erc20ABI, DAI_ADDRESS);
    this.genContract = new this.web3.eth.Contract(erc20ABI, GEN_ADDRESS);
    this.tacoContract = new this.web3.eth.Contract(erc20ABI, TACO_ADDRESS);
  }

  public async assetPrice(symbol: string): Promise<number> {
    return this.messariService.assetPrice(symbol).pipe(first()).toPromise()
  }

  public async balance(address: string): Promise<Asset[]> {
    const ethBalance = new BigNumber(await this.web3.eth.getBalance(address));
    const ethBalanceUsd = ethBalance.dividedBy(10 ** 18).multipliedBy(await this.assetPrice("ETH"));
    const antBalance = new BigNumber(await this.antContract.methods.balanceOf(address).call());
    const antBalanceUsd = antBalance.dividedBy(10 ** 18).multipliedBy(await this.assetPrice("ANT"));
    const daiBalance = new BigNumber(await this.daiContract.methods.balanceOf(address).call());
    const daiBalanceUsd = daiBalance.dividedBy(10 ** 18).multipliedBy(await this.assetPrice("DAI"));
    const genBalance = new BigNumber(await this.genContract.methods.balanceOf(address).call());
    const genBalanceUsd = genBalance.dividedBy(10 ** 18).multipliedBy(await this.assetPrice("GEN"));
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
        symbol: "ANT",
        name: "ANT",
        contractAddress: ANT_ADDRESS,
        value: antBalance,
        usdValue: antBalanceUsd.toNumber()
      },
      {
        symbol: "DAI",
        name: "DAI",
        contractAddress: DAI_ADDRESS,
        value: daiBalance,
        usdValue: daiBalanceUsd.toNumber()
      },
      {
        symbol: "GEN",
        name: "GEN",
        contractAddress: GEN_ADDRESS,
        value: genBalance,
        usdValue: genBalanceUsd.toNumber()
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
