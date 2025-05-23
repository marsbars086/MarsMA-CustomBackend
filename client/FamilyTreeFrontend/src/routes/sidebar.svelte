

<!-- <Modal bind:show={modal_show} /> -->

<script>
import { fly } from 'svelte/transition';
// import Modal from './Modal.svelte';

 let {show, person, close} = $props();
  
//  let {person} = $props();
// export let close;

  function handleClose() {
    console.log("hello?")
    close();
  }

  const deletePerson = async (id) => {
    console.log('hii')
    console.log(id)
    const res = await fetch(`http://localhost:3000/deletePerson/${id}`, {
      method: 'DELETE',
    });
    close();
  }
</script>
		
{#if show}

  <nav transition:fly={{x: 250, opacity: 1}}>
    <button onclick={() => handleClose()}>close</button>
    {#if person}
    <h2>{person.first_name} {person.last_name}</h2>
    <p><strong>Age:</strong> {person.age}</p>
    <p><strong>Family:</strong> {person.family}</p>
    <p><strong>Gender:</strong> {person.gender}</p>
    <p><strong>ID:</strong> {person._id}</p>
    <button onclick={() => deletePerson(person._id)}>delete</button>


  {:else}
    <p>Loading person details...</p>
  {/if}
  </nav>
{/if}

<style>
nav {
  /* position: fixed; */
  top: 0;
  right: 0;
  height: 100%;
  padding: 2rem 1rem 0.6rem;
  border-left: 1px solid #aaa;
  background: #fff;
  overflow-y: auto;
	width: 40rem;
}
</style>