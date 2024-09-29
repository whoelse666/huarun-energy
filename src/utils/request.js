/*
 * @Author: your name
 * @Date: 2021-10-28 15:58:43
 * @LastEditTime: 2024-03-29 13:42:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \management-system\src\utils\request.js
 */
import axios from 'axios'
import { Message } from 'element-ui'

import qs from 'qs'

let pendingMap = new Map()
// create an axios instance

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config) => {
        removePending(config)
        addPending(config)
        // do something before request is sen
        // 是否需要设置 token
        
        
        
       
        return config
    },
    (error) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        console.log(12345, response)
        removePending(response.config)
        const res = response.data
        console.log(12345, res, res.code)
        if (res.code && res.code != 200) {
            //返回码错误,错误提示这里已经统一处理，单个请求可以不再弹出消息
            const { hideMessageCodes } = response.config.headers
            if (!hideMessageCodes || !hideMessageCodes.includes(res.code)) {
                //如果头部不含hideMessageCodes，则直接调用后端的message提示，否则，接口调用的时候自行判断处理
                Message({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000,
                })
            }
            return Promise.resolve(res || 'Error') // 错误结果返回
            //return new Error(res || 'Error')  //之前是为了处理message不需要取后端返回的情况，现在用hideMessageCodes处理
        } else {
            console.log(23456, res, res.code)
            if (res.code == '450') {
                // to re-login
            }
            return res
        }
    },
    (error) => {
        console.log(34567, error)
        if (error && error.response?.data) {
            const { code, msg } = error.response.data
            Message({
                message: msg || '网络请求超时',
                type: 'error',
                duration: 5 * 1000,
            })
            if (code == '450') {
                //redirect()
                // to re-login
            }
            return Promise.reject(error)
        }

        //return new Error(res || 'Error')
    }
)
// 通用下载方法
/**
 * @function 获取完整请求接口
 * @param config
 * @returns 返回接口路径
 */
const getPendingUrl = (config) => {
    return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join(
        '&'
    )
}

const addPending = (config) => {
    const url = getPendingUrl(config)
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pendingMap.has(url)) {
                // 如果 pending 中不存在当前请求，则添加进去
                pendingMap.set(url, cancel)
            }
        })
}
/**
 * @function 从队列中移除请求
 * @param config
 */
const removePending = (config) => {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
        const cancel = pendingMap.get(url)
        cancel && cancel(url)
        pendingMap.delete(url)
    }
}


export default service
