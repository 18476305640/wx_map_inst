
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

var key = 'XX4BZ-LO2RQ-FFK5A-GCYUD-TWFVO-SBF4F';
// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  qqmapsdk:  new QQMapWX({
     key:key
  }),
  data: {
        mapw: '100%', 
        maph: '0',
        scale: '18',
        longitude: null,
        latitude: null,
        markers: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  mapCtx: null,
  onLoad: function (options) {
        this.mapCtx = wx.createMapContext('map')

        wx.getSystemInfo({
          success: res => {
              var mapw = res.windowWidth
              var maph = res.windowHeight
              this.setData({
                maph: maph + 'px',
                controls: [{
                   id:1,
                   iconPath: '/images/gps.png',
                   position: {
                      left:10,
                      top: maph - 50 ,
                      width: 40,
                      height: 40
                   },
                   clickable: true

                }]

              })
          }
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.getLocation({
        success: res => {
           this.setData({
               longitude: res.longitude,
               latitude: res.latitude
           })
        }
      })
  },
seeChange: function(e) { 
    console.log(e.type);
    if(e.type === 'end' ) {
        this.mapCtx.getCenterLocation({
           success: res => {
               this.getFood(res.longitude,res.latitude)
           }
        })
    }
},
getFood: function (longitude,latitude) {
  
    this.qqmapsdk.search({
              keyword: '餐厅',
              
              location: {
                longitude: longitude,
                latitude: latitude
              },
              success: res => {
                console.log('data->', res.data);
                  var mark = []
                  for( let i in res.data) {
                    console.log(i);
                      mark.push({
                          iconPath: '/images/food.png',
                          id: i,
                          latitude: res.data[i].location.lat,
                          longitude: res.data[i].location.lng
                      })
                  }
                  mark.push({
                    iconPath: '/images/center.png',
                    id: res.data.length,
                    latitude: latitude,
                    longitude: longitude
                  })
                  this.setData({
                      markers: mark
                  })
             },
             fail: err => {
                 console.log("error",err);
             }
    })

},
BackToGps: function(e ) {
    console.log(e);
    var id = e.controlId
    if (id ===1) {
      this.mapCtx.moveToLocation()
    }
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})