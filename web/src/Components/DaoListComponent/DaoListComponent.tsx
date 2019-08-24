import { Card, List, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DaoInstanceState, State } from "../../backbone/State";

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
                <Link to={"/dao/" + item.address}>
                  <Card hoverable>
                    <Meta
                      title={item.name}
                      description={
                        <>
                          <p>Balance: {item.shareBalance.toNumber()}</p>
                          <p>Supply: {item.totalSupply.toString()}</p>
                          <p>
                            <a href={`https://mainnet.aragon.org/#/${item.address}`} target="_blank" rel="noopener noreferrer">
                              {item.address}
                            </a>
                          </p>
                          <Tag color="cyan">{item.kind}</Tag>
                        </>
                      }
                    />
                  </Card>
                </Link>
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