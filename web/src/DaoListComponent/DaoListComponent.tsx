import { Card, List, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { connect } from "react-redux";
import { DaoInstanceState, State } from "../backbone/State";

interface StateProps {
  daos: Array<DaoInstanceState>;
}

export class DaoListComponent extends React.Component<StateProps> {
  public render() {
    return (
      <div>
        <h2>Participating DAO's</h2>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4
          }}
          dataSource={this.props.daos}
          renderItem={item => (
            <>
              <List.Item>
                <Card hoverable>
                  <Meta
                    title={item.name}
                    description={
                      <>
                        <p>Balance: {item.balance.toNumber()}</p>
                        <p>Supply: {item.totalSupply.toString()}</p>
                        <p>
                          <a href={`https://etherscan.io/address/${item.address}`} target="_blank">
                            {item.address}
                          </a>
                        </p>
                        <Tag color="cyan">{item.kind}</Tag>
                      </>
                    }
                  />
                </Card>
              </List.Item>
            </>
          )}
        />
      </div>
    );
  }
}

function stateToProps(state: State): StateProps {
  return {
    daos: state.daos.daos!
  };
}

export default connect(stateToProps)(DaoListComponent);
