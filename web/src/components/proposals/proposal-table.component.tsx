import { Badge, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { Component } from "react";
import DaoIconLinkComponent from "./dao-icon-link.component";
import DaoTagView from "../dao-tag.view";
import { ProposalColumn } from "../../model/proposal-column";
import { VoteCount } from "../../model/vote-count";
import { Dao } from "../../model/dao";

interface IProps {
  open: boolean;
  source: ProposalColumn[];
}

export default class ProposalTableComponent extends Component<IProps> {
  public render() {
    return (
      <>
        <Table dataSource={this.props.source} scroll={{ x: true }}>
          <Column
            title=""
            dataIndex="key"
            key="key"
            render={text => {
              if (this.props.open) {
                return <Badge status="success" />;
              }
              return <Badge status="error" />;
            }}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            sorter={(a: any, b: any) => {
              if (a.description < b.description) {
                return -1;
              }
              if (a.description > b.description) {
                return 1;
              }
              return 0;
            }}
          />
          <Column
            title="Type"
            dataIndex="type"
            key="type"
            render={text => <DaoTagView type={text} />}
            sorter={(a: any, b: any) => a.type - b.type}
          />
          <Column
            title="Yes-No (Total)"
            dataIndex="votes"
            key="votes"
            render={(votes: VoteCount) => {
              if (votes) {
                return `${Math.round(votes.yes)} - ${Math.round(votes.no)} (${Math.round(votes.total)})`;
              }
              return "";
            }}
          />
          <Column
            title="Created"
            dataIndex="deadline"
            key="deadline"
            render={text => text.toLocaleDateString()}
            sorter={(a: any, b: any) => a.deadline - b.deadline}
          />
          <Column
            title=""
            dataIndex="dao"
            key="dao"
            render={(dao: Dao, vote: ProposalColumn) => (
              <DaoIconLinkComponent type={dao.kind} dao={dao.address} vote={String(vote.id)} />
            )}
          />
        </Table>
      </>
    );
  }
}
