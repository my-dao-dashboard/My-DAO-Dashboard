import { Table, Badge } from "antd";
import Column from "antd/lib/table/Column";
import React, { Component } from "react";
import { DaoInstanceState } from "../../backbone/State";
import DaoIconLink from "../DaoIconLink";
import DaoTag from "../DaoTag";
import {IProposalColumn} from "../IProposalColumn";

interface IProps {
  open: boolean;
  source: IProposalColumn[];
}

export default class ProposalTable extends Component<IProps> {
  public render() {
    return (
      <>
        <Table dataSource={this.props.source} scroll={{ x: true }}>
            <Column title="" dataIndex="key" key="key" render={(text) => {
              if(this.props.open) {
                return <Badge status="success" />
              }
              return <Badge status="error" /> } }/>
            <Column title="ID" dataIndex="id" key="id" render={(text) => `#${text}`} sorter={(a: any, b: any) => a.id - b.id } />
            <Column title="Description" dataIndex="description" key="description" sorter={(a: any, b: any) => {
              if(a.description < b.description) { return -1; }
              if(a.description > b.description) { return 1; }
              return 0; }} />
            <Column title="Type" dataIndex="type" key="type" render={(text) => <DaoTag type={text} /> } sorter={(a: any, b: any) => a.type - b.type } />
            <Column title="Deadline" dataIndex="deadline" key="deadline" render={(text) => text.toLocaleDateString()} sorter={(a: any, b: any) => a.deadline - b.deadline } />
            <Column title="" dataIndex="dao" key="dao" render={(dao: DaoInstanceState) => <DaoIconLink type={dao.kind} address={dao.address} /> } />
        </Table>
      </>
    );
  }
}
