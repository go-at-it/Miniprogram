// pages/home/home.js
import {
  getMultidata,
  getGoodsData
} from '../../service/home.js'
const types = ["pop","new","sell"];
const TOP_DISTANCE = 1000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    recommend:[],
    titles:["流行","新款","精选"],
    showBackTop:false,
    isTabFixed:false,
    tabScrollTop:0,
    goods:{
      new:{
        page:0,
        list:[]
      },
      pop:{
        page:0,
        list:[]
      },
      sell:{
        page:0,
        list:[]
      }
    },
    currentType:'pop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.请求轮播及推荐数据
    this._getMultidata()
    // 获取商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  //------------------------请求函数----------------------
  _getMultidata(){
    getMultidata()
    .then((res) => {
      var banner = res.data.data.banner.list;
      var recommend = res.data.data.recommend.list;
      this.setData({
        banner:banner,
        recommend:recommend
      })

    }).catch((err) => {
      console.log(err);
    })
  },
  _getGoodsData(type){

    //获取页码
    const page = this.data.goods[type].page + 1

    //发送网络请求
    getGoodsData(type,page).then((res)=>{
      console.log(res);
      //取出数据
      var list = res.data.data.list;
      //获取以前的数据呀
      const oldList = this.data.goods[type].list
       oldList.push(...list);

       //将数据设置到data的goods中
      const typeKey = `goods.${type}.list`
      const typePage = `goods.${type}.page`
      this.setData({
        [typeKey]:oldList,
        [typePage]:page
      })
    }).catch(err =>{
      console.log(err);
    })
  },
  //-----------------------事件处理函数-----------------------
  handleTabClick(event){
    const index = event.detail.index;
    this.setData({
      currentType:types[index]
    })

    console.log(types[index])
  },
  onReachBottom(){
    console.log("滚动到底部了");
    this._getGoodsData(this.data.currentType);
  },
  //滚动到一定位置显示返回顶部
  onPageScroll(options){
    //console.log(this.data.showBackTop);
    const scrollTop = options.scrollTop;
    const isTrue = scrollTop >= TOP_DISTANCE;
    
    //console.log(isTrue == !this.showBackTop);
    if(isTrue == !this.data.showBackTop){   
      this.setData({
        showBackTop:isTrue
      })
    }
    //修改isTabFixed属性
    const flag = scrollTop  >= this.data.tabScrollTop;
    if(flag == !this.data.isTabFixed){
      this.setData({
        isTabFixed:flag
      })
    }
  },
  onShow(){

  },
  handImageLoad(){
    console.log("发送图片加载完")
    wx.createSelectorQuery().select('#tab-control').boundingClientRect( (rect)=>{
      console.log(rect);
      this.data.tabScrollTop = rect.top;
    }).exec()
  }
})