<template>
    <div>
        <van-nav-bar
        title="用户注册"
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
            <van-button type="primary" @click="goRegisterAction" :loading="openLoading" size="large">马上注册</van-button>
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
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goRegister () {
      this.openLoading = true
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(response => {
          console.log(response)
          // 如果返回code为200，代表注册成功，我们给用户作Toast提示
          if (response.data.code === 200) {
            Toast.success('注册成功')
            this.$router.push('/')
          } else {
            this.openLoading = false
            console.log(response.data.message)
            Toast.fail('注册失败')
          }
          console.log(response.data.code)
        })
        .catch((error) => {
          this.openLoading = false
          console.log(error)
          Toast.fail('注册失败')
        })
    },
    goRegisterAction () {
      this.checkForm() && this.goRegister()
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
