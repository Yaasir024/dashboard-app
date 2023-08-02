<script setup>
import { computed, ref } from 'vue'

import { useRoute } from "vue-router";


import { useWorkspaceStore } from '@/stores/workspace/index'


import Overview from '@/components/branches/Overview.vue'
import Database from '@/components/branches/database/Main.vue'
import Error404 from '@/components/global/404.vue'

const route = useRoute();

const useWorkspace = useWorkspaceStore()


const branches = computed(() => {
    if (useWorkspace.branchesMetadata.data) {
        return useWorkspace.branchesMetadata.data.branches
    }
})
const branchType = computed(() => {
    if (useWorkspace.branchesMetadata.data) {
        if (route.params.branch == 'overview') {
            return "overview"
        }else {
            const foundObject = useWorkspace.branchesMetadata.data.branches.find((item) => item.uid === route.params.branch);
            return foundObject ? foundObject.type : "error";
        }
    }
})

</script>

<template>
    <Overview v-if="branchType == 'overview'" />
    <Database v-if="branchType == 'database'" />
    <Error404 text="Sorry, we couldn’t find the branch you’re looking for." buttonText="Back to Dashboard" buttonLink="/"
        v-if="branchType == 'error'" />
</template>


