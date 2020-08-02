$(function () {
  var form = layui.form
  form.verify({
    Pwd: [/^\S{6,12}$/, '密码为6-12位且不能包含空格'],
    samePwd: function (value) {
      if (value == $('[name="oldPwd"]').val()) {
        return '新密码不能与原密码相同'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name="newPwd"]').val()) {
        return '两次输入的密码不一致'
      }
    }
  })

  //修改密码
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('修改密码成功')
        $('.layui-form').reset()
      }
    })
  })
})