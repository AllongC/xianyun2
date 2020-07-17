<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters v-if="dataInfo.options" :options="dataInfo.options" />
        </div>

        <!-- 航班头部布局 -->
        <flightsListHead />

        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
          <el-pagination
            @size-change="changeSize"
            @current-change="changePage"
            :current-page="currentPage"
            :page-sizes="[5,10,15,20]"
            :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
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
import FlightsFilters from "@/components/air/flightsFilters.vue";
export default {
  components: {
    flightsListHead,
    flightsItem,
    FlightsFilters
  },
  data() {
    return {
      dataInfo: {},
      flights: [],
      PageSize: 5,
      total: 0,
      currentPage: 1,
      dataList: []
    };
  },
  methods: {
    changeData() {
      const start = this.PageSize * (this.currentPage - 1);
      const end = this.PageSize * this.currentPage;
      this.dataList = this.flights.slice(start, end);
    },
    changeSize(size) {
      this.PageSize = size;
      this.changeData();
    },
    changePage(page) {
      this.currentPage = page;
      this.changeData();
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      method: "get",
      params: this.$route.query
    }).then(res => {
      this.total = res.data.total;
      this.dataInfo = res.data;
      this.flights = res.data.flights;
      this.changeData();
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
.el-pagination {
  text-align: center;
}
</style>