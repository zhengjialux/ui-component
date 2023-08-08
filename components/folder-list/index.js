
import { Col, Row, Button, Popconfirm, List, Typography } from "antd";
import VirtualList from 'rc-virtual-list';
import folder_icon from "../assets/folder_iocn/folder.svg";
import { useEffect, useState } from "react";
import styles from "./index.less";
import defaultIocnList from "./default_icon";
import delete_icon from '../assets/delete.svg'
import { fileSizeConversion } from "@zhengjialux/tool-box";

export const FolderList = ({
  type = 'dir',
  data = [],
  config = [],
  excludeHeight = 0,
  defaultActiveKey,
  virtualListRef,
  setDefaultActiveKey,
  isDelete,
  listSpan,
  iconList = defaultIocnList,
  onClick = () => { },
  onScroll = () => { },
  getScroll = () => { },
  onDelete = () => { },
}) => {
  // 当前点击的文件夹高亮
  const [activeKey, setActiveKey] = useState('')
  // 显示删除按钮
  const [hideDeleteKey, setHideDeleteKey] = useState('')
  // 文件夹列表宽度
  const fileSpan = (index) => listSpan ? listSpan[index] : (24 / config.length)

  useEffect(() => {
    setActiveKey(defaultActiveKey)
  }, [defaultActiveKey])

  useEffect(() => {
    // 每次新的数据进来都要清空前面的高亮选中
    if (type !== 'dir') {
      setActiveKey('')
    }
  }, [data])

  const listDom = (item) => {
    return (
      <List.Item
        key={item.fileID}
        style={{ padding: 0, borderBottom: 'none' }}
      >
        <div style={{ width: '100%' }}>
          <Row
            key={item.fileID}
            style={{
              background: item.fileID === activeKey ? '#ebf7fe' : undefined,
              padding: '12.5px 20px',
              cursor: 'pointer',
              lineHeight: '25px'
            }}
            className={styles.folderWork}
            onClick={() => {
              if (setDefaultActiveKey) {
                setDefaultActiveKey(item.fileID)
              } else {
                setActiveKey(item.fileID)
              }
              if (type === 'dir') {
                onClick(item)
              }
            }}
            onDoubleClick={() => {
              if (item.type === 'dir') {
                setActiveKey(item.fileID)
                onClick(item)
              }
            }}
            onMouseEnter={() => setHideDeleteKey(item.fileID)}
            onMouseLeave={() => setHideDeleteKey('')}
          >
            {
              // 处理右侧文件夹及文件信息
              // 循环列数
              config.map(({ label, key }, index) => {
                // 文件夹和文件图标展示
                if (!index) {
                  const suffix = item.suffix ? item.suffix.split('.')[1] : ''
                  const imgUrl = item.type === 'dir'
                    ? folder_icon
                    : iconList[suffix] ? iconList[suffix] : iconList['unknown']

                  return (
                    <Col
                      span={fileSpan(index)}
                      key={`${label}_${index}`}
                      style={{
                        display: 'flex',
                        // justifyContent: 'space-between',
                        fontWeight: type === 'dir' ? 'bold' : 0
                      }}
                      className={styles.ellipsis}
                    >
                      <img
                        style={{ marginRight: 10, width: 25 }}
                        src={imgUrl}
                      />
                      <div
                        style={{
                          flex: 1,
                          paddingRight: type === 'dir' ? 40 : 0,
                          // width: `calc(100% - 25px)`,
                          width: type === 'dir' ? '2.5rem' : '2rem'
                        }}
                        className={styles.ellipsis}
                        title={`${item[key]}${key === 'name' ? item.suffix : ''}`}
                      >
                        {`${item[key]}${key === 'name' ? item.suffix : ''}`}
                      </div>
                      {
                        isDelete && (
                          <div style={{ width: 40, textAlign: 'center' }}>
                            {
                              item.fileID === hideDeleteKey && (
                                <Popconfirm
                                  className={styles.deleteWork}
                                  title="是否删除当前选项?"
                                  onConfirm={() => onDelete(item)}
                                  okText="确定"
                                  cancelText="取消"
                                >
                                  <Button
                                    type="link"
                                    icon={<img
                                      style={{ marginTop: '-7px', width: 20 }}
                                      src={delete_icon}
                                    />}
                                  />
                                </Popconfirm>
                              )
                            }
                          </div>
                        )
                      }
                    </Col>
                  )
                } else {
                  // 文件大小处理和展示
                  if (key === 'length') {
                    return (
                      <Col span={fileSpan(index)} key={`${label}_${index}`} offset={type === 'dir' ? 0 : 1}>
                        {item.type === 'file' ? fileSizeConversion(item[key]) : '--'}
                      </Col>
                    )
                  }
                  // 文件夹ID展示
                  return (
                    <Col
                      span={fileSpan(index)}
                      key={`${label}_${index}`}
                    >
                      <Typography.Text ellipsis={true} title={item[key]}>{item[key]}</Typography.Text>
                    </Col>
                  )
                }
              })
            }
          </Row>
        </div>
      </List.Item >
    )
  }

  const virtualListHeight = document.body.clientHeight - (excludeHeight + 38)

  return <>
    <Row className={styles.folderTitle}>
      {
        // 循环列表头列数
        config.map(({ label, key }, index) => <Col span={fileSpan(index)} key={`${label}_${index}`} offset={(type !== 'dir' && index === 1) ? 1 : 0}>{label}</Col>)
      }
    </Row>
    <List>
      <VirtualList
        data={data}
        height={virtualListHeight}
        onScroll={(e) => {
          const scrollHeight = virtualListHeight - (e.currentTarget.scrollHeight - e.currentTarget.scrollTop)
          getScroll({
            virtualListHeight,
            scrollHeight: e.currentTarget.scrollHeight,
            scrollTop: e.currentTarget.scrollTop
          })
          if (-scrollHeight < 3) {
            // console.log("滚动条接近最底部了")
            onScroll()
          }
        }}
        itemKey="fileID"
        itemHeight={50}
        ref={virtualListRef}
      >
        {(item) => listDom(item)}
      </VirtualList>
    </List>
  </>
}