import BigNumber from "bignumber.js";
import Web3 from "web3";
import Contract from "web3/eth/contract";
import erc20ABI from "../abis/erc20.abi.json";
import { BalanceEntry } from "../model/balance-entry";

const ANT_ADDRESS = "0x960b236A07cf122663c4303350609A66A7B288C0";
const DAI_ADDRESS = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
const GEN_ADDRESS = "0x543ff227f64aa17ea132bf9886cab5db55dcaddf";
const TACO_ADDRESS = "0x36efe52b14e4d0ca4e3bd492488272e1fb2d7e1b";

export class BalanceService {
  private readonly antContract: Contract;
  private readonly daiContract: Contract;
  private readonly genContract: Contract;
  private readonly tacoContract: Contract;

  constructor(private readonly web3: Web3) {
    this.antContract = new this.web3.eth.Contract(erc20ABI, ANT_ADDRESS);
    this.daiContract = new this.web3.eth.Contract(erc20ABI, DAI_ADDRESS);
    this.genContract = new this.web3.eth.Contract(erc20ABI, GEN_ADDRESS);
    this.tacoContract = new this.web3.eth.Contract(erc20ABI, TACO_ADDRESS);
  }

  public async assetPrice(symbol: string): Promise<number> {
    const endpoint = `https://data.messari.io/api/v1/assets/${symbol}/metrics`;
    const response = await fetch(endpoint);
    const payload = await response.json();
    return payload.data.market_data.price_usd;
  }

  public async balance(address: string): Promise<BalanceEntry[]> {
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
