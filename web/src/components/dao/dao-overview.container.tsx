import React from "react";
import DaoTag from "../DaoTag";
import DaoLink from "../DaoLink";
import { Progress, Statistic, Tooltip } from "antd";
import { DaoInstanceState } from "../../backbone/State";

interface Props {
  dao: DaoInstanceState
}

export const DaoOverviewContainer: React.FC<Props> = props => {
  return (
    <div>
      <h2 style={{ display: "inline" }}>{props.dao.name}</h2> &nbsp; <DaoTag type={props.dao.kind} />
      <br />
      <DaoLink type={props.dao.kind} address={props.dao.address} />
      <br />
      <div style={{ maxWidth: "300px" }}>
        <Statistic title="Balance" value={props.dao.usdBalance} precision={2} />

        <Tooltip title={Number((props.dao.shareBalance / props.dao.totalSupply) * 100).toFixed(2) + "%"}>
          <div className="ant-statistic-title">
            Voting power{" "}
            <small>
              ({props.dao.shareBalance} of {props.dao.totalSupply})
            </small>
          </div>
          <Progress
            percent={Math.round((props.dao.shareBalance / props.dao.totalSupply) * 100)}
            status="active"
          />
        </Tooltip>
      </div>
      <br />
      <br />
      <div>
        {props.children}
      </div>
    </div>
  );
};
