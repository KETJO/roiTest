<template lang="pug">
	.manager 
		.manager__name
			img(src='../assets/img/manager.png')
			.manager__title 
				h3 Константин <br> Константинопольский
				p Менеджер по подбору
		.line 
		.manager__content
			.manager__contact 
				p +7(931) 364-87-11
				p murashkintcev@bvbrealty.ru 
			.manager__btns
				button.order Заказать показ 
				button.call Позвонить мне 
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="sass" scoped>
@import "../assets/variables"
.manager 
	padding: 30px
	display: flex
	flex-direction: column
	margin-top: 28px
	@include borderCard
	&__name 
		display: flex
		img 
			width: 80px
			height: 100%
		h3 
			font-size: 16px
			line-height: 20px
		p  
			font-size: 14px
			
	&__title 
		margin-left: 12px 
		display: flex
		flex-direction: column
		justify-content: center
		p 
			font-size: 14px 
			font-family: $norms300
			margin-bottom: 0px
			margin-top: 5px
			color: $text-grey
	&__contact 
		p 
			margin-bottom: 0px
			font-size: 16px 
			line-height: 24px
			&:last-child
				margin-top: 5px
	&__btns 
		display: flex 
		flex-direction: column
		margin-top: 24px
		button 
			height: 48px
			font-family: $norms700
		.order 
			@include btn-custom-yellow
		.call 
			margin-top: 12px
			@include btn-custom-grey
			
.line 
	margin: 16px 0px 16px 0px
	@include divide-line
	
</style>