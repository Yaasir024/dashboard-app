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
        <tr class="" v-for="(record, index) in useDatabase.records.data" :key="record.uid">
            <td class="h-[32px] border-b border-r flex items-center gap-x-2">
                <div class="h-[32px] w-[35px] flex items-center justify-center">
                    {{ addIndex(index) }}
                </div>
                <div class="h-[32px] w-[30px] flex items-center justify-center">
                    e
                </div>
            </td>
            <td class="h-[32px] w-[200px] min-w-[200px] fields border-r border-b px-[6px] truncate" v-for="field in filteredRecords" :key="field.uid">
                {{ record[field.uid] }}    
            </td>
            <td class="h-[32px] w-[200px] p-[6px]"></td>
        </tr>
    </tbody>
</template>

