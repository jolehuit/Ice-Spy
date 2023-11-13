<script lang="ts">
  /** @type {import('./$types').PageData} */

import { fade } from 'svelte/transition';
import { quintInOut } from "svelte/easing";


  let token1input:string="0x21E6bc780bFcd36D36444F68e4962c7cEB255229";
  let token1:string=token1input;
  let token2input:string="0xCCD3891c1452b7CB0E4632774B9365DC4eE24f20";
  let token2:string=token2input;
  let startBlock1input:string="69141817";
  let startBlock1:string=startBlock1input;
  let endBlock1input:string="69152228";
  let endBlock1:string=endBlock1input;
  let startBlock2input:string="67809815";
  let startBlock2:string=startBlock2input;
  let endBlock2input:string ="67865385";
  let endBlock2:string=endBlock2input;
  let walletsSearch:boolean=false;

  let loading=false;
  let walletsFound:Array<string>=[];
  let wallets:Array<string>=[];
  let blockchain:string;

async function getWallets() {
  walletsSearch=true;
  loading=true;
  const response = await fetch('/wallets', {
    method: 'POST',
    body: JSON.stringify({token1, token2, startBlock1, endBlock1, startBlock2, endBlock2, blockchain}),
    headers: {
      'content-type': 'application/json',
    },
  });
  if (response.ok) {
    walletsFound = await response.json();
    wallets = walletsFound.walletsFound;
    console.log(wallets);
    loading=false;
  } else {
    throw new Error('Something went wrong');
  }

}
</script>


<div transition:fade={{ delay: 250, duration: 200, ease:quintInOut() }} class="flex-col justify-center align-center">
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Homepage</a></li>
        <li><a>Dashboard</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost text-xl">Ice Spy</a>
  </div>
  <div class="navbar-end">
    <button transition:fade={{ delay: 250, duration: 200, ease:quintInOut() }} class="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <button class="btn btn-ghost btn-circle">
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span class="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>


 <div class="flex justify-center items-center mt-10">
<input bind:value={token1input} type="text" placeholder="Token 1" class="flex  input input-bordered input-primary w-full max-w-xs " />
<input bind:value={token2input} type="text" placeholder="Token 2" class="input input-bordered input-accent w-full max-w-xs ml-5" />
 </div>
  <div class="flex justify-center items-center mt-5 ">
<input bind:value={startBlock1input} type="text" placeholder="Start block 1" class="flex  input input-bordered input-primary w-full max-w-xs " />
<input bind:value={startBlock2input} type="text" placeholder="Start block 2" class="input input-bordered input-accent w-full max-w-xs ml-5" />
 </div>
  <div class="flex justify-center items-center mt-5 ">
    <input bind:value={endBlock1input} type="text" placeholder="End block 1" class="flex  input input-bordered input-primary w-full max-w-xs " />
    <input bind:value={endBlock2input} type="text" placeholder="End block 2" class="input input-bordered input-accent w-full max-w-xs ml-5" />
  </div>

  <div class="flex justify-center items-center mt-10 ">
    <button on:click={() => {getWallets();blockchain="Ethereum"; console.log(blockchain)}} class="btn">Ethereum</button>
    <button  on:click={() => {getWallets();blockchain="Arbitrum";console.log(blockchain)}} class="btn ml-2">Arbitrum</button>
  </div>
  {#if loading}
    <div class="flex justify-center items-center mt-10 ">
      <span class="loading loading-spinner text-info"></span>
    </div>
  {/if}
 </div>
{#if walletsSearch && !loading}
  {#if wallets.length>0}
    <div transition:fade={{ delay: 250, duration: 200, ease:quintInOut() }} class="overflow-x-auto flex justify-center w-full">
      <table class="table w-1/4">
        <!-- head -->
        <thead>
        <tr>
          <th></th>
          <th>Addresses</th>
        </tr>
        </thead>
        <tbody>
        <!-- row 1 -->


        {#each wallets as wallet, index}

          <tr>
            <th>{index}</th>
            <td>{wallet}</td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>

    <div>
    </div>

  {:else}
    <div class="flex justify-center items-center">
      <span class="mt-5">Aucun wallet trouvé</span>
    </div>
  {/if}
{/if}
