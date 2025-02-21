import { createRouter, createWebHistory } from "vue-router"
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CateList/index.vue'



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    component: Home
                },
                {
                    path: '/category/:id',
                    name: 'category',
                    component: Category
                },
                {
                    path: '/category/sub/:id',
                    name: 'subCategory',
                    component: SubCategory
                },{
                    path: 'detail/:id',
                    name: 'detail',
                    component: Detail
                },{
                  path: 'cartlist',
                  name: 'cartlist',
                  component: CartList
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ],
    // 定制路由滚动行为
    scrollBehavior(){
        return {
            top: 0
        }
    }

})

export default router
