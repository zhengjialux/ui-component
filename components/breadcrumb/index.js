import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from "antd";
import styles from "./index.css";

export const Breadcrumb = ({ data, width, onClick }) => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const joinSymbol = '/'

  useEffect(() => {
    // 范围内的宽度
    const availableWidth = document.querySelector(`.${styles.breadcrumbBox}`)?.offsetWidth;
    // 所有元素累加的宽度
    let currentWidth = 0;
    // 处理完的面包屑
    let tempVisibleItems = [];
    // 是否超出范围
    let isOverflowing = false;
    // 占位数据
    const ellipsisObj = {
      name: '...',
      id: 0
    }

    const measureHeight = () => {
      for (let i = 1; i <= data.length; i++) {
        const itemInfo = data[data.length - i]

        if (!itemInfo) break;
        if (currentWidth > availableWidth) {
          if (i === 1) {
            // 超出范围后至少显示1条面包屑
            tempVisibleItems.push(itemInfo)
          } else {
            currentWidth -= getTextStyle(itemInfo.name + joinSymbol)?.width
          }
        } else {
          tempVisibleItems.push(itemInfo)
        }
      }

      if (tempVisibleItems.length !== data.length) {
        tempVisibleItems.splice(1, 0, ellipsisObj)
      }
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const itemText = item.name; // 提取对象的特定属性
      const itemWidth = getTextStyle(itemText + joinSymbol)?.width;
      // 循环所有的数据，累加自己的宽度
      currentWidth += itemWidth;
      // 如果出现单个超出范围的宽度就可以出现浮框
      if (itemWidth >= availableWidth) {
        isOverflowing = true;
      }
    }

    // 如果累加的宽度超出了选址的范围宽度就可以出现浮框并且加占位数据的宽度
    if (currentWidth > availableWidth) {
      isOverflowing = true;
      currentWidth += getTextStyle(".../")?.width;
    }

    measureHeight()

    setVisibleItems(tempVisibleItems.reverse());
    setIsOverflowing(isOverflowing);
  }, [data]);

  // 获取内容的宽度
  const getTextStyle = (text) => {
    const itemWidth = width
    const tempElement = document.createElement('span');
    tempElement.style.visibility = 'hidden';
    tempElement.style.position = 'absolute';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.fontSize = getComputedStyle(containerRef.current).fontSize;
    tempElement.style.fontFamily = getComputedStyle(containerRef.current).fontFamily;
    tempElement.style.fontWeight = getComputedStyle(containerRef.current).fontWeight;
    tempElement.style.fontStyle = getComputedStyle(containerRef.current).fontStyle;
    tempElement.style.maxWidth = itemWidth;
    tempElement.style.display = 'inline-block';
    tempElement.style.overflow = 'hidden';
    tempElement.style.textOverflow = 'ellipsis';
    tempElement.textContent = text;
    document.body.appendChild(tempElement);
    // + 6px 是符号左右的间距各 3 px
    const width = tempElement.offsetWidth + 6;
    const height = tempElement.offsetHeight;
    document.body.removeChild(tempElement);
    return { width: width >= itemWidth ? itemWidth : width, height };
  };

  // 完整面包屑
  const completeDom = (
    <div>
      {data.map((item, index) => {
        if (index === data.length - 1) {
          return (
            <span
              style={{ color: '#000' }}
              key={`${item.id}`}>
              {item.name}
            </span>
          )
        }
        return (
          <a
            key={`${item.id}`}
            onClick={() => {
              if (item.id) {
                onClick(item, index)
              }
            }}
          >
            {`${item.name} / `}
          </a>
        )
      })}
    </div>
  )

  return (
    <div
      className={styles.breadcrumbBox}
      style={{ overflow: "hidden", width: width }}
      ref={containerRef}
    >
      <Tooltip
        placement="bottom"
        title={isOverflowing ? completeDom : null}
        overlayStyle={{ maxWidth: width }}
        overlayInnerStyle={{ width, wordBreak: 'break-all' }}
      >
        <div style={{ display: 'flex' }}>
          {visibleItems.map((item, index) => {
            if (index === visibleItems.length - 1) {
              return (
                <div
                  className={styles.ellipsis}
                  style={{ color: '#000', maxWidth: width }}
                  key={`${item.id}`}>
                  {item.name}
                </div>
              )
            }
            return (
              <div key={`${item.id}`}>
                <a
                  onClick={() => {
                    if (item.id) {
                      onClick(item, index)
                    }
                  }}
                  style={{ display: 'flex' }}
                >
                  <span
                    className={styles.ellipsis}
                    style={{ maxWidth: width }}
                  >
                    {item.name}
                  </span>
                  <span style={{ display: 'inline-block', padding: '0 3px' }}>/</span>
                </a>
              </div>
            )
          })}
        </div>
      </Tooltip>
    </div>
  );
};