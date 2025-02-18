// 把components中的所有组件都进行全局化注册
// 通过插件的方式
import XtxSku from './XtxSku/index.vue'
import ImageView from './ImageView/index.vue'

export const componentPlugin = {
    install(app){
        // app.component('组件名字',组件配置对象)
        app.component('XtxSku',XtxSku)
        app.component('XtxImageView',ImageView)
    }
}