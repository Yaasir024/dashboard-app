<script setup>
import { computed, ref } from 'vue'

import { useRoute } from "vue-router";


import { useWorkspaceStore } from '@/stores/workspace/index'
import { useDatabaseStore } from '@/stores/workspace/database'


import Database from '@/components/sections/database/Main.vue'
import Error404 from '@/components/global/404.vue'

const route = useRoute();

const useWorkspace = useWorkspaceStore()
const useDatabase = useDatabaseStore()


const branches = computed(() => {
    if (useWorkspace.branchesMetadata.data) {
        return useWorkspace.branchesMetadata.data.branches
    }
})
const branchType = computed(() => {
    if (useWorkspace.branchesMetadata.data) {
        const foundObject = useWorkspace.branchesMetadata.data.branches.find((item) => item.uid === route.params.branch);
        return foundObject ? foundObject.type : "error";
    }
})

</script>

<template>
    <Database v-if="branchType == 'database'" />
    <Error404 text="Sorry, we couldn’t find the branch you’re looking for." buttonText="Back to Dashboard" buttonLink="/" v-if="branchType == 'error'" />
</template>


