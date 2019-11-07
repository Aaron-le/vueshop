<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | toFixed(2)}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
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
      goodsId: '',
      goodsInfo: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getGoodsDetail () {
      axios({
        url: url.getGoodsDetail,
        method: 'post',
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          if (res.data.code === 200 && res.data.message) {
            this.goodsInfo = res.data.message
          } else {
            Toast('服务器错误，数据取得失败')
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    this.getGoodsDetail()
  }
}
</script>

<style lang="scss" scoped>
.detail {
  font-size: 0;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>
