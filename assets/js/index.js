$(function () {
  getUserInfo()
  var layer = layui.layer
  $('#btnLogout').on('click', function () {
    layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
      //do something


      layer.close(index);

      localStorage.removeItem("token")
      location.href = '/login.html'
    });

  })
})
function getUserInfo () {
  $.ajax({
    type: 'get',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ""
    // },
    success: function (res) {
 
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }

      renderUser(res.data)
    },
//     complete: function (res) {
//       console.logo(res)
// // if()
//     }
  })
}
function renderUser (user) {
  //渲染用户名
  var uname = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
  // 渲染图片
  if (user.user_pic !== null) {
    $('.layui-nav-img').show().attr("src", user.user_pic)
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    $('.text-avatar').show().html(uname[0].toUpperCase())
  }
}