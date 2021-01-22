<template lang="pug">
    div 
        .filter 
            Loader.ldr(v-if="!loaded")
            h1 Квартиры в ЖК «Фрукты»
            .rooms
                span Количество комнат
                .rooms__items
                    button#roomsBtn Своб.план
                    button#roomsBtn Студия
                    button#roomsBtn.round 1
                    button#roomsBtn.round 2
                    button#roomsBtn.round 3
                    button#roomsBtn.fourPlus.round
            .costAndSquare
                .cost.input-side 
                    span Стоимость квартиры
                    .cost__box.input-side__box
                        .from
                            span От
                            v-text-field.mt-0.pt-0(:value='range[0]' hide-details='' loading="false" single-line='' type='number' @change='$set(range, 0, $event)')
                        .divider
                        .to
                            span до
                            v-text-field.mt-0.pt-0(:value='range[1]' hide-details='' loading="false" single-line='' type='number' @change='$set(range, 1, $event)')
                            span ₽
                        v-range-slider.align-center(v-model='range' :max='slPrMax' :min='slPrMin' hide-details='')

                .square.input-side 
                    span  Общая площадь
                    .square__box.input-side__box
                        .from
                            span От
                            v-text-field.mt-0.pt-0(:value='rangeSq[0]' hide-details='' loading="false" single-line='' type='number' @change='$set(rangeSq, 0, $event)')
                        .divider
                        .to
                            span до
                            v-text-field.mt-0.pt-0(:value='rangeSq[1]' hide-details='' loading="false" single-line='' type='number' @change='$set(rangeSq, 1, $event)')
                            span м²
                        v-range-slider.align-center(v-model='rangeSq' :max='slSqMax' :min='slSqMin' hide-details='')
            .buttons
                button.btn.reset(@click="resetResults")
                    p Сбросить
                button.btn.show(@click="showResults")
                    p Показать {{resultLength}} квартиры
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { bus } from "../main";
import Loader from "../components/Loader";

export default {
  components: {
    Loader
  },
  data: () => ({
    range: [-0, 70],
    slPrMin: 0,
    slPrMax: 0,

    rangeSq: [-0, 70],
    slSqMin: 0,
    slSqMax: 0,

    rooms: "all",
    resultLength: 0
  }),
  computed: {
    ...mapGetters(["sortByPrice", "sortBySquares", "flats", "loaded"])
  },
  methods: {
    ...mapMutations([
      "SET_FILTERED_DATA",
      "CHANGE_LOADED",
      "RESET_FILTERED_DATA"
    ]),
    showResults() {
      this.CHANGE_LOADED();
      setTimeout(() => {
        this.CHANGE_LOADED();
      }, 2000);
      bus.$emit("showResults");
    },
    resetResults() {
      this.range = [-0, 70];
      this.slPrMin = 0;
      this.slPrMax = 0;

      this.rangeSq = [-0, 70];
      this.slSqMin = 0;
      this.slSqMax = 0;

      this.rooms = "all";
      this.resultLength = 0;
      this.RESET_FILTERED_DATA();
      this.setStartVals();
      this.handleRoomsBtn();
    },
    setStartVals() {
      this.slPrMin = this.sortByPrice[0].price;
      this.slPrMax = this.sortByPrice[this.sortByPrice.length - 1].price;
      this.range[0] = this.slPrMin;
      this.range[1] = this.slPrMax;

      this.slSqMin = this.sortBySquares[0].totalArea;
      this.slSqMax = this.sortBySquares[
        this.sortBySquares.length - 1
      ].totalArea;
      this.rangeSq[0] = this.slSqMin;
      this.rangeSq[1] = this.slSqMax;
    },
    roomsSet(e) {
      let roomsType;
      const roomsBtns = document.querySelectorAll("#roomsBtn");

      roomsBtns.forEach(btn => {
        if (e.target.textContent != btn.textContent)
          btn.classList.remove("room-active");
      });

      e.target.classList.toggle("room-active");

      const target = e.target.textContent;
      switch (target) {
        case "":
          roomsType = "4";
          break;
        case "Своб.план":
          roomsType = "layout";
          break;
        case "Студия":
          roomsType = "atelier";
          break;
        default:
          roomsType = e.target.textContent;
          break;
      }

      const isActive = document.querySelector(".room-active");

      if (!isActive) roomsType = "all";
      this.rooms = roomsType;
    },
    filterFlats() {
      let result = [];
      //room filter
      let roomFiltered = [];
      roomFiltered = this.flats.filter(flat => {
        if (this.rooms === "all") return flat.filterRooms;
        else return flat.filterRooms === this.rooms;
      });
      //price filter
      let priceFiltered = [];
      priceFiltered = roomFiltered.filter(flat => {
        return flat.price >= this.range[0] && flat.price <= this.range[1];
      });
      //squares filter
      let squaresFiltered = [];
      squaresFiltered = priceFiltered.filter(flat => {
        return (
          flat.totalArea >= this.rangeSq[0] && flat.totalArea <= this.rangeSq[1]
        );
      });
      result = squaresFiltered;
      this.resultLength = squaresFiltered.length;

      this.SET_FILTERED_DATA(result);
    },
    handleRoomsBtn() {
      const roomsBtns = document.querySelectorAll("#roomsBtn");
      roomsBtns.forEach(btn => {
        btn.addEventListener("click", this.roomsSet);
      });
    }
  },
  watch: {
    range() {
      this.filterFlats();
    },
    rangeSq() {
      this.filterFlats();
    },
    rooms() {
      this.filterFlats();
    }
  },
  mounted() {
    this.setStartVals();
    this.handleRoomsBtn();
  }
};
</script>
<style lang="sass">
@import "../assets/variables"
.ldr
    position: absolute 
    top: 50%
    left: 50% 
    transform: translate(-50%,-50%)
    z-index: 100
    width: 100%
    height: 100%
    display: flex 
    justify-content: center
    align-items: center
    background-color: rgba(255,255,255, 0.8)
