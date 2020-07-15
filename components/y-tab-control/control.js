// components/y-tab-control/control.js
Component({
  properties:{
    titles:{
      type:Array,
      value:[]
      
    }
  },
  data:{
    cIndex:1
  },
  methods:{
    itemClick(event){
      var index = event.target.dataset.index;
      console.log(event);
      this.setData({
        cIndex:index
      })
      this.triggerEvent('itemHomeClick',{index:index,title:this.properties.titles[index]},{})
    }
  }
})