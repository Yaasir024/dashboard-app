<script setup>
import { ref, computed, onMounted } from "vue";
import Header from '@/components/navigation/Header.vue';

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
            <button class="bg-indigo-600 text-white py-2 px-4 rounded-lg">New Workspace</button>
        </div>
        <div class="mt-20">
            <div class="flex items-center justify-between">
                <div class="search flex items-center bg-white shadow-lg px-2 py-1.5 rounded-3xl max-w-[400px] w-full">
                    <MagnifyingGlassIcon class="pointer-events-none h-5 w-5 text-gray-400 mr-3" aria-hidden="true" />
                    <input type="text" placeholder="Search..." class="px-2 py-1 outline-none text-lg bg-transparent">
                </div>
            </div>
        </div>
        {{ useDashboard.workspaceMetadata }}
        <div class="mt-20 flex flex-wrap">
            <div class="flex-33.33% p-2" v-for="(value, key) in useDashboard.workspaceMetadata" :key="key">
                <div class="bg-white rounded-lg p-2 cursor-pointer">
                    {{ value }} {{ key }}
                </div>
            </div>
        </div>
    </main>
</template>