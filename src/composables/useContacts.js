import { ref, computed } from 'vue';

const STORAGE_KEY = 'contact-book-contacts';

function loadContacts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

const contacts = ref(loadContacts());

const sortedContacts = computed(() =>
  [...contacts.value].sort((a, b) => {
    const lastA = a.lastName?.toLowerCase() || '';
    const lastB = b.lastName?.toLowerCase() || '';
    if (lastA < lastB) return -1;
    if (lastA > lastB) return 1;
    return 0;
  })
);

function addContact(contact) {
  const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
  const newContact = { id, ...contact };
  contacts.value.push(newContact);
  saveContacts(contacts.value);
  return newContact;
}

function updateContact(id, updated) {
  const index = contacts.value.findIndex(c => c.id === id);
  if (index !== -1) {
    contacts.value[index] = { ...contacts.value[index], ...updated };
    saveContacts(contacts.value);
    return contacts.value[index];
  }
  return null;
}

function deleteContact(id) {
  contacts.value = contacts.value.filter(c => c.id !== id);
  saveContacts(contacts.value);
}

function getContactById(id) {
  return contacts.value.find(c => c.id === id) || null;
}

export function useContacts() {
  return {
    contacts: sortedContacts,
    addContact,
    updateContact,
    deleteContact,
    getContactById,
  };
}
