<script setup>
import { computed, ref } from 'vue'

import { useDatabaseStore } from '@/stores/workspace/database'

import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
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
} from '@headlessui/vue'


const useDatabase = useDatabaseStore()

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
    {
        id: 1,
        name: 'URL',
        description: 'Add a link or url.',
        color: 'bg-indigo-500',
        icon: LinkIcon,
    },
    {
        id: 1,
        name: 'Date',
        description: 'Add a date.',
        color: 'bg-indigo-500',
        icon: CalendarIcon,
    },
    {
        id: 1,
        name: 'Time',
        description: 'Add a Time field.',
        color: 'bg-indigo-500',
        icon: ClockIcon,
    },
    {
        id: 1,
        name: 'Created At',
        description: 'Show time and date document was created.',
        color: 'bg-indigo-500',
        icon: ClockIcon,
    },
    {
        id: 1,
        name: 'Last Modified At',
        description: 'Show time and date document was modified.',
        color: 'bg-indigo-500',
        icon: ClockIcon,
    },
    // More items...
]
const icons = {
    'Text': PencilSquareIcon,
    'Long Text': DocumentIcon,
    'Email': EnvelopeIcon,
    'Number': HashtagIcon,
    'Currency': CurrencyEuroIcon,
    'Phone Number': PhoneIcon,
    'URL': LinkIcon,
    'Date': CalendarIcon,
    'Time': ClockIcon,
    'Created At': ClockIcon,
    'Last Modified At': ClockIcon,
}



const open = ref(true)
const query = ref('')
const filteredItems = computed(() =>
    query.value === ''
        ? items
        : items.filter((item) => {
            return item.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

const selectField = (field) => {
    useDatabase.selectedField.type = field.name
}
const clearField = () => {
    useDatabase.selectedField.type = ''
}

const pickField = (field) => {
    console.log(field)
    useDatabase.showFieldsModal = false
}

const cancelCreateField = () => {
    useDatabase.showFieldsModal = false
    setTimeout(() => {
        useDatabase.selectedField = {
            uid: '',
            name: '',
            type: '',
            createdAt: null,
        }
    }, '500')
}
const confirmCancel = () => {
    cancelCreateField()
}
</script>


<template>
    <TransitionRoot :show="useDatabase.showFieldsModal" as="template" @after-leave="query = ''" appear>
        <Dialog as="div" class="relative z-10" @close="cancelCreateField()">
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
                            <input type="text" placeholder="Field Name" v-model="useDatabase.selectedField.name"
                                class="w-full border outline-none px-2 h-10 rounded-lg">
                        </div>
                        <Combobox v-if="true">
                            <div class="">
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
                                        <button @click="clearField()" class="flex items-center justify-center">
                                            <XCircleIcon class="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div class="relative" v-else>
                                    <MagnifyingGlassIcon
                                        class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true" />
                                    <ComboboxInput
                                        class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm"
                                        placeholder="Search..." @change="query = $event.target.value" />
                                </div>
                            </div>

                            <div class="overflow-hidden"
                                :class="useDatabase.selectedField.type != '' ? 'max-h-0' : 'max-h-[300px]'">
                                <ComboboxOptions v-if="filteredItems.length > 0" static
                                    class="max-h-96 scroll-py-3 overflow-y-auto p-3">
                                    <ComboboxOption v-for="item in filteredItems" :key="item.id" :value="item" as="template"
                                        v-slot="{ active }">
                                        <li @click="selectField(item)"
                                            :class="['flex cursor-default select-none rounded-xl p-3', active && 'bg-gray-100']">
                                            <div
                                                :class="['flex h-8 w-8 flex-none items-center justify-center rounded-lg', item.color]">
                                                <component :is="item.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                                            </div>
                                            <div class="ml-4 flex-auto">
                                                <p
                                                    :class="['text-sm font-medium', active ? 'text-gray-900' : 'text-gray-700']">
                                                    {{ item.name }}
                                                </p>
                                                <p :class="['text-sm', active ? 'text-gray-700' : 'text-gray-500']">
                                                    {{ item.description }}
                                                </p>
                                            </div>
                                        </li>
                                    </ComboboxOption>
                                </ComboboxOptions>

                                <div v-if="query !== '' && filteredItems.length === 0"
                                    class="px-6 py-14 text-center text-sm sm:px-14">
                                    <ExclamationCircleIcon type="outline" name="exclamation-circle"
                                        class="mx-auto h-6 w-6 text-gray-400" />
                                    <p class="mt-4 font-semibold text-gray-900">No results found</p>
                                    <p class="mt-2 text-gray-500">No fields found for this search term. Please try again.
                                    </p>
                                </div>
                            </div>

                        </Combobox>
                        <div class="px-5 py-4 flex items-center justify-end">
                            <div class="flex items-center">
                                <button @click="cancelCreateField()" class="mr-3">Cancel</button>
                                <button @click="useDatabase.saveField()"
                                    class="bg-indigo-600 text-white py-2 px-4 rounded-lg">Create Field</button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  



