import Web3 from "web3";

export function isAddress(something: string) {
  return new Web3().utils.isAddress(something);
}
