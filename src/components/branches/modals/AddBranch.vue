<script setup>
import { computed, ref, watch } from 'vue'

import Icon from '@/components/global/Icons.vue';

import { useWorkspaceStore } from '@/stores/workspace/index'
// import { useDatabaseStore } from '@/stores/workspace/database'
import { useDashboardStore } from '@/stores/dashboard'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/vue'


// const useDatabase = useDatabaseStore()
const useDashboard = useDashboardStore()
const useWorkspace = useWorkspaceStore()


const branchTypes = ["database", "form"]

watch(useWorkspace.branchData, (newValue) => {
    const slugifiedString = newValue.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

    useWorkspace.branchData.uid = slugifiedString;
});


const requireDatabase = computed(() => {
    let requirements = ["form", "kanban"]

    if (requirements.includes(useWorkspace.branchData.type)) {
        return true
    }
    return false
})

const filteredDatabases = computed(() => {
    return useWorkspace.branchesMetadata.data.branches.filter(branch => branch.type === 'database');
})



const cancelCreateWorkspace = () => {
    useWorkspace.showBranchModal = false
}

const addBranch = () => {
    useWorkspace.addBranch()
}
</script>


<template>
    <TransitionRoot :show="useWorkspace.showBranchModal" as="template" @after-leave="query = ''" appear>
        <Dialog as="div" class="relative z-10" @close="cancelCreateWorkspace()">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95">
                    <DialogPanel
                        class="mx-auto max-w-[450px] transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                        <!-- {{ useWorkspace.branchesMetadata }} -->
                        <div class="px-4 py-3 text-lg">
                            New Branch
                        </div>
                        <!-- {{ requireDatabase }} -->
                        <div class="px-2 py-4 ">
                            <input type="text" placeholder="Branch Name" v-model="useWorkspace.branchData.name"
                                class="w-full border outline-none px-2 h-10 rounded-lg">
                            <input type="text" readonly placeholder="Slug" v-model="useWorkspace.branchData.uid"
                                class="mt-2 cursor-default text-gray-400 w-full border outline-none px-2 h-10 rounded-lg">
                        </div>
                        <Combobox>
                            <div class="px-2 py-5">
                                <Listbox as="div" v-model="useWorkspace.branchData.type">
                                    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Choose a
                                        branch type</ListboxLabel>
                                    <div class="relative mt-2">
                                        <ListboxButton
                                            class="relative flex items-center w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <Icon :iconName="useWorkspace.branchData.type" :style="'h-5 w-5'"
                                                v-if="useWorkspace.branchData.type" />
                                            <span class="block truncate capitalize ml-2">{{ useWorkspace.branchData.type ||
                                                'Choose...'
                                            }}</span>
                                            <span
                                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <transition leave-active-class="transition ease-in duration-100"
                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                            <ListboxOptions
                                                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption as="template" v-for="branch in branchTypes" :key="branch"
                                                    :value="branch" v-slot="{ active }">
                                                    <li
                                                        :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9 flex items-center']">
                                                        <Icon :iconName="branch" :style="'h-5 w-5'" />
                                                        <span
                                                            :class="[useWorkspace.branchData.type == branch ? 'font-semibold' : 'font-normal', 'block truncate capitalize ml-2']">{{
                                                                branch }}</span>

                                                        <span v-if="useWorkspace.branchData.type == branch"
                                                            :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4 ml-2']">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                                <div class="pt-2 pb-5" v-if="requireDatabase">
                                    <Listbox as="div" v-model="useWorkspace.branchData.linkedDb">
                                        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Choose a
                                            Database</ListboxLabel>
                                        <div class="relative mt-2">
                                            <ListboxButton
                                                class="relative flex items-center w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <span class="block truncate capitalize ml-2">{{ useWorkspace.branchData.linkedDb
                                                    ||
                                                    'Choose...'
                                                }}</span>
                                                <span
                                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </ListboxButton>

                                            <transition leave-active-class="transition ease-in duration-100"
                                                leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                <ListboxOptions
                                                    class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    <ListboxOption as="template" v-for="database in filteredDatabases" :key="database"
                                                        :value="database.name" v-slot="{ active }">
                                                        <li
                                                            :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9 flex items-center']">
                                                            <span
                                                                :class="[useWorkspace.branchData.linkedDb == database.name ? 'font-semibold' : 'font-normal', 'block truncate capitalize ml-2']">{{
                                                                    database.name }}</span>

                                                            <span v-if="useWorkspace.branchData.linkedDb == database.name"
                                                                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4 ml-2']">
                                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        </li>
                                                    </ListboxOption>
                                                </ListboxOptions>
                                            </transition>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>

                        </Combobox>
                        <div class="px-5 py-4 flex items-center justify-end">
                            <div class="flex items-center">
                                <button @click="useWorkspace.showBranchModal = false"
                                    class="mr-3 text-red-600">Cancel</button>
                                <button @click="addBranch()" class="bg-indigo-600 text-white py-2 px-4 rounded-lg">Add
                                    Workspace</button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  



