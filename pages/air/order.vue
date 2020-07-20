<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm v-if="order" :data="order" />
      </div>

      <!-- 侧边栏 -->
      <OrderAside v-if="order" :data="order" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      order: null
    };
  },
  mounted() {
    this.$axios({
      url: "/airs/" + this.$route.query.id,
      method: "get",
      params: {
        seat_xid: this.$route.query.seat_xid
      }
    }).then(res => {
      const { data } = res;
      this.order = data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>