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
            Form
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