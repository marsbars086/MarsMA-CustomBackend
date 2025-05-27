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

    function UpdateFamily(){
      console.log($state.snapshot(UpdatedFamily))
    }
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
          <button onclick={() => UpdateFamily()}>Submit</button>
        </div>

      </div>
    </div>
    {:else}
    <div role="dialog" class="modal" style="top: {position?.top}px; left: {position?.left}px;">
      <div class="contents">
        <h2>{title}</h2>
        <p>{message}</p>
        <p>hi this was randoms</p>
        <div class="actions">
          <button onclick={() => close()}>OK</button>
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