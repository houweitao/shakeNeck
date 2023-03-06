Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'this is my first new page..',
    inputValue: '',
    inputContent: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
        'welcome':'欢迎进入我的页面！'
    })
  },
  bindClickButton: function () {
    wx.navigateTo({
      url: '../index/index',
    })
    var that = this;
    that.setData({
      'welcome': 'change welcome'
    })
  },

  bindKeyInput: function (e) {
    var that = this;
    that.setData({
      // 'info': "hhhh",
      inputValue : e.detail.value
    });
    // console.log(e.detail.value);
  },

  saveKeyInput: function (e) {
    console.log('in saveKeyInput' + e);
    this.setData({
      inputContent : e.detail.value
    });
    console.log(this.data.inputContent);
  },

  bindClickSaveToPocket: function () {
    var that = this;
    console.log(that.data['inputContent']);

    var urlToSave = that.data['inputContent'];

    wx.request({
      url: "https://getpocket.com/v3/add?url=" + urlToSave + "&consumer_key=72029-7a5657db62e89c0b00053e45&access_token=20f6d716-94ba-aabd-2fc5-7664a7&tags=winter",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("res.data: ");
        console.log(res.data);
        //将获取到的json数据，存在名字叫zhihu的这个数组中
        // that.setData({
        //   v2ex: res.data,
        //   //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        // })
      }, 
      fail:function(){
        console.log('fail');
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.setData(
      {
        'info':"hhhh"
      }
    );
    console.log('i am ready...')
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