import { useIntersectionObserver } from '@vueuse/core'

// 定义图片懒加载插件
export const lazyPlugin = {
    install (app) {
        app.directive('img-lazy', {
            mounted(el , binding) {
                // el: 指令所绑定的元素
                // binding: binding.value 指令等于号后面绑定的表达式的值：Url
                const { stop } = useIntersectionObserver(
                    el,
                    ([{isIntersecting}]) => {
                    if(isIntersecting){
                        // 进入视口区域
                        el.src=binding.value
                        stop() //停止监听
                    }
                    },
                )
            }
        })
    }
}