import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useRoute } from 'vue-router';

export const useSystemStore = defineStore('system', () => {
  const route = useRoute();
  

  return { route }
})
