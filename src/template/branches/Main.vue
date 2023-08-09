<script setup>
import { computed } from 'vue'

import { useRoute } from "vue-router";

import Icon from '@/components/global/Icons.vue';



import { BellIcon, Bars3Icon } from '@heroicons/vue/20/solid'
import { TableCellsIcon } from '@heroicons/vue/24/outline'

import { useWorkspaceStore } from '@/stores/workspace/index'

const route = useRoute();

const useWorkspace = useWorkspaceStore()

const viewIcons = {
    'database': TableCellsIcon
}

const branches = computed(() => {
    if (useWorkspace.branchesMetadata.data) {
        return useWorkspace.branchesMetadata.data.branches
    }else if (!useWorkspace.branchesMetadata.data && useWorkspace.branchesMetadata.status) {
        return null
    }
})


</script>


<template>
    <div class="h-screen overflow-hidden w-full flex flex-col">
        <div class="">
            <header class=" flex items-center justify-between py-3 px-8 bg-[#166ee1]">
                <div class="flex items-center">
                    <slot name="branch-name"></slot>
                </div>
                <div class="flex items-center">
                    <div class="relative mr-3">
                        <button
                            class="text-white h-[30px] w-[30px] rounded-full bg-indigo-200 border flex items-center justify-center">
                            <BellIcon class="h-[20px] w-[20px]" />
                        </button>
                    </div>
                    <div class="relative">
                        <button
                            class="text-white h-[30px] w-[30px] rounded-full bg-purple-500 border flex items-center justify-center">
                            Y
                        </button>
                    </div>
                </div>
            </header>
            <div class="w-full py-2 px-9 flex items-center bg-white border-b">
                <div class="flex items-center">
                    <button class="p-2 bg-gray-300">
                        <Bars3Icon class="h-4 w-4" />
                    </button>
                </div>
                <div class="flex-1 items-center">
                    <slot name="menu-bar"></slot>
                </div>
            </div>
        </div>
        <div class="h-full overflow-hidden flex bg-white">
            <div class="w-[300px] shrink-0 h-full flex flex-col justify-between p-2 border-r-2">
                <div class="">
                    <ul class="flex flex-col" v-if="branches">
                        <li :class="route.params.branch == view.uid ? 'bg-gray-200' : ''"
                            class="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                            v-for="view in branches" :key="view.uid" @click="useWorkspace.pushToBranch(view.uid)">
                            <div class="flex items-center">
                                <div
                                    class="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-indigo-500 mr-2">
                                    <Icon :iconName="view.type" :style="'h-5 w-5 text-white'" />
                                </div>
                                <span class="text-[15px] font-medium">{{ view.name }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex w-full">
                <slot name="main"></slot>
            </div>
        </div>
    </div>
</template>