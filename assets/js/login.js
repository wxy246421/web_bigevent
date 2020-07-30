$(function () {
  // 切换
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //定义表单校验规则
  var form = layui.form
  form.verify({
    // 密码校验规则
    pwd: [/^\S{6,12}$/, '密码为6-12位且不能包含空格'],
    // 校验两次密码是否一致的规则 
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需拿到密码框中的内容
      if ($('#reg-pwd').val() !== value) {
        return "两次密码输入不一致"
      }
    }
  })

  // 监听注册表单的提交事件
  // data:$("#form_reg").serialize() data也可以用这个，只是多传了再次确认密码的值，
  // username: $('#form_reg input[name=username]').val(), 在此处input可以省略
  var layer = layui.layer
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $('#link_login').click()
        //清空表单 dom元素
        $('#form_reg')[0].reset()
      }
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        localStorage.setItem("token", res.token)
        location.href = "/index.html"
      }
    })
  })

})