import React from "react";
// import { Breadcrumb } from "@/components";
import { Breadcrumb } from "@zhengjialux/ui-component";
import dataList from "./mock-data";

export default class BreadcrumbPage extends React.Component {
  state = { dataList }

  onClick = (item, index) => {
    const { dataList } = this.state
    const newData = dataList.slice(0, index + 1)
    this.setState({ dataList: newData })
  }

  render() {
    const { dataList } = this.state
    return (
      <div style={{ padding: 24, background: '#f1f3f4', borderRadius: '10px' }}>
        <Breadcrumb data={dataList} width={500} onClick={this.onClick} />
      </div>
    )
  }
}
