<script>
    import GameField from "./GameField.svelte";
    import Frame from "./Frame.svelte";
    import GameControls from "./GameControls.svelte";
    import Header from "./Header.svelte";

</script>

<main>
	<Header height={"15%"}/>

	<GameField height={"65%"}/>
	<GameControls height={"15%"}/>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
		height: 100%;
		width: 100%;
	}
</style>
