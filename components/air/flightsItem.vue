<template>
  <div class="flight-item">
    <div>
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info" @click.native="isShow=!isShow">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{getTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.base_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <el-collapse-transition>
      <div class="flight-recommend" v-if="isShow">
        <!-- 隐藏的座位信息列表 -->
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="4">低价推荐</el-col>
          <el-col :span="20">
            <el-row
              v-for="(item,index) in data.seat_infos"
              :key="index"
              type="flex"
              justify="space-between"
              align="middle"
              class="flight-sell"
            >
              <el-col :span="16" class="flight-sell-left">
                <span>{{item.name}}</span>
                | {{item.supplierName}}
              </el-col>
              <el-col :span="5" class="price">￥{{item.par_price}}</el-col>
              <el-col :span="3" class="choose-button">
                <el-button type="warning" size="mini" @click="sendSet(item.seat_xid)">选定</el-button>
                <p v-if="item.nums!=='A'">剩余：{{item.nums}}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    sendSet(index) {
      this.$router.push(`/air/order?id=${this.data.id}&seat_xid=${index}`);
    }
  },
  computed: {
    getTime() {
      let dep_time = this.data.dep_time.split(":");
      let arr_time = this.data.arr_time.split(":");
      let timeStart = +dep_time[0] * 60 + +dep_time[1];
      let tiemEnd = +arr_time[0] * 60 + +arr_time[1];
      if (arr_time[0] == "00") {
        tiemEnd += 24 * 60;
      }
      let time = Math.abs(timeStart - tiemEnd);
      return Math.floor(time / 60) + "小时" + (time % 60) + "分";
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>