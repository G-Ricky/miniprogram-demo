const app = getApp()
const config = require("../../../../api.config.js");
const wxLogin = function (page) {
  wx.login({
    success(res) {
      console.log(config);
      app.globalData.hasLogin = true
      page.setData({
        hasLogin: true,
        code: res.code
      });
      wx.request({
        url: config.api.code,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        data: {
          code: res.code
        },
        success(res) {
          wx.showToast({
            title: '成功',
            icon: "success",
          })
        }
      });
    }
  });
}

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
    wxLogin(this);
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
  },
  relogin() {
    wxLogin(this);
  }
})
