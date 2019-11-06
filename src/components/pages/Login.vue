<template>
    <div>
        <van-nav-bar
        title="用户登录"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />

        <div class="register-panel">
        <van-field
            v-model="username"
            label="用户名"
            clearable
            placeholder="请输入用户名"
            required
            :error-message='userNameMsg'
        />

        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :error-message='passWordMsg'
        />
        <div class="register-button">
            <van-button type="primary" @click="goLoginAction" :loading="openLoading" size="large">登录</van-button>
        </div>
       </div>
    </div>
</template>

<script>
import url from '@/serviceAPI.config.js'
import axios from 'axios'
import { Toast } from 'vant'
export default {
  data () {
    return {
      username: '',
      password: '',
      openLoading: false,
      userNameMsg: '',
      passWordMsg: '',
      isOk: true
    }
  },
  created () {
    if (localStorage.userInfo) {
      Toast.success('您已经登录过了')
      this.$router.push('/')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goLogin () {
      this.openLoading = true
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(response => {
          if (response.data.code === 200 && response.data.msg) {
            return new Promise((resolve, reject) => {
              localStorage.userInfo = {userName: this.username}
              setTimeout(() => { resolve() }, 500)
            }).then(() => {
              Toast.success('登录成功')
              this.$router.push('/')
            }).catch(() => {
              Toast.fail('登录状态保存失败')
            })
          } else {
            Toast.fail('登录失败')
            this.openLoading = false
          }
        })
        .catch((err) => {
          console.log(err)
          Toast.fail('登录失败')
          this.openLoading = false
        })
    },
    goLoginAction () {
      this.goLogin()
    },
    checkForm () {
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      this.isOk = true
      if (this.username.length < 5) {
        this.userNameMsg = '用户名不能小于5位'
        this.isOk = false
      } else {
        this.userNameMsg = ''
      }
      if (!reg.test(this.password)) {
        this.passWordMsg = '密码需包含数字和英文，长度6-20'
        this.isOk = false
      } else {
        this.passWordMsg = ''
      }
      return this.isOk
    }
  }
}
</script>

<style lang="scss" scoped>
.register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>
