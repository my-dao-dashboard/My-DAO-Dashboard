import React from "react";
import { List, Typography, Card } from "antd";
import Meta from "antd/lib/card/Meta";

const data: any[] = [];
for (let i = 0; i < 4; i++) {
  data.push({
    name: `DAO #${i + 1}`,
    address: "0x1fd169a4f5c59acf79d0fd5d91d1201ef1bce9f1"
  });
}

export default class DaoList extends React.Component {
  public render() {
    return (
      <>
        <div>
          <h3>My DAO's</h3>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card hoverable>
                  <Meta title={item.name} description={<a href={`https://etherscan.io/address/${item.address}`}>{item.address}</a>} />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </>
    );
  }
}
