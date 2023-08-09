<script setup>
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
    Cog8ToothIcon,
    RocketLaunchIcon,
    TableCellsIcon,
    DocumentTextIcon,
} from '@heroicons/vue/24/outline'

import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const props = defineProps(['iconName', "style"])

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
    "RocketLaunchIcon": RocketLaunchIcon,
    "database" : TableCellsIcon,
    "form" : DocumentTextIcon,
}
</script>


<template>
    <component :is="icons[iconName]" :class="style" aria-hidden="true" />
</template>