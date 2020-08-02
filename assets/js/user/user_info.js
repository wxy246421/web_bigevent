$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()
  function initUserInfo () {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  //提交用户修改
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('用户修改成功')
        window.parent.getUserInfo()
      }
    })
  })
})