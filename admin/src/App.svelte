<script lang="ts">
  import "./app.css";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import * as api from "./api";
  import type { User, Pmt } from "./store";


  const users = writable<User[]>([]);
  const selectedUser = writable<User | null>(null);
  const payments = writable<{ [key: string]: Pmt[] }>({});


  onMount(async () => {
    const response = await api.get_users();
    users.set(response.users);
  });


  async function handleUserSelect(user: User) {
    if ($selectedUser && $selectedUser.root === user.root) {

      selectedUser.set(null);
    } else {

      selectedUser.set(user);

      const paymentsResponse = await api.get_payments(user.ok_key);

      payments.update(p => ({ ...p, [user.root]: paymentsResponse }));
    }
  }


  $: currentUser = $selectedUser;
  $: currentPayments = $selectedUser ? $payments[$selectedUser.root] || [] : [];


  $: filteredPayments = currentPayments.filter(payment => payment.msg_idx !== undefined && payment.msg_idx !== null);


  $: groupedUsers = groupByMessageCount($users);

  function groupByMessageCount(users: User[]): { [key: number]: User[] } {

    return users.reduce((acc, user) => {

      const key = user.msg_count;

      if (!acc[key]) {

        acc[key] = [];

      }
      acc[key].push(user);

      return acc;

    }, {} as { [key: number]: User[] });
  }
</script>

<main>
  <h1>Admin</h1>

  <section class="table-container">
    <h2>Table of Users and Payments</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Root</th>
          <th>OK Key</th>
          <th>Message Count</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.keys(groupedUsers) as count (count)}
          {#each groupedUsers[count] as user}
            <tr on:click={() => handleUserSelect(user)} class:active={$selectedUser && $selectedUser.root === user.root}>
              <td>{user.root}</td>
              <td>{user.ok_key}</td>
              <td>{user.msg_count}</td>
            </tr>
            {#if $selectedUser && $selectedUser.root === user.root}
              {#if filteredPayments.length > 0}
                <tr class="dropdown-row">
                  <td colspan="4">
                    <table class="table nested-table">
                      <thead>
                        <tr>
                          <th>SCID</th>
                          <th>Amount (MSAT)</th>
                          <th>RHash</th>
                          <th>Timestamp</th>
                          <th>Remote</th>
                          <th>Message Index</th>
                          <th>Error</th>
                        </tr>
                      </thead>
                      <tbody>
                        {#each filteredPayments as payment}
                          <tr>
                            <td>{payment.scid}</td>
                            <td>{payment.amt_msat}</td>
                            <td>{payment.rhash}</td>
                            <td>{new Date(payment.ts).toLocaleString()}</td>
                            <td>{payment.remote ? 'Yes' : 'No'}</td>
                            <td>{payment.msg_idx !== undefined ? payment.msg_idx : '-'}</td>
                            <td>{payment.error || '-'}</td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </td>
                </tr>
              {/if}
            {/if}
          {/each}
        {/each}
      </tbody>
    </table>
  </section>
</main>
