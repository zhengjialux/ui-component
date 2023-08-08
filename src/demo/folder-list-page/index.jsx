import React from "react";
// import { FolderList } from "@/components";
import { FolderList } from "@zhengjialux/ui-component";
import dataList from "./mock-data";

// 文件夹表头
const folderListConfig = [
  {
    label: '文件夹名称',
    key: 'name'
  },
  {
    label: '文件夹ID',
    key: 'fileID'
  },
]

export default class BreadcrumbPage extends React.Component {
  state = { dataList }

  render() {
    const { dataList } = this.state
    return (
      <div style={{ padding: 24, background: '#f1f3f4', borderRadius: '10px' }}>
        <FolderList data={dataList} config={folderListConfig} isDelete={true} />
      </div>
    )
  }
}
