<template>
    <div>
<div class="goods-info" @click="goDetail()">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | toFixed(2) }}</div>
    </div>
    </div>
</template>

<script>
export default {
  props: ['goodsImage', 'goodsName', 'goodsPrice', 'goodsId'],
  methods: {
    goDetail () {
      this.$router.push({name: 'Goods', query: {goodsId: this.goodsId}})
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap;
    }
</style>
