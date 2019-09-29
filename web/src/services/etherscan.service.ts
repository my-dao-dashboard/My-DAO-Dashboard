import _ from "underscore";

export interface EtherscanTokenTxResponse {
  status: string;
  message: string;
  result: Array<{ contractAddress: string }>;
}

export const API_ENDPOINT = "https://api.etherscan.io/api";

export class EtherscanService {
  constructor(readonly apiEndpoint: string = API_ENDPOINT) {}

  tokenContractsByAccountUrl(account: string): string {
    const endpoint = new URL(this.apiEndpoint);
    endpoint.searchParams.set("module", "account");
    endpoint.searchParams.set("action", "tokentx");
    endpoint.searchParams.set("address", account);
    endpoint.searchParams.set("startblock", "0");
    endpoint.searchParams.set("endblock", "999999999");
    endpoint.searchParams.set("sort", "asc");
    return endpoint.toString();
  }

  async tokenContractsByAccount(account: string): Promise<string[]> {
    const endpoint = this.tokenContractsByAccountUrl(account);
    const response: Response = await fetch(endpoint);
    const data = (await response.json()) as EtherscanTokenTxResponse;
    return _.uniq<string, string>(data.result.map((t: any) => t.contractAddress));
  }
}
