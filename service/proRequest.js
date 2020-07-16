export default function proRequest(option){
  return new Promise((resove,reject)=>{
    wx.request({
      url: option.url, //仅为示例，并非真实的接口地址
      method:option.method || 'get',
      success :resove,
      fail:reject
    })
  })
}
