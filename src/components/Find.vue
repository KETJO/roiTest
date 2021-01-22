<template lang="pug">
	.find
		.cover(v-if="!loaded")
		.empty(v-if="sortedData.length==0") 
			.empty__image-side 
				.cirkle-dashed 
				.lens
					.round 
						.stick
				.sliders-round
					.sldrs
						.sldr 
							.slRoLeft
						.sldr
							.slRoRight
			.empty__info-side 
				h3 Мы ничего похожего <br> не нашли
				p Попробуйте задать другие условия поиска <br> или сбросьте фильтр
		.find-cont(v-else)
			h2 Найдено {{sortedData.length}} квартир
			.table 
				.table-header.table-row 
					.table-header__item.table-row-item Тип
					.table-header__item.table-row-item Этаж
					.table-header__item.table-row-item Срок сдачи 
					.table-header__item.table-row-item Площадь
					.table-header__item.table-row-item Стоимость
					.table-header__item.table-row-item 
				.table-row(v-for="flat in flatsToShow" :key="flat.id" @click="expandCard").flatLine
					.table-row-item.type {{flat.room|roomType}}
					.table-row-item {{flat.floor}}/25
					.table-row-item {{flat.quarter}}кв.{{flat.year}}
					.table-row-item {{flat.totalArea}}м²
					.table-row-item.cost {{flat.price|splitByNum}}₽
					.table-row-item 
						.heart
							img(src='../assets/img/Heart.png')
						.arrow 
							img(src='../assets/img/arrow.png')
					.content-part
						.chips 
							.discount
								a(href="#") Скидка 2%
								img(src="../assets/img/questionGreen.png")
							.mat-cap
								a(href="#") Материнский капитал
								img(src="../assets/img/questionOrange.png")
							.mortgage 
								a(href="#") Ипотека от 1% 
						.detail 
							.image-side 
								img(src="../assets/img/flat.png") 
							.detail__info
								h3 {{flat.room|roomTypeDetail}}
								.detail__first-row 
									span {{flat.price|splitByNum}} ₽
									.vert-line 
									span {{flat.totalArea}}м²
								.detail__scnd-row  
									.detail__square 
										p.detail-subtitle Цена за м²
										p {{flat.priceM2}} ₽
									.detail__otdelka
										p.detail-subtitle Отделка
										p {{flat.finishingApartments}}
									.detail__corp
										p.detail-subtitle Корпус 
										p {{flat.corpus}}
								.detail__desc 
									a Подробное описание
									img(src="../assets/img/arrowBlue.png")
						.down-line 
						.inner-form
							h3 Хотите записаться на просмотр объекта?
							h4 Оставьте свои данные, и мы организуем просмотр в удобное для вас время.
							.inner-form__body
								.name-side 
									p Имя 
									input(placeholder="Введите имя")
								.phone-side 
									p Номер телефона 
									input(placeholder="+7")  
								.order-btn
									button Оставить заявку
							.policy
								span Оставляя заявку вы соглашаетесь с 
								a политикой конфиденциальности
