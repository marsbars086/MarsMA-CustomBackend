<script>
    import { onMount } from 'svelte';
    let people = $state([]);
    let families = $state([]);

    const getPeople = async () => {
      const res = await fetch('http://localhost:3000/People');
      people = await res.json();
    };

    const getFamilies = async () => {
        const res = await fetch('http://localhost:3000/Families')
        families = await res.json();
    }

    onMount(() => {
      getPeople();
      getFamilies();
    });

    const deleteFamily = async (lastname) => {
    const res = await fetch(`http://localhost:3000/deleteFamily/${lastname}`, {
      method: 'DELETE',
    });
    getFamilies()
  }

  let newFamily = $state(
        {name: "", culture: ""}
    );

  // const addNewFamily = async (name, culture) => {
  //   const res = await fetch(`http://localhost:3000/CreateFamily/${name},/${culture}` {
  //     method: 'POST',
  //   });
  //   const data = await res.json();
  //   console.log(data);
  //   getNuevans();
  //   };

  const addNewFamily = async (name, culture) => {
    console.log(newFamily)
    console.log(name)
    console.log(culture)
    const res = await fetch(`http://localhost:3000/CreateFamily/${name}/${culture}`, {
      method: 'POST',
    });

    const result = await res.json();
    console.log(result);
    getFamilies();
  };

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>People</h1>
{#each people as item}
<li>{item.first_name} - {item.last_name} </li>
{/each}

<h1>Families</h1>
<button onclick={()=> console.log($state.snapshot(families))}>click me</button>
<div class = "DisplayFamilyContainers" >
{#each families as item}
<details open>
    <summary> 
      {item.last_name} Family 
      <button onclick={()=> deleteFamily(item.last_name)}>Delete</button>
    </summary>
    <li>{item.culture} </li>
    <li>members within </li>
    <li>Members:</li>
<ul>
  {#each item.members as member}
    <li>{member.first_name}</li>
  {/each}
</ul>
</details>

{/each}
</div>

<h1>add new family</h1>
<input bind:value={newFamily.name} placeholder="Resser"/>
<input bind:value={newFamily.culture} placeholder="African"/>
<button onclick={()=>addNewFamily (newFamily.name,newFamily.culture)}>+</button>

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