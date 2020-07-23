const { default: proRequest } = require("./network");

import request from './network'

export function getMultidata(){
  return  request({
    url:'/home/multidata'   
  })
}

export function getGoodsData(type,page){
  return request({
    url:"/home/data",
    data:{
      type:type,
      page:page
    }
  })
}