// 数字输入框组件
import { Input } from "antd";

const IconLoading = props => {
  const { value, onChange, output = 'Number' } = props
  let _value = value

  // 改变数值时进行字符串校验
  const _onChange = ({ target }) => {
    if (output === 'Decimal') {
      // 正则限制只能输入小数2位，分4步正则过滤
      // 第一步：过滤掉除数字和点意外的字符；
      // 第二步：当0开头，0后面为数字，则过滤掉0，取后面的数字；
      // 第三步：如果输入的第一位为小数点，则替换成 0. 实现自动补全；
      // 第四步：最后限制小数点后面只能输入0到2位小数
      const targetValue = `${target.value}`.replace(/[^\d^\.]+/g, "")
        .replace(/^0+(\d)/, "$1")
        .replace(/^\./, "0.")
        .match(/^\d*(\.?\d{0,2})/g)
      if (targetValue) {
        _value = targetValue
      }
      onChange(targetValue ? _value : targetValue)
    } else {
      // 正则过滤数字以外的字符
      const targetValue = `${target.value}`.replace(/\D+/g, '')
      if (targetValue) {
        _value = targetValue
      }
      if (output === 'Number' || output === 'Email') {
        onChange(targetValue ? _value : targetValue)
      }
      // if (output === 'Email') {
      //   onChange(targetValue ? _value : targetValue)
      // }
    }
  }

  // 失去焦点时，检查最大最小值
  const onBlur = () => {
    const { min, max } = props
    if (value || value === 0) {
      if (output === 'Decimal') {
        // 如果是小数，以.结束的就过滤掉
        _value = `${value}`.replace(/\.$/, "")
      } else {
        if (value > max) {
          // 输入的数字大于最大值，就赋值最大值
          _value = max
        } else if (value < min) {
          // 输入的数字小于最小值，就赋值最小值
          _value = min
        }
      }
      onChange(_value)
    }
  }

  return <Input
    {...props}
    value={value}
    onChange={_onChange}
    onFocus={() => { }}
    onBlur={onBlur}
  />
}

export default IconLoading;