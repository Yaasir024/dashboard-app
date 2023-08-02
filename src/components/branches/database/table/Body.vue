<script setup>
import { computed, ref } from 'vue'

import { useDatabaseStore } from '@/stores/workspace/database'

import {
    PencilSquareIcon,
} from '@heroicons/vue/24/outline'


const useDatabase = useDatabaseStore()

const addIndex = (i) => {
    return i + 1
}

const filteredRecords = computed(() => {
    return useDatabase.fields.data
})

</script>



<template>
    <tbody>
        <tr class="h-[32px] inline-table" v-for="record in useDatabase.records.data" :key="record.uid">
            <td class="h-[32px] w-[200px] min-w-[200px] fields border-r border-b px-[6px] overflow-hidden" v-for="field in filteredRecords" :key="field.uid">
                <span class="w-[180px] inline-block truncate">
                    {{ record[field.uid] }}    
                </span>
            </td>
            <td class="h-[32px] w-[200px] p-[6px]"></td>
        </tr>
    </tbody>
</template>

