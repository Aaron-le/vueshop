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
          <img v-lazy="banner.imgUrl" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类 -->
    <div class="type-bar">
        <div  v-for="(cate,index) in category" :key="index" >
                <img v-lazy="cate.image" width="90%" />
                <span>{{cate.mallCategoryName}}</span> 
        </div>
    </div>  

    <!-- 广告 -->
    <div class="ad-banner">
        <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      bannerImgList: [
        { imgUrl: require("../../assets/images/banner_01.jpg") },
        { imgUrl: require("../../assets/images/banner_02.jpg") },
        { imgUrl: require("../../assets/images/banner_03.jpg") }
      ],
      category:[],
      adBanner:[]
    };
  },
  created() {
    this.$http
      .get("../../static/home.json")
      .then(res => {
        console.log(res);
        if(res.status==200){
            this.category=res.data.data.category;
            this.adBanner = res.data.data.advertesPicture;           
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
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
  max-height: 10rem;
  overflow: hidden;
}
.type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
</style>
