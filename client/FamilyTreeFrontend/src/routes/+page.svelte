<script>
    import { STATES } from 'mongoose';
    import { onMount } from 'svelte';
    // import { Modals } from 'svelte-modals';
    // import {modals} from 'svelte-modals';
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


    function regenerateBackend(){
      console.log("i regenerated")
      getPeople();
      getFamilies();
    }

    onMount(() => {
      regenerateBackend()
    });


    const promptingdeleteFamily = async (lastname) => {
      // modals.open(MyModal, {title:"Are you sure you want to delete this family?", message:lastname})
  }

  let newFamily = $state(
        {name: "", culture: ""}
    );

  let newPerson = $state(
    {first_name:"", last_name:"",age:0}
  )

  let personsFamilyname = $state("")

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

//   const addNewPerson = async (familyname) => {
//     console.log(familyname)
//     console.log($state.snapshot(newPerson))
//     const res = await fetch(`http://localhost:3000/createpersonbody/${familyname}`, {
//       method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(newPerson)
//     });

//     const result = await res.json();
//     console.log(result);
//     getPeople();
//     getFamilies();


//   let selectedPerson = null;

// // function openModal(person) {
// //   selectedPerson = person;
// // }

// // function closeModal() {
// //   selectedPerson = null;
// // }
//   };

  import Sidebar from './Sidebar.svelte';
  let sidebar_show = $state(false);
  let selectedPerson = $state(null);

  function openSidebar(person) {
    selectedPerson = person;
    console.log($state.snapshot(selectedPerson))
    sidebar_show = true;
  }

  function closeSidebar() {
    regenerateBackend()
    sidebar_show = false
  }
  import MyModal from './MyModal.svelte';
  let modalVariable = $state(
    {title: "", message: "", position: null}
  )

  let isModalOpen = $state(false)

  function handleModalClick(event, mytitle, mymessage) {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top + window.scrollY - 183,
      left: rect.left + window.scrollX,
    };
    modalVariable.title = mytitle
    modalVariable.message = mymessage
    modalVariable.position=position
    console.log("here??")
    console.log($state.snapshot(modalVariable))
    isModalOpen = (true);
  }

//   const [isModalOpen, setModalOpen] = createSignal(false);
// // const [modalTitle, setModalTitle] = createSignal("");

const handleModalClose = () => {
  isModalOpen = (false);
  regenerateBackend(); // <-- your custom function
};
</script>










<!-- <div class="layout-container"> -->
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>People</h1>
{#each people as item}
<li>{item.first_name} - {item.last_name} </li>
{/each}

<h1>Families</h1>

<h1>add new family</h1>
<input bind:value={newFamily.name} placeholder="Resser"/>
<input bind:value={newFamily.culture} placeholder="African"/>
<button onclick={()=>addNewFamily (newFamily.name,newFamily.culture)}>+</button>
<!-- <button onclick={(event)=> handleModalClick(event, "UpdateFamily", "Hiiii")}>openmodalfamily</button> -->
<button onclick={(event)=> handleModalClick(event, "yo","hii")}>openmodalrandom</button>
<div class="MainFamilyDisplay">
<div class = "DisplayFamilyContainers" class:with-sidebar={sidebar_show}>
{#each families as item}
<details open>
    <summary> 
      {item.last_name} Family 
      <button onclick={(event)=> handleModalClick(event, "Are you sure you want to delete this family?", item.last_name)}>Delete</button>
      <button onclick={(event)=> handleModalClick(event, "Update Family", item)}>...</button>
    </summary>
    <li>{item.culture} </li>
    <li><button onclick={(event)=> handleModalClick(event, "Create Person", item)}>Add New Member</button>
    <li>Members:</li>
<ul>
  <div class="MemberinFamilyDisplay">
  {#each item.members as member}
    <button class="IconforMember" onclick={() => openSidebar(member)}>{member.first_name}</button>
    <!-- <label for button>{member.first_name}</label> -->
  {/each}
</div>
</ul>
</details>

{/each}

</div>

<Sidebar 
  show={sidebar_show} 
  person={selectedPerson} 
  close={() => closeSidebar()} 
/>

</div>

<MyModal
  show={isModalOpen}
  close={()=>handleModalClose()}
  title={modalVariable.title}
  message={modalVariable.message}
  position={modalVariable.position}
/>

<!-- <h1>add new person</h1>
<input bind:value={newPerson.first_name} placeholder="Hayes"/>
<input bind:value={newPerson.last_name} placeholder="Resser"/>
<input bind:value={personsFamilyname} placeholder="Resser"/>
<input type="number" bind:value={newPerson.age}/>

<button onclick={()=>addNewPerson(personsFamilyname)}>submit</button> -->

<!-- {#if selectedPerson}
  <Sidepanel person={selectedPerson} onClose={closeModal} />
{/if} -->


<!-- <Sidebar bind:show={sidebar_show} /> -->

<!-- <Modals> -->
  <!-- shown when any modal is opened -->
  <!-- {#snippet backdrop({ close })} -->
    <!-- <div class="backdrop" onclick={() => close()} /> -->
      <!-- <button class="backdrop" onclick={() => close()} >backdrop</button>
  {/snippet}
</Modals> -->

<!-- </div> -->

<style>

/* .layout-container {
  display: flex;
} */

  details {
  /* padding: 10px; */
  margin:10px;
  background-color: #bcc0c3;
  width:400px;
  border-radius: 5pxrgb(186, 198, 207)}

summary {
  background-color: #0b0d0f;
  color: white;
  padding: 10px;
  width:380px;
}
.MainFamilyDisplay{
  display: flex;
  flex-direction: row; /* important */
  flex-wrap: nowrap;   /* prevent stacking */
}
.DisplayFamilyContainers {
  display:flex; 
        flex-direction:row;
        flex-wrap: wrap;
        justify-content: space-between;
  /* margin-right: 800px; */
}
.DisplayFamilyContainers.with-sidebar {
  margin-right: 2rem;
}
.MemberinFamilyDisplay {
  display:flex; 
        flex-direction:row;
        flex-wrap: wrap;
        justify-content: space-between;
        justify-content: center;
}
.IconforMember{
		/* font-size:1em; */
    font-size: clamp(1.5rem, 1.9vw, 2.2rem);
		padding:0.1em;
    border-radius: 50%;
    background-color: #48abe0;
  color: white;
  border: none;
  padding: 5px;
  /* font-size: 31px; */
  height: 80px;
  width: 80px;
  margin: 5px;
  /* box-shadow: 0 2px 4px darkslategray; */
  transition: box-shadow 0.3s ease;
}
.IconforMember:hover{
  box-shadow: 10px 10px 20px rgba(36, 36, 36,0.5);
}
/* .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    color:transparent;
  } */
</style>