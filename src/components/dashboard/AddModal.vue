<script setup>
import { computed, ref } from 'vue'

import Icon from '@/components/global/Icons.vue';

// import { useDatabaseStore } from '@/stores/workspace/database'
import { useDashboardStore } from '@/stores/dashboard'

import { MagnifyingGlassIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
    PencilSquareIcon,
    DocumentIcon,
    LinkIcon,
    EnvelopeIcon,
    HashtagIcon,
    CurrencyEuroIcon,
    PhoneIcon,
    CalendarIcon,
    ClockIcon,
    ExclamationCircleIcon,
    XCircleIcon
} from '@heroicons/vue/24/outline'
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

const items = [
    {
        id: 1,
        name: 'Text',
        description: 'Add a single line short text.',
        color: 'bg-indigo-500',
        icon: PencilSquareIcon,
    },
    {
        id: 1,
        name: 'Long Text',
        description: 'Add a multi-line long text.',
        color: 'bg-indigo-500',
        icon: DocumentIcon,
    },
    {
        id: 1,
        name: 'Email',
        description: 'Add an email address.',
        color: 'bg-indigo-500',
        icon: EnvelopeIcon,
    },
    {
        id: 1,
        name: 'Number',
        description: 'Add a number.',
        color: 'bg-indigo-500',
        icon: HashtagIcon,
    },
    {
        id: 1,
        name: 'Currency',
        description: 'Add currency.',
        color: 'bg-indigo-500',
        icon: CurrencyEuroIcon,
    },
    {
        id: 1,
        name: 'Phone Number',
        description: 'Add a phone number.',
        color: 'bg-indigo-500',
        icon: PhoneIcon,
    },
    // {
    //     id: 1,
    //     name: 'URL',
    //     description: 'Add a link or url.',
    //     color: 'bg-indigo-500',
    //     icon: LinkIcon,
    // },
    {
        id: 1,
        name: 'Date',
        description: 'Add a date.',
        color: 'bg-indigo-500',
        icon: CalendarIcon,
    },
    // {
    //     id: 1,
    //     name: 'Time',
    //     description: 'Add a Time field.',
    //     color: 'bg-indigo-500',
    //     icon: ClockIcon,
    // },
    // {
    //     id: 1,
    //     name: 'Created At',
    //     description: 'Show time and date document was created.',
    //     color: 'bg-indigo-500',
    //     icon: ClockIcon,
    // },
    // {
    //     id: 1,
    //     name: 'Last Modified At',
    //     description: 'Show time and date document was modified.',
    //     color: 'bg-indigo-500',
    //     icon: ClockIcon,
    // },
]
const icons = [
    'Text',
    'Long Text',
    'Email',
    'Number',
    'Currency',
    'Phone Number',
    'URL',
    'Date',
    'Time',
    'RocketLaunchIcon'
]

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]

const workspaceTypes = ["basic",]

const selected = ref(workspaceTypes[0])




const cancelCreateWorkspace = () => {
    useDashboard.showDashboard = false
    // cancelCreateWorkspace()
}

const addWorkspace = () => {
    useDashboard.addWorkspace()
}
</script>


<template>
    <TransitionRoot :show="useDashboard.showDashboard" as="template" @after-leave="query = ''" appear>
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
                        <div class="px-2 py-4 ">
                            <input type="text" placeholder="Workspace Name" v-model="useDashboard.newDashboardData.name"
                                class="w-full border outline-none px-2 h-10 rounded-lg">
                        </div>
                        <Combobox>
                            <div v-if="false" class="">
                                <div v-if="useDatabase.selectedField.type != ''" class="px-2 py-3">
                                    <div class="flex items-center justify-between border rounded-xl p-2 hover:bg-gray-100">
                                        <div class="flex items-center">
                                            <div class="mr-2">
                                                <component :is="icons[useDatabase.selectedField.type]" class="h-5 w-5"
                                                    aria-hidden="true" />
                                            </div>
                                            <p class="text-sm font-medium">
                                                {{ useDatabase.selectedField.type }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-2 py-5">
                                <Listbox as="div" v-model="useDashboard.newDashboardData.icon">
                                    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Choose a
                                        workspace type</ListboxLabel>
                                    <div class="relative mt-2">
                                        <ListboxButton
                                            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <span class="block truncate capitalize">{{ useDashboard.newDashboardData.type
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
                                                <ListboxOption as="template" v-for="workspace in workspaceTypes"
                                                    :key="workspace" :value="workspace" v-slot="{ active }">
                                                    <li
                                                        :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                                        <span
                                                            :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate capitalize']">{{
                                                                workspace }}</span>

                                                        <span v-if="selected"
                                                            :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    </li>
                                                </ListboxOption>
                                            </ListboxOptions>
                                        </transition>
                                    </div>
                                </Listbox>
                            </div>
                            {{ useDashboard.workspaceMetadata }}
                            {{ useDashboard.newDashboardData }}
                            <div class="flex flex-wrap gap-2 py-3 px-2">
                                <button @click="useDashboard.newDashboardData.icon = icon" v-for="icon in icons" :key="icon"
                                :class="useDashboard.newDashboardData.icon == icon ? 'border-2 border-indigo-700' : 'bg-indigo-700 text-white'"
                                    class="h-8 w-8  rounded-lg flex items-center justify-center">
                                    <Icon :iconName="icon" :style="'h-5 w-5'" />
                                </button>
                            </div>

                        </Combobox>
                        <div class="px-5 py-4 flex items-center justify-end">
                            <div class="flex items-center">
                                <button @click="useDashboard.showDashboard = false"
                                    class="mr-3 text-red-600">Cancel</button>
                                <button @click="addWorkspace()"
                                    class="bg-indigo-600 text-white py-2 px-4 rounded-lg">Add Workspace</button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  



