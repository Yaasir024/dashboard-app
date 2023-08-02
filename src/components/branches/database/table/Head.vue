<script setup>
import { computed, ref } from 'vue'

import { useDatabaseStore } from '@/stores/workspace/database'

import {
    PencilSquareIcon,
    DocumentIcon,
    LinkIcon,
    EnvelopeIcon,
    HashtagIcon,
    CurrencyEuroIcon,
    PhoneIcon,
    CalendarIcon,
    ClockIcon,
    CogIcon,
} from '@heroicons/vue/24/outline'


const useDatabase = useDatabaseStore()

const fieldIcons = {
    'Text': PencilSquareIcon,
    'Long Text': DocumentIcon,
    'Email': EnvelopeIcon,
    'Number': HashtagIcon,
    'Currency': CurrencyEuroIcon,
    'Phone Number': PhoneIcon,
    'URL': LinkIcon,
    'Date': CalendarIcon,
    'Time': ClockIcon,
    'Created At': ClockIcon,
    'Last Modified At': ClockIcon,
}
</script>



<template>
    <thead>
        <tr class="bg-gray-100 inline-table h-[32px]">
            <th v-for="field in useDatabase.fields.data" :key="field.uid"
                class="group fields min-w-[200px] h-[32px] border-r border-b px-[6px] ">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <component :is="fieldIcons[field.type]" class="h-4 w-4" aria-hidden="true" />
                        <span class="ml-2">{{ field.name }}</span>
                    </div>
                    <button class="opacity-0 hover:group:opacity-1">
                        <CogIcon class="h-4 w-4" />
                    </button>
                </div>
            </th>
            <th class="min-w-[100px] h-[32px] border-r ">
                <button @click="useDatabase.showFieldsModal = !useDatabase.showFieldsModal"
                    class="w-full h-full ">Add</button>
            </th>
        </tr>
    </thead>
</template>