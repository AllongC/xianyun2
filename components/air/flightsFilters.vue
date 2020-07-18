<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{route.departCity}} - {{route.destCity}}
        /
        {{route.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="filterTotal">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="filterTotal">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="[item.from,item.to]"
            v-for="(item,index) in options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="filterTotal">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="filterTotal">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item,index) in planeSize"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Object,
    flights: Array
  },
  data() {
    return {
      route: {},
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      planeSize: [
        {
          label: "大",
          value: "L"
        },
        {
          label: "中",
          value: "M"
        },
        {
          label: "小",
          value: "S"
        }
      ]
    };
  },
  mounted() {
    this.route = this.$route.query;
    console.log(this.flights[0]);
  },
  methods: {
    filterTotal() {
      let dataList = [...this.flights];
      if (this.airport) {
        dataList = dataList.filter(item => {
          return item.org_airport_name == this.airport;
        });
        this.$emit("changeDataList", dataList);
      }

      if (this.flightTimes) {
        dataList = dataList.filter(item => {
          const dep_time = Number(item.dep_time.split(":")[0]);
          const time = this.flightTimes;
          return time[0] < dep_time && time[1] > dep_time;
        });
        this.$emit("changeDataList", dataList);
      }
      if (this.company) {
        dataList = dataList.filter(item => {
          return item.airline_name == this.company;
        });
        this.$emit("changeDataList", dataList);
      }
      if (this.airSize) {
        dataList = dataList.filter(item => {
          return item.plane_size == this.airSize;
        });
        this.$emit("changeDataList", dataList);
      }
    },

    // 撤销条件时候触发
    handleFiltersCancel() {}
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>