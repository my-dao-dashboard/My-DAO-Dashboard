import { API_ENDPOINT, EtherscanService } from "./etherscan.service";
import fetchMock from "fetch-mock";

describe("constructor", () => {
  it("set default api endpoint", () => {
    const service = new EtherscanService();
    expect(service.apiEndpoint).toEqual(API_ENDPOINT);
  });

  it("set api endpoint", () => {
    const endpoint = "foo";
    const service = new EtherscanService(endpoint);
    expect(service.apiEndpoint).toEqual(endpoint);
  });
});

describe("#tokenContractsByAccount", () => {
  const ACCOUNT = "0x421E56cA6E4B03350188CEc58d053B427245665d";
  const TOKEN_ADDRESS = "0x42d6622dece394b54999fbd73d108123806f6a18";

  it("fetch etherscan", async () => {
    const service = new EtherscanService();
    const endpoint = service.tokenContractsByAccountUrl(ACCOUNT);
    fetchMock.mock(endpoint, {
      status: 200,
      body: {
        status: "1",
        message: "OK",
        result: [
          {
            blockNumber: "8542033",
            timeStamp: "1568387546",
            hash: "0xa2acc767ee7b547a28d0f8d15d086bd1598a4f587117ce238fc9d49aa9d6b3bb",
            nonce: "2",
            blockHash: "0x251ceaf2cfe9705a02cdc94f09b312d1a8738c5c8c3690a322d3de14dc03d357",
            from: "0x9000a8abe4828a7b801c0d46179a43815c37611a",
            contractAddress: TOKEN_ADDRESS,
            to: "0x421e56ca6e4b03350188cec58d053b427245665d",
            value: "300000000000000000000000",
            tokenName: "SPANK",
            tokenSymbol: "SPANK",
            tokenDecimal: "18",
            transactionIndex: "81",
            gas: "77392",
            gasPrice: "20000000000",
            gasUsed: "51659",
            cumulativeGasUsed: "4395626",
            input: "deprecated",
            confirmations: "101093"
          },
          {
            blockNumber: "8559500",
            timeStamp: "1568623606",
            hash: "0xaece13d8ba8e776da0fb08d4a5d0c0757bf9af1fda25d2f7558a42be17dbc12c",
            nonce: "7",
            blockHash: "0x3197b30d4490463fa540ece876e72af7866a79a7e40dea1e10d70e6af1cb1c03",
            from: "0x421e56ca6e4b03350188cec58d053b427245665d",
            contractAddress: "0x42d6622dece394b54999fbd73d108123806f6a18",
            to: "0xbac675c310721717cd4a37f6cbea1f081b1c2a07",
            value: "100000000000000000000000",
            tokenName: "SPANK",
            tokenSymbol: "SPANK",
            tokenDecimal: "18",
            transactionIndex: "123",
            gas: "54988",
            gasPrice: "22000000000",
            gasUsed: "51659",
            cumulativeGasUsed: "5883445",
            input: "deprecated",
            confirmations: "83626"
          }
        ]
      }
    });
    const tokens = await service.tokenContractsByAccount("0x421E56cA6E4B03350188CEc58d053B427245665d");
    expect(tokens.length).toEqual(1);
    expect(tokens).toEqual([TOKEN_ADDRESS]);
    fetchMock.restore();
  });
});
