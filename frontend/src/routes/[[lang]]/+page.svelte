<script lang="ts">
	export let data;
</script>

<main>
	<h1>Welcome to Marlene Raymakers</h1>
	<p>Luxury made-to-measure fashion and art</p>
</main>

<style>
	main {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.25rem;
		color: var(--color-accent);
	}
</style>