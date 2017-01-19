<style>

</style>

<template>
<!-- -->
	<div class="game-page">
		<div class="game-header">
			<div class="headerBar">
				<slot name="header-content"></slot>
			</div>
			<div class="menuBar">
				<slot name="menu-content"></slot>
			</div>
		</div>
		<div class="game-overlay js-game-ui">
			<div id="instruction-overlay" class="game-overlay-page js-instructions-overlay ghost">
				<slot name="instruction-content"></slot>
			</div>
			<div id="pause-overlay" class="game-overlay-page js-pause-overlay ghost">
				<slot name="pause-content"></slot>
			</div>
			<div class="game-overlay-page js-quit-overlay ghost">
				<slot name="quit-content"></slot>
			</div>
			<div class="game-overlay-page js-won-overlay ghost">
				<slot name="won-content"></slot>
			</div>
			<div class="game-overlay-page js-error-overlay ghost">
				<slot name="error-content"></slot>
			</div>
			<div class="game-overlay-page js-lost-overlay ghost">
				<slot name="lost-content"></slot>
			</div>
		</div>
	</div>
</template>

<script>

</script>