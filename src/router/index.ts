/*
 * @Author: Dreamer-zzq v777777v@163.com
 * @Date: 2022-08-30 15:30:01
 * @LastEditors: Dreamer-zzq v777777v@163.com
 * @LastEditTime: 2022-09-05 18:57:10
 * @FilePath: \m_components\src\router\index.ts
 * @Description: 
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const home = () => import('../views/home.vue')
const button = () => import('../views/button/index.vue')
const remove = () => import('../views/remove/index.vue')
const running = () => import('../views/running/index.vue')
const sudoku = () => import('../views/sudoku/index.vue')
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: home,
    },
    {
        path: '/button',
        component: button,
    },
    {
        path: '/remove',
        component: remove,
    },
    {
        path: '/running',
        component: running,
    },
    {
        path: '/sudoku',
        component: sudoku,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router