</template>
<script>
import { mapGetters } from "vuex";
import { bus } from "../main";
import { auxBus } from "../main";
export default {
  data: () => ({
    sortedData: [],
    indexFlatToAppear: [],
    flatsToShow: []
  }),
  computed: {
    ...mapGetters(["flats", "filteredFlats", "loaded"])
  },
  methods: {
    updateShowsData() {
      this.sortedData = this.filteredFlats;
      this.updatedPageContent;
    },
    expandCard(e) {
      e.target.closest(".flatLine").classList.toggle("active");
    }
  },

  mounted() {
    bus.$on("showResults", () => {
      this.updateShowsData();
      this.flatsToShow = this.filteredFlats.slice(0, 9);
    });
    this.sortedData = this.flats;

    auxBus.$on("pageChange", paginatedFlats => {
      this.flatsToShow = paginatedFlats;
    });

    this.flatsToShow = this.flats.slice(0, 9);
  },
  filters: {
    roomType(val) {
      let result;
      switch (val) {
        case "layout":
          result = "Cвоб.план.";
          break;
        case "atelier":
          result = "Студия";
          break;
        default:
          result = val + "-комн.";
          break;
      }
      return result;
    },
    roomTypeDetail(val) {
      let result;
      switch (val) {
        case "layout":
          result = "Cвободная планировка";
          break;
        case "atelier":
          result = "Студия";
          break;
        default:
          result = val + "-комнатная квартира";
          break;
      }
      return result;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/variables"
.cover 
	background-color: rgba(255,255,255, 0.8)
	position: absolute 
	top: 0% 
	left: 0%
	width: 100%
	height: 100%
	z-index: 1
.find 
	width: 730px
	height: auto
	padding: 30px 0px 0px 0px
	margin-top: 30px
	position: relative
	@include borderCard
	h2 
		font-size: 24px
		padding: 0px 30px
	.table 
		margin-top: 24px
		width: 100%
		text-align: center
		.table-header
			height: 40px 
			cursor: default
			padding: 0px 30px
		.table-header__item 
			font-size: 14px 
			line-height: 16px
			color: $text-grey
			font-family: $norms300
		.table-row 
			display: flex
			align-items: center
			justify-content: space-between
		.table-row-item
			display: flex
			align-items: center
			font-size: 14px
			&:nth-child(1)
				width: 10%
				justify-content: flex-start
			&:nth-child(2)
				width: 22%
				justify-content: center
			&:nth-child(3)
				width: 16%
				justify-content: flex-start
			&:nth-child(4)
				width: 15%
				justify-content: flex-start
			&:nth-child(5)
				width: 18%
				justify-content: flex-end
			&:nth-child(6)
				width: 19%
				display: flex 
				justify-content: flex-end
				.heart 
					width: 40px
					height: 40px
					background-color: $bg-btn-grey
					border-radius: 50% 
					display: flex
					align-items: center
					justify-content: center
					margin-right: 24px
			&.type 
				font-size: 16px
				font-family: $norms700
			&.cost 
				font-size: 20px
				font-family: $norms700
				white-space: nowrap
		.flatLine
			display: flex
			align-items: center
			height: 72px
			padding: 23px 30px
			position: relative
			&:hover 
				cursor: pointer
				box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.12)
			&.active 
				height: 600px
				align-items: flex-start
				.content-part
					display: flex 
.content-part
	display: none
	position: absolute
	flex-direction: column
	top: 60px
	left: 0px
	width: 100%
	padding: 0px 30px 0px 30px 
	.chips 
		display: flex
	.discount,.mat-cap,.mortgage 
		height: 30px 
		border-radius: 50px
		font-size: 14px 
		font-family: $norms300
		margin-right: 8px
		padding: 0px 12px
		display: flex
		justify-content: center 
		align-items: center
		a 
			text-decoration: none 
			color: inherit
		img 
			margin-left: 8px
	.discount 
		background-color: $lightGreen 
		color: $darkGreen
	.mat-cap 
		background-color: $lightOrange
		color: $darkOrange
	.mortgage 
		background-color: $lightViolet
		color: $darkViolet

	.detail
		width: 100%
		margin-top: 43px
		margin-left: 12px
		display: flex
		.image-side
			width: 215px
			height: 215px
			display: flex
			align-items: center
			justify-content: center
		.detail__first-row
			display: flex
			margin-top: 16px
			span 
				font-size: 14px 
				font-family: $norms300
			.vert-line 
				height: 20px
				width: 1px
				background-color: $text-grey
				margin: 0px 16px
				opacity: 50%
		.detail__scnd-row
			margin-top: 20px
			display: flex
			p 
				font-size: 16px
				font-family: $norms400
				color: $text-black 
			.detail-subtitle 
				font-size: 14px 
				color: $text-grey
				font-family: $norms300
			.detail__square 
				margin-right: 85px
			.detail__otdelka
				margin-right: 61px
		.detail__desc
			display: flex 
			justify-content: flex-start
			align-items: center
			img 
				margin-left: 9px 
				width: 6px 
				height: 10px
		h3 
			font-size: 24px
			text-align: left

	.down-line
		@include divide-line
	.inner-form 
		margin-top: 20px
		h3 
			font-size: 20px
			text-align: left
		h4 
			font-size: 14px 
			text-align: left
			font-family: $norms300
			margin-top: 8px
		.inner-form__body
			display: flex
			justify-content: space-between
			
			.name-side,.phone-side,.order-btn 
				display: flex
				flex-direction: column 
				align-items: flex-start
				margin-top: 20px
				width: 215px
				p 
					margin-bottom: 0px
					font-size: 14px
					color: $text-grey
					font-family: $norms300
				input 
					width: 100%
					height: 48px
					margin-top: 8px
					@include borderInputs
				input::placeholder 
					padding-left: 16px
					opacity: 50%
			.order-btn 
				display: flex 
				justify-content: flex-end
				button 
					height: 48px
					width: 100%
					font-family: $norms700
					@include btn-custom-yellow
		.policy 
			font-size: 14px 
			//font-family: $norms300
			opacity: 50%
			display: flex
			justify-content: flex-start
			margin-top: 12px 
.empty 
	display: flex
	align-items: center
.empty__image-side 
	width: 177px
	height: 177px
	margin-left: 60px
	margin-bottom: 30px
	position: relative
	.cirkle-dashed 
		width: 100% 
		height: 100% 
		border: 3px dashed #E9E9E9
		box-sizing: border-box
		border-radius: 50%
	.lens
		position: absolute 
		top: 50%
		left: 50% 
		transform: translate(-50%,-50%)
		.round 
			width: 55px
			height: 55px
			border: 6px solid #E9E9E9
			border-radius: 50%
			position: relative
		.stick 
			width: 40px 
			height: 7px 
			background-color: #E9E9E9
			transform: rotate(35deg)
			position: absolute 
			bottom: -15%
			left: 90%
	.sliders-round
		width: 52px
		height: 52px 
		background-color: $main-yellow
		border-radius: 50% 
		position: absolute 
		top: 0% 
		right: 0%
		box-shadow: -7.38996px 16px 24px rgba(0, 0, 0, 0.12)
		.sldrs
			position: relative
			display: flex
			flex-direction: column
			justify-content: center 
			align-items: center
			width: 100%  
			height: 100% 
			transform: rotate(-10deg)
			.sldr 
				margin: 4px 0px
				width: 50% 
				height: 2px  
				background-color: black
				position: relative
				.slRoLeft,.slRoRight 
					border: solid black 2px
					background-color: $main-yellow
					z-index: 1
					width: 10px 
					height: 10px 
					border-radius: 50%
					position: absolute 
				.slRoLeft 
					top: -225% 
					left: 15% 
				.slRoRight 
					top: -225% 
					right: 15% 
.empty__info-side
	margin-left: 83px
	h3 
		font-size: 24px 
		line-height: 28px 
	p  
		font-size: 16px 
		line-height: 24px 
		margin-top: 12px
</style>