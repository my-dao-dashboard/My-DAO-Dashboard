import { Badge, Divider, Icon, Table, Tooltip } from "antd";
import Column from "antd/lib/table/Column";
import React, { Component } from "react";
import { DaoInstanceState } from "../../backbone/State";
import { VoteCount } from "../../backbone/votes.service";
import DaoIconLink from "../DaoIconLink";
import DaoTag from "../DaoTag";
import { IProposalColumn } from "../IProposalColumn";
import Web3 from "web3";
import Contract from "web3/eth/contract";
import daostackVoting from "../../abis/daostack-voting.abi.json";
import { Web3Service } from "../../services/web3/Web3Service";
import BigNumber from "bignumber.js";

interface IProps {
  open: boolean;
  source: IProposalColumn[];
}

export default class ProposalTable extends Component<IProps> {
  public async voteProposal(pass: any, vote: IProposalColumn) {
    const contract = new Web3Service().contract(daostackVoting, "0x332B8C9734b4097dE50f302F7D9F273FFdB45B84");
    console.log(contract);

    if (pass) {
      console.log("VOTE: Pass");
    } else {
      console.log("VOTE: Fail");
    }
  }

  public renderActions(vote: IProposalColumn) {
    if (this.props.open) {
      return (
        <>
          <a onClick={this.voteProposal.bind(this, true, vote)}>
            <Tooltip title="Vote for">
              <Icon type="like" theme="twoTone" twoToneColor="#52c41a" />
            </Tooltip>
          </a>
          <Divider type="vertical" />
          <a onClick={this.voteProposal.bind(this, false, vote)}>
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
            render={text => <DaoTag type={text} />}
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
            render={(dao: DaoInstanceState, vote: IProposalColumn) => {
              return (
                <>
                  {this.renderActions(vote)}
                  <DaoIconLink type={dao.kind} dao={dao.address} vote={String(vote.id)} />
                </>
              );
            }}
          />
        </Table>
      </>
    );
  }
}
