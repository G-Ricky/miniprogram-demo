const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: '微信登录',
      path: 'page/API/pages/login/login'
    }
  },

  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {},
  login() {
    const that = this
    wx.login({
      success(res) {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true,
          code: res.code
        })
      }
    })
  },
  copyCode() {
    const that = this;
    wx.setClipboardData({
      data: that.data.code,
      success(res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  }
})
