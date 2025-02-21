import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCartStore =  defineStore('cart',()=>{
  let cartList = ref([])
  const addCart = (goods) => {
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item = cartList.value.find((item)=> goods.skuId=== item.skuId)
    if(item){
      item.count += goods.count
    }else {
      cartList.value.push(goods)
    }
  }
  // 删除购物车
  const delCart = (skuId)=> {
    // 思路：
    // 1. 找到要删除项的下标值 - splice
    // 2. 使用数组的过滤方法 - filter
    // const index = cartList.value.findIndex(item=> skuId ===item.skuId)
    // cartList.value.splice(index, 1)
    cartList.value = cartList.value.filter(item => item.skuId !== skuId)
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    //通过skuID找到要修改的那一项，然后把它的selected修改为对应传入的selected
    const item = cartList.value.find(item => skuId === item.skuId)
    item.selected = selected
  }

  //全选功能
const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected=selected)
}

  // 计算属性 总数 总价
  const allCount = computed(() => cartList.value.reduce((a,c)=> a + c.count, 0))
  const allPrice = computed(() => cartList.value.reduce((a,c)=> a + c.count*c.price, 0))


  //是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    allCheck,
    singleCheck,
    addCart,
    delCart
  }
},{
  persist: true
})
