import Jsonp from "jsonp";
import fetch from './service'

export default class Axios {

    // 专门请求百度API
    static jsonp(options){
        return new Promise((resolve, reject)=>{
            Jsonp(options.url,{
                    param:'callback'
                },
                function(error, response){
                    if(error){
                        reject(error)
                    }else{
                        if(response.status == 'success' || response.status == 0){
                            resolve(response)
                        }else{
                            reject(response)
                        }
                    }
                }
            )
        })
    }

    // 请求自己的Mock数据API
    static mock(options){
        return fetch({
            url:options.url,
            baseURL:"http://yapi.demo.qunar.com/mock/80992/react-antd",
            method:'GET',
            params:options.params
        })
    }

    // 请求自己的API
    static get(options){
        return fetch({
            url:options.url,
            method:'GET',
            baseURL:"https://quicklyweb.cn",
            params:options.params
        })
    }
}