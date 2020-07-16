<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <flightsListHead />

        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(item,index) in flights" :key="index" :data="item" />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
export default {
  components: {
    flightsListHead,
    flightsItem
  },
  data() {
    return {
      flights: []
    };
  },
  mounted() {
    this.$axios({
      url: "/airs",
      method: "get",
      params: this.$route.query
    }).then(res => {
      this.flights = res.data.flights;
      console.log(this.flights);
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>