import Web3 from "web3";
import { Web3Service } from "./web3Service";

const infura: string = "https://mainnet.infura.io/v3/1704f40805834d76b667f4228594b051";

it("creates a new instance", () => {
  console.log("create new");
  const web3Service = new Web3Service();

  expect(Web3Service).toBeDefined();
  expect(web3Service).toBeInstanceOf(Web3Service);
});

it("creates a new instance with provided web3", () => {
  console.log("create infura");
  const web3 = new Web3(new Web3.providers.HttpProvider(infura));
  const web3Service = new Web3Service(web3);

  expect(Web3Service).toBeDefined();
  expect(web3Service).toBeInstanceOf(Web3Service);
});
