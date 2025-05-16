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
<div class = "DisplayFamilyContainers" >
{#each families as item}
<details open>
    <summary> 
      {item.last_name} Family 
      <button>Delete</button>
    </summary>
    <li>{item.culture} </li>
    <li>members within </li>
</details>
{/each}
</div>

<style>
  details {
  /* padding: 10px; */
  margin:10px;
  background-color: #bcc0c3;
  border-radius: 5pxrgb(186, 198, 207)}

summary {
  background-color: #0b0d0f;
  color: white;
  padding: 10px;
}
.DisplayFamilyContainers {
  display:flex; 
        flex-direction:row;
        flex-wrap: wrap;
        justify-content: space-between;
}
</style>