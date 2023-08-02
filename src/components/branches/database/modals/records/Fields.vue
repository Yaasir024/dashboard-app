<script setup>
import { useDatabaseStore } from '@/stores/workspace/database'

const useDatabase = useDatabaseStore()

const props = defineProps(['type', 'uid'])
</script>


<template>
    <input v-model="useDatabase.recordData[uid]" v-if="type == 'Text'" type="text"
        class="w-full border-2 outline-indigo-500 p-2 rounded-lg">
    <textarea v-model="useDatabase.recordData[uid]" v-if="type == 'Long Text'"
        class="w-full border-2 outline-indigo-500 p-2 rounded-lg"></textarea>
    <input v-model="useDatabase.recordData[uid]" v-if="type == 'Email'" type="email"
        class="w-full border-2 outline-indigo-500 p-2 rounded-lg">
    <input v-model="useDatabase.recordData[uid]" v-if="type == 'Number'" type="number"
        class="w-full border-2 outline-indigo-500 p-2 rounded-lg">
    <input v-model="useDatabase.recordData[uid]" v-if="type == 'Date'" type="date"
        class="w-full border-2 outline-indigo-500 p-2 rounded-lg">
    <input v-model="useDatabase.recordData[uid]" v-if="type == 'Currency'" type="text"
        class="w-full border-2 outline-indigo-500 p-2 rounded-lg">
</template>