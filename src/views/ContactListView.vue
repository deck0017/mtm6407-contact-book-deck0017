<template>
  <section class="card">
    <header class="card-header">
      <h2>All Contacts</h2>
      <input
        v-model="query"
        type="search"
        placeholder="Search by first or last name"
        class="search-input"
      />
    </header>

    <ul class="contact-list">
      <li
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="contact-item"
      >
        <RouterLink :to="`/contacts/${contact.id}`">
          <span class="contact-name">
            {{ contact.firstName }} {{ contact.lastName }}
          </span>
          <span class="contact-email">{{ contact.email }}</span>
        </RouterLink>
      </li>

      <li v-if="filteredContacts.length === 0" class="empty-state">
        No contacts found. Try adding one.
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useContacts } from '../composables/useContacts';

const { contacts } = useContacts();
const query = ref('');

const filteredContacts = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return contacts.value;
  return contacts.value.filter(contact => {
    const first = contact.firstName?.toLowerCase() || '';
    const last = contact.lastName?.toLowerCase() || '';
    return first.includes(q) || last.includes(q);
  });
});
</script>
