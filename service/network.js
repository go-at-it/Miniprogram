import {
  baseURL
} from './config.js'
export default function proRequest(options){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + options.url,
      method:options.method || 'get',
      data:options.data ||{},
      success:resolve,
      fail:reject
    })
  })
}