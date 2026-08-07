<template>
  <section class="card">
    <header class="card-header">
      <h2>{{ isEdit ? 'Edit Contact' : 'New Contact' }}</h2>
    </header>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model="form.firstName" required />
      </div>

      <div class="form-row">
        <label for="lastName">Last Name</label>
        <input id="lastName" v-model="form.lastName" required />
      </div>

      <div class="form-row">
        <label for="email">Email Address</label>
        <input id="email" type="email" v-model="form.email" required />
      </div>

      <div class="form-row">
        <label for="phone">Phone Number</label>
        <input id="phone" v-model="form.phone" />
      </div>

      <div class="form-row">
        <label for="company">Company</label>
        <input id="company" v-model="form.company" />
      </div>

      <div class="form-row">
        <label for="notes">Notes</label>
        <textarea id="notes" v-model="form.notes"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? 'Save Changes' : 'Create Contact' }}
        </button>
        <RouterLink
          :to="isEdit ? `/contacts/${route.params.id}` : '/'"
          class="btn btn-secondary"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useContacts } from '../composables/useContacts';

const route = useRoute();
const router = useRouter();
const { addContact, updateContact, getContactById } = useContacts();

const isEdit = computed(() => !!route.params.id);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  notes: '',
});

onMounted(() => {
  if (isEdit.value) {
    const existing = getContactById(route.params.id);
    if (existing) {
      Object.assign(form, existing);
    }
  }
});

function handleSubmit() {
  if (isEdit.value) {
    const updated = updateContact(route.params.id, form);
    if (updated) {
      router.push(`/contacts/${updated.id}`);
    }
  } else {
    const created = addContact(form);
    router.push(`/contacts/${created.id}`);
  }
}
</script>
