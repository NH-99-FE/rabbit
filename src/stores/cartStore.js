import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserStore } from "./userStore"
import { insertCartAPI } from "@/apis/cart"
import { findNewCartListAPI } from "@/apis/cart"
import { delCartAPI } from "@/apis/cart"

export const useCartStore =  defineStore('cart',()=>{
  const userStore = useUserStore()
  const isLogin = computed(()=> userStore.userInfo.token)
  let cartList = ref([])

  // 获取最新购物车列表
  const updataCartList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    // 添加购物车操作
    const { skuId, count } = goods
    if(isLogin.value){
      // 登录之后购物车添加逻辑
      await insertCartAPI({ skuId, count })
      updataCartList()
    }else{
      // 本地购物车添加逻辑
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
    
  }
  
  // 删除购物车
  const delCart = async (skuId)=> {
    if(isLogin.value) {
      // 调用接口实现购物车中的删除功能
      await delCartAPI([skuId])
      updataCartList()
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      // const index = cartList.value.findIndex(item=> skuId ===item.skuId)
      // cartList.value.splice(index, 1)
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
    
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

  //计算属性 选中的总数 总价
  const selectedCount = computed(()=> cartList.value.filter(item => item.selected === true).reduce((a,c) => a + c.count, 0) )
  const selectedPrice = computed(()=> cartList.value.filter(item => item.selected === true).reduce((a,c) => a + c.count *c.price, 0) )

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    allCheck,
    singleCheck,
    addCart,
    delCart
  }
},{
  persist: true
})
