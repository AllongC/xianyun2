<template>
  <div>机票</div>
</template>

<script>
export default {
  mounted() {
    this.$axios({
      url: "/airs",
      method: "get",
      params: this.$route.query
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="less" scoped>
</style>