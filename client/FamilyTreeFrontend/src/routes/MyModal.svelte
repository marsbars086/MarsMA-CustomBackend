<script>
    const {
      // provided by <Modals />
      isOpen,
      close,

  
      // your props
      position,
      title,
      message
    } = $props()

    let UpdatedFamily = $state (
      {last_name: message.last_name, culture: message.culture}
    );

    const UpdateFamily = async (familyid) => {
      console.log($state.snapshot(UpdatedFamily))
      const res = await fetch(`http://localhost:3000/updatefamilybody/${familyid}`, {
      method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(UpdatedFamily)
    });

    const result = await res.json();
    console.log(result);
    close()
  };

  const deleteFamily = async (lastname) => {
    const res = await fetch(`http://localhost:3000/deleteFamily/${lastname}`, {
      method: 'DELETE',
    });
    close()
    // getFamilies()
  }

  let newPerson = $state(
    {first_name:"", last_name:"",age:0}
  )
  
  let personsFamilyname = $state(message.last_name)

  const addNewPerson = async (familyname) => {
    console.log(familyname)
    console.log($state.snapshot(newPerson))
    const res = await fetch(`http://localhost:3000/createpersonbody/${familyname}`, {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPerson)
    });

    const result = await res.json();
    console.log(result);
    close()

  };
  </script>
  
  {#if isOpen}
    {#if title == "Update Family"}
    <div role="dialog" class="modal" style="top: {position?.top}px; left: {position?.left}px;">
      <div class="contents">
        <div class="actions">
          <button onclick={() => close()}>X</button>
        </div>
        <h2>{title}</h2>
        <label for input>culture</label>
        <input bind:value={UpdatedFamily.last_name}/>
        <label for input>culture</label>
        <input bind:value={UpdatedFamily.culture}/>
        <div class="actions">
          <button onclick={() => UpdateFamily(message._id)}>Submit</button>
        </div>

      </div>
    </div>
    {:else if title == "Create Person"}
    <div role="dialog" class="modal" style="top: {position?.top}px; left: {position?.left}px;">
      <div class="contents">
        <h2>{title}</h2>
        <label for input>First Name</label>
        <input bind:value={newPerson.first_name} placeholder="Hayes"/>
        <label for input>Last Name</label>
        <input bind:value={newPerson.last_name} placeholder="Resser"/>
        <label for input>Family</label>
        <input bind:value={personsFamilyname} placeholder="Resser"/>
        <label for input>Age</label>
        <input type="number" bind:value={newPerson.age}/>

        <button onclick={()=>addNewPerson(personsFamilyname)}>submit</button>

        <div class="actions">
          <button onclick={() => close()}>OK</button>
        </div>
      </div>
    </div>
    {:else if title == "Are you sure you want to delete this family?"}
    <div role="dialog" class="modalfixed">
      <div class="contents">
        <h2>{title}</h2>
        <p>members wont be deleted</p>

        <div class="actions">
          <button onclick={() => close()}>Cancel</button>
          <button onclick={() => deleteFamily(message)}>Delete Family</button>
        </div>
      </div>
    </div>
    {/if}

  {/if}
  
  <style>
    .modal {
      /* position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0; */
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
  
      /* allow click-through to backdrop */
      pointer-events: none;
    }
    .modalfixed {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      pointer-events: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .contents {
      min-width: 240px;
      padding: 16px;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
    }
  
    h2 {
      text-align: center;
      font-size: 24px;
    }
  
    p {
      text-align: center;
      margin-top: 16px;
      border-radius: 6px;
    }
  
    .actions {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
    }
  </style>