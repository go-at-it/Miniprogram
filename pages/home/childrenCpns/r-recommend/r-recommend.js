// pages/home/childrenCpns/r-recommend/r-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLaod:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLaod(){
      if(!this.data.isLaod){
        this.triggerEvent('imageLoad')
        //console.log("图片加载完成")
        this.data.isLaod = true
      }
      
    }
  }
})
