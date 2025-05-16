<script>
    import { onMount } from 'svelte';
    let people = $state([]);
    let families = $state([]);

    const getPeople = async () => {
      const res = await fetch('http://localhost:3000/People');
      people = await res.json();
      console.log(people)
    };

    const getFamilies = async () => {
        const res = await fetch('http://localhost:3000/Families')
        families = await res.json();
        console.log(families)
    }

    onMount(() => {
      getPeople();
      getFamilies();
    });

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>People</h1>
{#each people as item}
<li>{item.first_name} - {item.last_name} </li>
{/each}

<h1>Families</h1>
{#each families as item}
<li>{item.last_name} - {item.culture} </li>
{/each}