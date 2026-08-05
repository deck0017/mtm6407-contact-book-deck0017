// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ContactListView from '../views/ContactListView.vue';
import ContactDetailView from '../views/ContactDetailView.vue';
import ContactFormView from '../views/ContactFormView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ContactListView,
  },
  {
    path: '/contacts/new',
    name: 'contact-new',
    component: ContactFormView,
  },
  {
    path: '/contacts/:id',
    name: 'contact-detail',
    component: ContactDetailView,
    props: true,
  },
  {
    path: '/contacts/:id/edit',
    name: 'contact-edit',
    component: ContactFormView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
