<template>
  <section class="card" v-if="contact">
    <header class="card-header">
      <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
      <div class="card-actions">
        <RouterLink :to="`/contacts/${contact.id}/edit`" class="btn btn-secondary">
          Edit
        </RouterLink>
        <button class="btn btn-danger" @click="handleDelete">
          Delete
        </button>
      </div>
    </header>

    <div class="card-body">
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <p v-if="contact.phone"><strong>Phone:</strong> {{ contact.phone }}</p>
      <p v-if="contact.company"><strong>Company:</strong> {{ contact.company }}</p>
      <p v-if="contact.notes"><strong>Notes:</strong> {{ contact.notes }}</p>
    </div>
  </section>

  <section v-else class="card">
    <p>Contact not found.</p>
    <RouterLink to="/" class="btn btn-secondary">Back to list</RouterLink>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useContacts } from '../composables/useContacts';

const route = useRoute();
const router = useRouter();
const { getContactById, deleteContact } = useContacts();

const contact = computed(() => getContactById(route.params.id));

function handleDelete() {
  if (confirm('Delete this contact?')) {
    deleteContact(route.params.id);
    router.push('/');
  }
}
</script>
