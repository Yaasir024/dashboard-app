<script setup>
import { computed, ref } from 'vue'

import { useDatabaseStore } from '@/stores/workspace/database'


import MainSection from '@/template/sections/Main.vue'
import FieldsModal from '@/components/branches/database/FieldsModal.vue'
import RecordModal from '@/components/branches/database/modals/records/Main.vue'
import TableHead from '@/components/branches/database/table/Head.vue'
import TableBody from '@/components/branches/database/table/Body.vue'

const useDatabase = useDatabaseStore()

</script>

<template>
    <MainSection>
        <template #menu-bar>
            <div class="flex items-center">
                <button @click="useDatabase.openNewRecord()" class="bg-indigo-600 text-white py-1.5 px-4 rounded-lg">New
                    Record</button>
            </div>
        </template>
        <template #main>
            <div class="w-[calc(100vw-300px)] overflow-y-auto pr-40">
                <table class="database-table">
                    <TableHead />
                    <TableBody />
                </table>
                {{ useDatabase.records.data }}
                <div class="mt-[500px]">

                    {{ useDatabase.fields.data }}
                </div>
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