<template>
  <div>
    <!--search bar layout-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- banner -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerImgList" :key="index">
          <img :src="banner.imgUrl" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- 广告 -->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
    </div>

    <!--swiper-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | toFixed(2)}} (￥{{item.mallPrice | toFixed(2)}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
export default {
  data () {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerImgList: [
        { imgUrl: require('../../assets/images/banner_01.jpg') },
        { imgUrl: require('../../assets/images/banner_02.jpg') },
        { imgUrl: require('../../assets/images/banner_03.jpg') }
      ],
      category: [],
      adBanner: [],
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: [],
      swiperOption: {
        slidesPerView: 3 // 每屏显示个数
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent
  },
  created () {
    this.$http
      .get('../../static/home.json')
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.category = res.data.data.category
          this.adBanner = res.data.data.advertesPicture
          this.recommendGoods = res.data.data.recommend
          this.floor1 = res.data.data.floor1
          this.floor2 = res.data.data.floor2
          this.floor3 = res.data.data.floor3
          this.floorName = res.data.data.floorName // 楼层名称
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  height: 2.4rem;
  overflow: hidden;
  background-color: #d5d5d5;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #d5d5d5;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  width: 100%;
  clear: both;
  // max-height: 5rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
  text-align: center;
  padding: 1rem 0;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
</style>
