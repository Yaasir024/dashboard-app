<script setup>
import { computed, ref } from 'vue'

import { useDatabaseStore } from '@/stores/workspace/database'

import FieldSetting from '@/components/branches/database/modals/fields/Setting.vue'

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
    Cog8ToothIcon,
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

const openSettings = (field) => {
    console.log(field)
    useDatabase.selectedField = field
    useDatabase.showFieldSettingModal = true
}
</script>



<template>
    <thead>
        <tr class="bg-gray-100 inline-table h-[32px]">
            <th v-for="field in useDatabase.fields.data" :key="field.uid"
                class="group fields min-w-[200px] h-[32px] border-r border-b px-[6px] ">
                <div class="field flex items-center justify-between">
                    <div class="flex items-center">
                        <component :is="fieldIcons[field.type]" class="h-4 w-4" aria-hidden="true" />
                        <span class="ml-2">{{ field.name }}</span>
                    </div>
                    <button @click="openSettings(field)" class="settings-btn">
                        <Cog8ToothIcon class="h-4 w-4" />
                    </button>
                </div>
            </th>
            <th class="min-w-[100px] h-[32px] border-r ">
                <button @click="useDatabase.showFieldsModal = !useDatabase.showFieldsModal"
                    class="w-full h-full ">Add</button>
            </th>
        </tr>
    </thead>
    <FieldSetting />
</template>

<style scoped>
.settings-btn {
    opacity: 0;
    transition: all .3s ease;
}
.field:hover .settings-btn {
    opacity: 1;
}
</style>