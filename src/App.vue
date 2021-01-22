<template lang="pug">
  v-app 
    .custom-container
      FilterSide
      Find 
      Pagination
      .aside-right 
        Ad
        Manager
</template>

<script>
import FilterSide from "./components/FilterSide";
import Ad from "./components/Ad";
import Manager from "./components/Manager";
import Find from "./components/Find";
import Pagination from "./components/Pagination";

export default {
  name: "App",
  components: {
    FilterSide,
    Ad,
    Manager,
    Find,
    Pagination,
    
  },
  data: () => ({
    //
  })
};
</script>
<style lang="sass">
@import "./assets/variables"
.v-application--wrap
  background-color: $main-bg-color
.custom-container
  width: 1100px
  margin: 80px auto 0 auto
  display: flex
  flex-direction: column
  justify-content: space-between
  position: relative
.aside-right
  margin-left: 30px
  position: absolute
  right: 0%
</style>