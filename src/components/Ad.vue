<template lang="pug">
	.ad 
		h2 	ЖК Министерские озера
		.stat-line 
			a(href='#')
				img.net(src='../assets/img/Net.png') 
			a(href="#")
				img.heart(src='../assets/img/Heart.png')
			.rating 
				v-rating(v-model='rating' background-color='yellow' color='yellow accent-4' dense='' half-increments='' hover='' size='18')
			a(href="#") 23 отзыва
		.cost 
			h3 1.5-24.8 млн.₽
			span 120 000 - 170 000 ₽ за м²
		.line 
		.mortgage
			p В ипотеку
			a от 29 500 ₽/мес
</template>

<script>
export default {
  data: () => ({
    rating: 3.2
  })
};
</script>

<style lang="sass" scoped>
@import "../assets/variables"
.ad 
	width: 350px
	height: auto
	padding: 30px
	display: flex
	flex-direction: column
	justify-content: space-between
	@include borderCard
	h2 
		font-size: 20px
.stat-line 
	display: flex
	align-items: center
	margin-top: 15px
	a
		&:first-child
			margin-right: 14px
		&:nth-child(2)
			margin-right: 17px
		&:last-child
			margin-left: 5px
			text-decoration: none!important
			display: flex
			align-items: center
			font-family: $norms300
.cost
	margin-top: 16px
	h3 
		font-size: 20px
	span 
		font-size: 14px 
		font-family: $norms300
.line 
	@include divide-line
.mortgage
	display: flex 
	align-items: center
	margin-top: 12px
	p 
		font-size: 14px 
		color: $text-black
		margin-right: 8px
		margin-bottom: 0px
	a 
		font-family: $norms300
</style>