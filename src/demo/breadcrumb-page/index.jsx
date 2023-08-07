import React from "react";
import Breadcrumb from "@/components/breadcrumb";

export default class BreadcrumbPage extends React.Component {
  state = {
    dataList: [
      {
        id: '01',
        name: 'path1'
      },
      {
        id: '02',
        name: 'path2'
      },
      {
        id: '03',
        name: 'path3'
      },
      {
        id: '04',
        name: 'path4'
      },
      {
        id: '05',
        name: 'path5'
      }
    ]
  }

  onClick = (item, index) => {
    const { dataList } = this.state
    const newData = dataList.slice(0, index + 1)
    this.setState({ dataList: newData })
  }

  render() {
    const { dataList } = this.state
    return (<>
      <Breadcrumb data={dataList} width={500} onClick={this.onClick} />
    </>)
  }
}
