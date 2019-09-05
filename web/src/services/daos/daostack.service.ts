import { DaoInstanceState, DaoKind } from "../../backbone/State";
import ApolloClient, { gql } from "apollo-boost";
import BigNumber from "bignumber.js";
import { BalanceService } from "../../backbone/balance.service";

export class DaostackService {
  private readonly daostackApollo: ApolloClient<unknown>;

  constructor(private readonly balanceService: BalanceService) {
    this.daostackApollo = new ApolloClient({
      uri: "https://subgraph.daostack.io/subgraphs/name/v24"
    });
  }

  public async all(address: string): Promise<DaoInstanceState[]> {
    const results = await this.daostackApollo.query({
      query: gql`
          query {
              reputationHolders(where: { address: "${address}" }) {
                  id
                  contract
                  address
                  balance
                  dao {
                      id
                      name
                      reputationHoldersCount
                      nativeToken {
                          id
                          name
                          symbol
                          totalSupply
                      }
                      nativeReputation {
                          id
                          totalSupply
                      }
                  }
              }
          }
      `
    });

    const holdings: DaoInstanceState[] = await Promise.all(
      await results.data.reputationHolders.map(async (holder: any) => {
        const balance = await this.balanceService.balance(holder.dao.id);
        const usdBalance = balance.reduce((acc, cur) => acc + cur.usdValue, 0);

        return {
          address: holder.dao.id,
          name: holder.dao.name,
          kind: DaoKind.DAOSTACK,
          shareBalance: new BigNumber(holder.balance).dividedBy(10 ** 18).toNumber(),
          totalSupply: new BigNumber(holder.dao.nativeReputation.totalSupply).dividedBy(10 ** 18).toNumber(),
          balance,
          usdBalance
        } as DaoInstanceState;
      })
    );

    return holdings;
  }
}
