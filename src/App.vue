<template>
  <div class="app">
    <header class="app-header">
      <h1>Contact Book</h1>
      <nav>
        <RouterLink to="/">All Contacts</RouterLink>
        <RouterLink to="/contacts/new">Add Contact</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>
