// pages/story/story.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: 'story for u..',
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    console.log("reauest story data ");
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("story.data: ");
        console.log(res.data);
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          todayStory: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
      }
    })



    wx.request({
      url: 'https://interface.meiriyiwen.com/article/random?dev=1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("request random data ");
        console.log(res.data);
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          randomStory: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
      }
    })
  },
  bindViewTap: function (e) {
    console.log(e);
    var dataset = e.currentTarget.dataset;
    console.log(dataset.title);

    wx.navigateTo({
      url: '../detail/detail?content=' + dataset.content + '&title=' + dataset.title + '&url=' + dataset.url + '&author=' + dataset.author
    })
  },
  pullRandomStory: function (e) {
    var that = this;
    console.log(e);
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/random?dev=1',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("request random data ");
        console.log(res.data);
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        that.setData({
          clickRandomStory: res.data,
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    wx.showNavigationBarLoading();
    var that=this;
    console.log('xia la');
    wx.stopPullDownRefresh();
    that.pullRandomStory();
    wx.hideNavigationBarLoading();
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