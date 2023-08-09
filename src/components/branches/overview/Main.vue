<script setup>
import { computed, ref } from 'vue'

import router from "@/router";


import EmptyState from '@/components/branches/overview/EmptyState.vue'
import Icon from '@/components/global/Icons.vue';

import { useWorkspaceStore } from '@/stores/workspace/index'

import { TableCellsIcon } from '@heroicons/vue/24/outline'


import MainSection from '@/template/branches/Main.vue'
import AddBranchModal from '@/components/branches/modals/AddBranch.vue'

const useWorkspace = useWorkspaceStore()

const branches = computed(() => {
    if (useWorkspace.branchesMetadata.data) {
        return useWorkspace.branchesMetadata.data.branches
    } else if (!useWorkspace.branchesMetadata.data && useWorkspace.branchesMetadata.status) {
        return null
    }
})

const viewIcons = {
    'database': TableCellsIcon
}

</script>

<template>
    <section class="">
        <div class="w-full h-8 bg-white sticky top-0">Header</div>
        <div class="px-8 py-10 w-full">
            <div class="flex items-center justify-between">
                <h1 class="text-[34px] font-bold">Branches</h1>
                <button @click="useWorkspace.showBranchModal = !useWorkspace.showBranchModal" class="bg-indigo-600 text-white py-2 px-4 rounded-lg">Add Branch</button>
            </div>
            <div class="mt-4 px-2">
                {{ branches }}
                <div class="" v-if="!useWorkspace.branchesMetadata.data && useWorkspace.branchesMetadata.status">
                    {{ useWorkspace.branchesMetadata }}

                </div>
                <ul class="flex flex-wrap" v-if="branches">
                    <li class="flex-33.33% md:flex-25% p-4" v-for="view in branches" :key="view.uid"
                        @click="useWorkspace.pushToBranch(view.uid)">
                        <div class="flex items-center justify-between p-2 cursor-pointer bg-gray-200 rounded-md">
                            <div class="flex items-center">
                                <div
                                    class="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-indigo-500 mr-2">
                                    <Icon :iconName="view.type" :style="'h-5 w-5 text-white'" />
                                </div>
                                <span class="text-[15px] font-medium">{{ view.name }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="" v-else>
                    <div class="text-center">
                        <h3 class="mt-2 text-sm font-semibold text-gray-900">No branches yet</h3>
                        <p class="mt-1 text-sm text-gray-500">Get started by creating a new branch.</p>
                        <div class="mt-6">
                            <button @click="useWorkspace.showBranchModal = !useWorkspace.showBranchModal"
                                class="bg-indigo-600 text-white py-2 px-4 rounded-lg">Add Branch</button>
                        </div>
                    </div>
                </div>
                <EmptyState v-if="false" />
            </div>
        </div>
        <AddBranchModal />
    </section>
</template>

