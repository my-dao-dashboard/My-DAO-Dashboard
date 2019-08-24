import { Card, List, Table, Tag, Badge } from "antd";
import React from "react";

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
      return (
        <Tag color="blue" key={item}>
          {item}
        </Tag>
      );
    }
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "deadline",
    render: (item: any) => {
      console.log(item);
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
          <h3>Open Proposals</h3>
          <Table columns={columns} dataSource={data} />
        </div>
      </>
    );
  }
}
