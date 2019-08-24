import { Badge, Table, Tag } from "antd";
import React from "react";
import DaoTag from "../Components/DaoTag";

const data: any[] = [];
for (let i = 0; i < 7; i++) {
  data.push({
    name: `Proposal #${i + 1}`,
    description: `Vote to mint ${(i + 1) * 1000} new tokens.`,
    status: "OPEN",
    type: "Aragon DAO",
    created: new Date(Date.now() + (i - 1) * 24 * 60 * 60 * 1000),
    createdBy: "0x1fd169a4f5c59acf79d0fd5d91d1201ef1bce9f1",
    deadline: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000)
  });
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (item: any) => {
      return (
        <>
          <Badge status="success" />
          <a>{item}</a>
        </>
      );
    }
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (item: any) => {
      return <DaoTag type="ARAGON" />;
    }
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "deadline",
    render: (item: any) => {
      return item.toLocaleDateString();
    }
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: () => {
      return <a>View</a>;
    }
  }
];

export default class ProposalListComponent extends React.Component {
  public render() {
    return (
      <>
        <div>
          <h2>Open Proposals</h2>
          <Table columns={columns} dataSource={data} />
        </div>
      </>
    );
  }
}
