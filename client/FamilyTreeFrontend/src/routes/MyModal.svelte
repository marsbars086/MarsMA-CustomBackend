  <script>
    export let show = false;
    export let close = () => {};
    export let position = null;
    export let title = '';
    export let message = {};
  
    // Local state
    let updatedFamily = { last_name: '', culture: '' };
    let newPerson = { first_name: '', last_name: '', age: 0 };
    let personsFamilyname = '';
  
    // Watch for changes in message
    $: if (title === 'Update Family' && message) {
      updatedFamily = { last_name: message.last_name, culture: message.culture };
    }
  
    $: if (title === 'Create Person' && message) {
      personsFamilyname = message.last_name || '';
    }
  
    async function updateFamily(familyId) {
      const res = await fetch(`http://localhost:3000/updatefamilybody/${familyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFamily)
      });
      const result = await res.json();
      console.log(result);
      close();
    }
  
    async function deleteFamily(lastname) {
      await fetch(`http://localhost:3000/deleteFamily/${lastname}`, {
        method: 'DELETE'
      });
      close();
    }
  
    async function addNewPerson(familyname) {
      const res = await fetch(`http://localhost:3000/createpersonbody/${familyname}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerson)
      });
      const result = await res.json();
      console.log(result);
      close();
    }
  </script>
  
  {#if show}
    {#if title === "Update Family"}
      <div role="dialog" class="modal" style="top: {position?.top}px; left: {position?.left}px;">
        <div class="contents">
          <div class="actions">
            <button on:click={close}>X</button>
          </div>
          <h2>{title}</h2>
          <label for input>Last Name</label>
          <input bind:value={updatedFamily.last_name} />
          <label for input>Culture</label>
          <input bind:value={updatedFamily.culture} />
          <div class="actions">
            <button on:click={() => updateFamily(message._id)}>Submit</button>
          </div>
        </div>
      </div>
  
    {:else if title === "Create Person"}
      <div role="dialog" class="modal" style="top: {position?.top}px; left: {position?.left}px;">
        <div class="contents">
          <h2>{title}</h2>
          <label for input>First Name</label>
          <input bind:value={newPerson.first_name} placeholder="Hayes" />
          <label for input>Last Name</label>
          <input bind:value={newPerson.last_name} placeholder="Resser" />
          <label for input>Family</label>
          <input value={personsFamilyname} placeholder="Resser" readonly/>
          <label for input>Age</label>
          <input type="number" bind:value={newPerson.age} />
  
          <button on:click={() => addNewPerson(personsFamilyname)}>Submit</button>
          <div class="actions">
            <button on:click={close}>OK</button>
          </div>
        </div>
      </div>
  
    {:else if title === "Are you sure you want to delete this family?"}
      <div role="dialog" class="modalfixed">
        <div class="contents">
          <h2>{title}</h2>
          <p>Members won't be deleted</p>
          <div class="actions">
            <button on:click={close}>Cancel</button>
            <button on:click={() => deleteFamily(message)}>Delete Family</button>
          </div>
        </div>
      </div>
    {/if}
  {/if}
  
  <style>
    .modal, .modalfixed {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
  
    .modalfixed {
      position: fixed;
      top: 0; bottom: 0; left: 0; right: 0;
    }
  
    .contents {
      min-width: 240px;
      padding: 16px;
      background: white;
      display: flex;
      flex-direction: column;
      pointer-events: auto;
    }
  
    .actions {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  
    h2 {
      text-align: center;
      font-size: 24px;
    }
  
    p {
      text-align: center;
      margin-top: 16px;
    }
  </style>
  