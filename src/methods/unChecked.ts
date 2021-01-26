import { ITreeData, IEleTree } from '../interface'
import { EleTree } from '../eleTree'
import { recurseTree, paramDetection, updateData, isArray } from '../opera/tools'
import reloadVnode from '../vnode/reloadVnode'
import { symbolAttr } from '../config'
/**
 * 清空选中项(如果不传参数或传空数组，则清空所有选中项)
 * @param {*清空部分选中项，传入需要清空的选中项} unCheckArr
 */
export default function <D extends ITreeData>(this: EleTree<D>, unCheckArr: string | string[] = []) {
  let options = this.config
  let { name, key, isOpen, checked, children, disabled, isLeaf } = options.request

  if (paramDetection(unCheckArr, 'String|Number|Array', 'unChecked方法第一个参数必须为String|Number|Array')) return this
  if (!isArray(unCheckArr)) {
    unCheckArr = [unCheckArr] as string[]
  }
  let isUnCheckAll = unCheckArr.length === 0

  let f = (data: D[]) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][children]) f(data[i][children])
      if (!data[i][disabled]) data[i][checked] = 0
    }
  }

  recurseTree(this, (data) => {
    if (!data[disabled]) {
      if (isUnCheckAll) {
        data[checked] = 0
      } else if (unCheckArr.includes(data[key])) {
        data[checked] = 0
        // 如果父子关联
        if (!options.checkStrictly) {
          // 如果上级节点是选中的，则取消上级节点选中
          let pData = data[symbolAttr.parentNode]
          while (pData && pData[checked] === 2) {
            pData[checked] = 0
            pData = pData[symbolAttr.parentNode]
          }
          // 取消父节点的选中时，会同时取消所有子孙节点的选中
          if (data[children] && data[children].length > 0) {
            f(data[children])
          }
        }

      }
    }
  })
  updateData(this)
  this.reloadVnode()
  return this
}
