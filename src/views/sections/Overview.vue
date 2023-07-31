<script setup>
import { computed, ref } from 'vue'

import { useWorkspaceStore } from '@/stores/workspace/index'

import { TableCellsIcon } from '@heroicons/vue/24/outline'


import MainSection from '@/template/branches/Main.vue'

const useWorkspace = useWorkspaceStore()

const branches = computed(() => {
    if (useWorkspace.branchesMetadata.data) {
        return useWorkspace.branchesMetadata.data.branches
    }
})

const viewIcons = {
    'database' : TableCellsIcon
}

</script>

<template>
    <MainSection>
        <template #menu-bar>
            <div class="flex items-center">
                <button class="bg-indigo-600 text-white py-1.5 px-4 rounded-lg">New Record</button>
            </div>
        </template>
        <template #main>
            <div class="px-8 py-10 w-full">
                <div class="flex items-center justify-between">
                    <h1 class="text-[34px] font-bold">Branches</h1>
                    <button class="bg-indigo-600 text-white py-2 px-4 rounded-lg">New Branch</button>
                </div>
                <div class="mt-4 px-2">
                    <ul class="flex" v-if="branches">
                        <li class="flex-33.33% flex items-center justify-between p-2 cursor-pointer bg-gray-200 rounded-md"
                            v-for="view in branches" :key="view.id">
                            <div class="flex items-center">
                                <div class="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-indigo-500 mr-2">
                                    <component :is="viewIcons[view.type]" class="h-5 w-5 text-white" aria-hidden="true" />
                                </div>
                                <span class="text-[15px] font-medium">{{ view.name }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                {{ branches }}
            </div>
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