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
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
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
      active: 0
    }
  },
  methods: {
    getCategory () {
      axios({
        url: url.getCategoryList,
        method: 'get'
      })
        .then(response => {
          console.log(response)

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
    getCategorySub (categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: { categoryId: categoryId }
      })
        .then(response => {
          console.log(response)

          if (response.data.code === 200 && response.data.msg) {
            this.categorySub = response.data.msg
            this.active = 0
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.getCategorySub(categoryId)
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
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
</style>
