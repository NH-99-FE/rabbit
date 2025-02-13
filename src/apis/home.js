import httpInstance from "@/utils/http"

export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
    })
}

export function findNewAPI() {
    return httpInstance({
        url: '/home/new'
    })
}

export function findHotAPI() {
    return httpInstance({
        url: '/home/hot'
    })
}

export function getGoodsAPI() {
    return httpInstance({
        url: '/home/goods'
    })
}