<template lang="pug">
	.pagination 
		ul 
			li(v-if="currentPage!=1" @click="currentPage--").prev 
				img(src="../assets/img/arrow.png") 
			li#pageBtn(v-for="(page,index) in pages" :key="page.id" @click="setPage") {{index+1}} 
			li(v-if="currentPage!=pages" @click="currentPage++").next 
				img(src="../assets/img/arrow.png") 
</template>

<script>
import { bus } from "../main";
import { auxBus } from "../main";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    elIndexRange: [0, 1],

    itemsPerPage: 10,
    pages: 1,
    currentPage: 1
  }),
  computed: {
    ...mapGetters(["flats", "filteredFlats"])
  },
  mounted() {
    bus.$on("showResults", () => {
      this.pages = Math.ceil(this.filteredFlats.length / this.itemsPerPage);
      this.setFirstPage();
    });
    this.pages = Math.ceil(this.flats.length / this.itemsPerPage);
    this.setFirstPage();
  },
  methods: {
    setFirstPage() {
      const btns = document.querySelectorAll("#pageBtn");
      btns[0].classList.add("page-active");

      this.elIndexRange[0] = 0;
      this.elIndexRange[1] = this.itemsPerPage - 1;
    },
    setPage(e) {
      this.currentPage = Number(e.target.textContent);
    },
    setPaginationRange() {
      let from = (this.currentPage - 1) * this.itemsPerPage;
      let to = from + this.itemsPerPage - 1;

      this.elIndexRange[0] = from;
      this.elIndexRange[1] = to;
    }
  },
  watch: {
    currentPage() {
      const pagesBtns = document.querySelectorAll("#pageBtn");
      pagesBtns.forEach(btn => {
        if (this.currentPage == btn.textContent) {
          btn.classList.add("page-active");
        } else btn.classList.remove("page-active");
      });
      this.setPaginationRange();

      setTimeout(() => {
        auxBus.$emit(
          "pageChange",
          this.filteredFlats.slice(this.elIndexRange[0], this.elIndexRange[1])
        );
      }, 0);
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/variables"

.pagination 
	width: 730px
	display: flex
	justify-content: center
	margin: 80px 0px
ul 
	display: flex
	padding: 0px!important
li 
	display: flex
	justify-content: center
	align-items: center
	list-style-type: none
	width: 40px
	height: 40px
	border-radius: 50% 
	background-color: $white
	margin: 0px 6px
.page-active 
	background-color: $blue
	color: $white

.prev
	img 
		transform: rotate(90deg)
.next
	img 
		transform: rotate(-90deg)
</style>