.filter
    position: relative
    width: 730px
    height: auto
    background-color: $white
    padding: 30px
    font-family: $norms700
    @include borderCard
    h1 
        font-size: 34px
    span
        @include title-grey
.rooms 
    margin-top: 32px
    &__items 
        display: flex
        button 
            font-family: $norms300
            color: $text-black
            font-size: 16px
            padding: 8px 16px
            margin-top: 8px
            margin-right: 8px
            @include borderNumRooms
            &:hover 
                cursor: pointer
            &:active 
            &:focus 
                outline: none
            &.room-active
                border: 1px solid $text-black
        .round 
            width: 44px
            height: 44px
        .fourPlus
            background-color: $main-yellow
            position: relative
            border-radius: 100%
            &::after 
                position: absolute
                top: 50% 
                left: 50%
                transform: translate(-50%,-50%)
                content: '4+'
.costAndSquare
    margin-top: 20px
    display: flex
    justify-content: space-between
.input-side
    width: 48%
    &__box
        display: flex
        align-items: center
        justify-content: center
        width: 100%
        height: 48px
        margin-top: 8px
        padding: 12px 12px 10px 16px
        position: relative
        @include borderInputs
        input 
            width: 100%
            text-align: center
            font-family: $norms300
            &:focus 
                outline: none
        .from,.to
            width: 100%
            display: flex
            justify-content: space-between
            align-items: center
        .to 
            padding-left: 8px
        .divider
            width: 2px
            height: 100%
            background-color: $text-grey
            opacity: .2
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button 
            -webkit-appearance: none
            margin: 0

.v-input__slider 
    position: absolute!important 
    bottom: -32%!important 
    width: 90%!important 
    
.v-slider__thumb
    width: 6px!important
    height: 6px!important
    border: red solid 2px!important
    position: relative!important
.v-slider__thumb::before 
    display: none!important
.v-slider__thumb::after
    content: ''
    width: 5px
    height: 5px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background-color: none
    border: 1px solid $blue 
    padding: 8px
    border-radius: 50%
.v-slider__thumb-container--acitve 
    transition: none!important
.buttons
    margin-top: 39px
    display: flex
    justify-content: space-between
.reset
    width: 190px
    height: 40px
    @include btn-custom-grey
.show 
    width: 300px
    height: 40px
    @include btn-custom-yellow 

</style>