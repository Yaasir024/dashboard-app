<script setup>
import { computed, ref } from 'vue'

import { useDatabaseStore } from '@/stores/workspace/database'
import { useWorkspaceStore } from '@/stores/workspace/index'


import MainSection from '@/template/branches/Main.vue'
import FieldsModal from '@/components/branches/database/modals/fields/Main.vue'
import RecordModal from '@/components/branches/database/modals/records/Main.vue'
import TableHead from '@/components/branches/database/table/Head.vue'
import TableBody from '@/components/branches/database/table/Body.vue'

import { ArrowsPointingOutIcon } from '@heroicons/vue/20/solid'

const useDatabase = useDatabaseStore()
const useWorkspace = useWorkspaceStore()

const addIndex = (i) => {
    return i + 1
}

</script>

<template>
    {{ useDatabase.fields.data }}
    <MainSection>
        <template #branch-name>
            <h2 class="text-white text-[18px] font-bold">
                Workspace
            </h2>
        </template>
        <template #menu-bar>
            <div class="flex items-center">
                <button @click="useDatabase.openNewRecord()" class="bg-indigo-600 text-white py-1.5 px-4 rounded-lg">New
                    Record</button>
            </div>
        </template>
        <template #main>
            <div class="w-[calc(100vw-300px)] overflow-y-auto pr-40 flex">
                <div class="sticky  left-0 flex flex-col bg-white">
                    <div class="bg-gray-100 h-[32px] border-b border-r flex items-center gap-x-2">
                        <div class="h-[32px] w-[35px] flex items-center justify-center">

                        </div>
                        <div class="h-[32px] w-[30px] flex items-center justify-center">

                        </div>
                    </div>
                    <div v-for="(record, index) in useDatabase.records.data" :key="record.uid" class="h-[32px] border-b border-r flex items-center gap-x-2">
                        <div class="h-[32px] w-[35px] flex items-center justify-center">
                            {{ addIndex(index) }}
                        </div>
                        <div class="h-[32px] w-[30px] flex items-center justify-center">
                            <button @click="useDatabase.openExistingRecord(record)" class="flex items-center justify-center">
                                <ArrowsPointingOutIcon class="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>

                <table class="database-table">
                    <TableHead />
                    <TableBody />
                </table>
            </div>
            <FieldsModal />
            <RecordModal />
        </template>
    </MainSection>
</template>

<style scoped>
.database-table {
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 14px;
}

.database-table thead tr {
    text-align: left;
}

.database-table tr {
    height: 32px;
}

.database-table .fields {
    width: 200px;
    flex-shrink: 0;
}
</style>