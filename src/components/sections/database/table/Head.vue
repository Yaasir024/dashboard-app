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
        <tr class="bg-gray-100">
            <th class="h-[32px] border-b border-r flex items-center gap-x-2">
                <div class="h-[32px] w-[35px] flex items-center justify-center">

                </div>
                <div class="h-[32px] w-[30px] flex items-center justify-center">

                </div>
            </th>
            <th v-for="field in useDatabase.fields.data" :key="field.uid"
                class="fields min-w-[200px] border-r border-b px-[6px] ">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <component :is="fieldIcons[field.type]" class="h-4 w-4" aria-hidden="true" />
                        <span class="ml-2">{{ field.name }}</span>
                    </div>

                </div>
            </th>
            <th class="min-w-[100px] border-r ">
                <button @click="useDatabase.showFieldsModal = !useDatabase.showFieldsModal"
                    class="w-full h-full bg-blue-400">Add</button>
            </th>
        </tr>
    </thead>
</template>