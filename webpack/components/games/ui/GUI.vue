<style lang="scss" scoped>

</style>

<template>
	<div class="game-gui">
		<div class="game-header">
			<div class="game-menu flex-container center-center">
				<slot name="menu-content"></slot>
			</div>
		</div>
		<div class="game-overlay js-game-ui flex-container center-center col">
			<div id="instruction-overlay" class="game-overlay-page js-instructions-overlay">
				<slot name="instruction-content"></slot>
			</div>
			<div id="pause-overlay" class="game-overlay-page js-pause-overlay">
				<slot name="pause-content"></slot>
			</div>
			<div class="game-overlay-page js-quit-overlay">
				<slot name="quit-content"></slot>
			</div>
			<div class="game-overlay-page js-won-overlay">
				<slot name="won-content"></slot>
			</div>
			<div class="game-overlay-page js-error-overlay">
				<slot name="error-content"></slot>
			</div>
			<div class="game-overlay-page js-lost-overlay">
				<slot name="lost-content"></slot>
			</div>
			<div class="game-overlay-page js-debug-overlay">
					<slot name="debug-content"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: ['state'],
		computed: {
			isShown() {
				return {}
			}
		},
		methods: {

		},
		created() {
		}
	}
</script>