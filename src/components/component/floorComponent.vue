<template>
  <div class="floor">
    <div class="floor-title">{{floorTitle}}</div>
    <!-- 不规则楼层 -->
    <div class="floor-anomaly">
      <div class="floor-one">
        <img :src="floorData_0.image" width="100%" />
      </div>
      <div>
        <div class="floor-two">
          <img :src="floorData_1.image" width="100%" />
        </div>
        <div>
          <img :src="floorData_2.image" width="100%" />
        </div>
      </div>
    </div>
    <!-- 规则楼层 -->
    <div class="floor-rule">
      <div v-for="(floorItem,index) in floorData.slice(3)" :key="index">
        <img :src="floorItem.image" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['floorData', 'floorTitle'],
  data () {
    return {
      floorData_0: {},
      floorData_1: {},
      floorData_2: {}
    }
  },
  watch: {
    floorData: function (val) {
      this.floorData_0 = this.floorData[0]
      this.floorData_1 = this.floorData[1]
      this.floorData_2 = this.floorData[2]
    }
  }
}
</script>

<style lang="scss" scoped>
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  div {
    width: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #ddd;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;
  }
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
  div {
    width: 10rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
  }
  div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
}
.floor-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>
