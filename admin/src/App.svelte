<script lang="ts">
  import "./app.css";
  import { onMount } from "svelte";
  import * as api from "./api";
  import { users } from "./store";

  onMount(() => {
    api.get_users();
  });

  $: console.log($users);
</script>

<main>admin</main>
