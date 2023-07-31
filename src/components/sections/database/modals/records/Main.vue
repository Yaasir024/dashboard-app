<script setup>
import { computed, ref } from 'vue'

import Fields from '@/components/sections/database/modals/records/Fields.vue'

import { useDatabaseStore } from '@/stores/workspace/database'

import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {
    PrinterIcon,
    TrashIcon,
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


const data = {
    "a01z4bfc": "",
    "dnnr190r": "",
    "eeaecber": "",
    "77czx280": "",
    "x3zc72a0": "",
    "x1c9b5n7": ""
}

const fieldIcons = {
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






const cancelCreateField = () => {
    useDatabase.showRecordsModal = false
    // setTimeout(() => {
    //     useDatabase.selectedField = {
    //         uid: '',
    //         name: '',
    //         type: '',
    //         createdAt: null,
    //     }
    // }, '500')
}
const confirmCancel = () => {
    cancelCreateField()
}
</script>


<template>
    <TransitionRoot :show="useDatabase.showRecordsModal" as="template" @after-leave="query = ''" appear>
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
                        class="mx-auto max-w-[800px] transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                        <div class="px-6 py-4 flex items-center justify-end">
                            <div class="flex items-center">
                                <button class="border-none outline-none mr-3">
                                    <PrinterIcon class="h-5 w-5" />
                                </button>
                                <button class="border-none outline-none">
                                    <TrashIcon class="h-5 w-5 hover:text-red-600" />
                                </button>
                            </div>
                        </div>
                        <div class="max-h-96 scroll-py-3 overflow-y-auto p-3">
                            {{ useDatabase.recordData }}
                            <div class="max-w-[600px] mx-auto">
                                <div v-for="field in useDatabase.fields.data" :key="field.uid" class="my-4">
                                    <div class="flex">
                                        <div class="flex-25% flex items-start">
                                            <p class="flex items-center">
                                                <component :is="fieldIcons[field.type]" class="h-4 w-4"
                                                    aria-hidden="true" />
                                                <span class="ml-2">{{ field.name }}</span>
                                            </p>
                                        </div>
                                        <div class="flex-[75%]">
                                            <Fields :type="field.type" :uid="field.uid" />

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="px-5 py-4 flex items-center justify-end">
                            <div class="flex items-center">
                                <button @click="cancelCreateField()" class="mr-3 hover:text-red-600">Cancel</button>
                                <button @click="useDatabase.saveRecord()"
                                    class="bg-indigo-600 text-white py-2 px-4 rounded-lg">Save Record</button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  



