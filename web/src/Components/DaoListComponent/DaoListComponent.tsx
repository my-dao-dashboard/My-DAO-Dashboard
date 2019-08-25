import { Card, List, Progress, Statistic } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DaoInstanceState, State } from "../../backbone/State";
import DaoLink from "../DaoLink";
import DaoTag from "../DaoTag";

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
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3
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
                        <p><DaoLink type={item.kind} address={item.address} /></p>
                        <div style={{ maxWidth: "60%"}}>
                          <Statistic title="Balance" value={item.usdBalance} precision={2} prefix={'$'} />
                          
                          <div className="ant-statistic-title">Voting power <small>({item.shareBalance} of {item.totalSupply})</small></div>
                          <Progress percent={
                              Math.round((item.shareBalance / item.totalSupply) * 100)} status="active" />
                        </div>
                        <div style={{ textAlign: "right" }}><DaoTag type={item.kind} /></div>
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
