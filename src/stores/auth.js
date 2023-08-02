import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useRoute } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const route = useRoute();

  const userId = {
    uid: 'oZ7B7t7lX4OLk2psA0BievhJ7O43'
  }
  

  return { route, userId }
})
