<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex==index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab
                v-for="(item, index) in categorySub"
                @click="onClickCategorySub(index)"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
            <!-- 列表 -->
            <div id="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="reFresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    >
                    <div class="list-item" v-for="(item,index) in goodsList" :key="index">
                        <div class="list-item-img"><img :src="item.IMAGE1" width="100%"/></div>
                        <div class="list-item-text">
                            <div>{{item.NAME}}</div>
                            <div class="">￥{{item.ORI_PRICE}}</div>
                        </div>
                    </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      loading: false,
      finished: false,
      goodsList: [],
      isRefresh: false,
      nowPage: 1,
      categorySubId: ''
    }
  },
  methods: {
    // 获取大类方法
    getCategory () {
      axios({
        url: url.getCategoryList,
        method: 'get'
      })
        .then(response => {
          // console.log(response)

          if (response.data.code === 200 && response.data.msg) {
            this.category = response.data.msg
            this.getCategorySub(this.category[0].ID)
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取小类
    getCategorySub (categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: { categoryId: categoryId }
      })
        .then(response => {
          // console.log(response)

          if (response.data.code === 200 && response.data.msg) {
            this.categorySub = response.data.msg
            this.active = 0
            this.onLoad()
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 点击大类切换小类
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.nowPage = 1
      this.finished = false
      this.goodsList = []
      this.getCategorySub(categoryId)
    },
    // 上拉加载方法
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodsList()
      }, 300)
    },
    // 下拉刷新方法
    reFresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.list = []
        this.onLoad()
      }, 300)
    },
    // 获取商品列表方法
    getGoodsList () {
      axios({
        url: url.getGoodsListBycategory,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          nowPage: this.nowPage
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200 && res.data.msg.length) {
          this.nowPage++
          this.goodsList = this.goodsList.concat(res.data.msg)
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击小类方法
    onClickCategorySub (index) {
      this.goodsList = []
      this.finished = false
      this.nowPage = 1
      this.categorySubId = this.categorySub[0].ID
      this.onLoad()
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 + 'px'
  }
}
</script>

<style lang="scss" scoped>
#leftNav {
  background: rgb(230, 230, 230);
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}

.list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>
