<template>
  <div>
    <div class="container">
      <!-- 幻灯片 -->
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <div
            class="banner-image"
            :style="`
                background:url(${item.url}) center center no-repeat;
                background-size:contain contain;
                `"
          ></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: []
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners",
      method: "get"
    }).then(res => {
      const { data } = res.data;
      this.banners = data.map(item => {
        return {
          ...item,
          url: this.$axios.defaults.baseURL + item.url
        };
      });
      console.log(this.banners);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>