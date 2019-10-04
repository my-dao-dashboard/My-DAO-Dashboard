import React from "react";
import { Card, List, Progress, Statistic, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import DaoLinkComponent from "../dao/dao-link.component";
import DaoTagView from "../dao-tag.view";
import { Dao } from "../../model/dao";

interface Props {
  daos: Dao[];
}

export const DaoListView: React.FC<Props> = props => {
  return (
    <div className="DAOs">
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
        dataSource={props.daos}
        renderItem={item => (
          <>
            <List.Item>
              <Link to={"/dao/" + item.address}>
                <Card hoverable>
                  <Meta
                    title={item.name}
                    description={
                      <>
                        <p>
                          <DaoLinkComponent type={item.kind} address={item.address} />
                        </p>
                        <div style={{ maxWidth: "60%" }}>
                          <Statistic title="Balance" value={item.usdBalance} precision={2} prefix={"$"} />

                          <div className="ant-statistic-title">
                            <Tooltip title={Number((item.shareBalance / item.totalSupply) * 100).toFixed(2) + "%"}>
                              Voting power{" "}
                              <small>
                                ({Math.round(item.shareBalance * 100) / 100} of{" "}
                                {Math.round(item.totalSupply * 100) / 100})
                              </small>
                            </Tooltip>
                          </div>
                          <Tooltip title={Number((item.shareBalance / item.totalSupply) * 100).toFixed(2) + "%"}>
                            <Progress
                              percent={Math.round((item.shareBalance / item.totalSupply) * 100)}
                              status="active"
                            />
                          </Tooltip>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <DaoTagView type={item.kind} />
                        </div>
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
};
