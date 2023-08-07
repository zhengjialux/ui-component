import React from "react";
import FolderList from "@/components/folderList";

export default class BreadcrumbPage extends React.Component {
  state = { dataList }

  render() {
    const { dataList } = this.state
    return (
      <div style={{ padding: 24, background: '#f1f3f4', borderRadius: '10px' }}>
        {/* <FolderList data={dataList} width={500} onClick={this.onClick} /> */}
      </div>
    )
  }
}
