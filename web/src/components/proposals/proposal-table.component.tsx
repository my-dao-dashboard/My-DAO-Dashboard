import { Badge, Divider, Icon, Table, Tooltip } from "antd";
import Column from "antd/lib/table/Column";
import React, { Component } from "react";
import DaoIconLinkComponent from "./dao-icon-link.component";
import DaoTagView from "../dao-tag.view";
import { ProposalColumn } from "../../model/proposal-column";
import { VoteCount } from "../../model/vote-count";
import { DaoInstanceState } from "../../model/dao-instance-state";

interface IProps {
  open: boolean;
  source: ProposalColumn[];
}

export default class ProposalTableComponent extends Component<IProps> {
  public async voteProposal(pass: any, vote: ProposalColumn) {
    // const contract = new Web3Service().contract(daostackVoting, "0x332B8C9734b4097dE50f302F7D9F273FFdB45B84");
    // console.log(contract);

    if (pass) {
      console.log("VOTE: Pass");
    } else {
      console.log("VOTE: Fail");
    }
  }

  public renderActions(vote: ProposalColumn) {
    if (this.props.open) {
      return (
        <>
          <a href="#" onClick={this.voteProposal.bind(this, true, vote)}>
            <Tooltip title="Vote for">
              <Icon type="like" theme="twoTone" twoToneColor="#52c41a" />
            </Tooltip>
          </a>
          <Divider type="vertical" />
          <a href="#" onClick={this.voteProposal.bind(this, false, vote)}>
            <Tooltip title="Vote against">
              <Icon type="dislike" theme="twoTone" twoToneColor="#eb2f96" />
            </Tooltip>
          </a>
          <Divider type="vertical" />
        </>
      );
    }
  }

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
            render={(dao: DaoInstanceState, vote: ProposalColumn) => {
              return (
                <>
                  {this.renderActions(vote)}
                  <DaoIconLinkComponent type={dao.kind} dao={dao.address} vote={String(vote.id)} />
                </>
              );
            }}
          />
        </Table>
      </>
    );
  }
}
