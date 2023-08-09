<script setup>
import { ref, computed, onMounted } from "vue";
import Header from '@/components/navigation/Header.vue';
import Icon from '@/components/global/Icons.vue';
import AddModal from '@/components/dashboard/AddModal.vue';

import { useDashboardStore } from '@/stores/dashboard'

import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const useDashboard = useDashboardStore()

onMounted(() => {
    useDashboard.getWorkspaceData()
})

</script>

<template>
    <Header />
    <main class="px-8 py-10">
        <div class="flex items-center justify-between">
            <h1 class="text-[34px] font-bold">Workspaces</h1>
            <button @click="useDashboard.showDashboard = true" class="bg-indigo-600 text-white py-2 px-4 rounded-lg">New Workspace</button>
        </div>
        <div class="mt-20" v-if="false">
            <div class="flex items-center justify-between">
                <div class="search flex items-center bg-white shadow-lg px-2 py-1.5 rounded-3xl max-w-[400px] w-full">
                    <MagnifyingGlassIcon class="pointer-events-none h-5 w-5 text-gray-400 mr-3" aria-hidden="true" />
                    <input type="text" placeholder="Search..." class="px-2 py-1 outline-none text-lg bg-transparent">
                </div>
            </div>
        </div>
        {{ useDashboard.workspaceMetadata }}
        <div class="mt-20 flex flex-wrap">
            <div class="flex-33.33% p-3" v-for="data in useDashboard.workspaceMetadata" :key="data.uid">
                <div @click="useDashboard.pushToWorkspace(data.uid)" class="bg-white rounded-lg shadow-md hover:shadow-lg p-4 cursor-pointer flex items-center">
                    <div class="mr-3">
                        <Icon :iconName="data.icon" :style="'h-8 w-8'" />
                    </div>
                    <div class="flex flex-col">
                        <h2 class="text-xl font-bold">{{ data.name }}</h2>
                        <h2 class="text-base capitalize">{{ data.type }} Workspace</h2>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <AddModal />
</template>