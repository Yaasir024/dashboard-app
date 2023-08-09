<template>
    <div class="max-w-[800px] mx-auto">
        <h2 class="text-base font-semibold leading-6 text-gray-900">Create New Branch</h2>
        <p class="mt-1 text-sm text-gray-500">You haven’t created a branch yet. Get started by selecting a new branch type.</p>
        <ul role="list" class="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2">
            <li v-for="(item, itemIdx) in items" :key="itemIdx" class="flow-root">
                <div
                    class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                    <div :class="[item.background, 'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg']">
                        <Icon :iconName="item.type" :style="'h-6 w-6 text-white'" />
                    </div>
                    <div>
                        <h3 class="text-sm font-medium text-gray-900">
                            <a href="#" class="focus:outline-none">
                                <span class="absolute inset-0" aria-hidden="true" />
                                <span>{{ item.title }}</span>
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import Icon from '@/components/global/Icons.vue';

const items = [
    // {
    //     title: 'Create a List',
    //     description: 'Another to-do system you’ll try but eventually give up on.',
    //     icon: Bars4Icon,
    //     background: 'bg-pink-500',
    // },
    // {
    //     title: 'Create a Calendar',
    //     description: 'Stay on top of your deadlines, or don’t — it’s up to you.',
    //     icon: CalendarIcon,
    //     background: 'bg-yellow-500',
    // },
    // {
    //     title: 'Create a Gallery',
    //     description: 'Great for mood boards and inspiration.',
    //     icon: PhotoIcon,
    //     background: 'bg-green-500',
    // },
    // {
    //     title: 'Create a Board',
    //     description: 'Track tasks in different stages of your project.',
    //     icon: ViewColumnsIcon,
    //     background: 'bg-blue-500',
    // },
    {
        title: 'Create a Spreadsheet',
        description: 'Lots of numbers and things — good for nerds.',
        type: 'Table',
        background: 'bg-indigo-500',
    },
    {
        title: 'Create a Form',
        description: 'Lots of numbers and things — good for nerds.',
        type: 'Form',
        background: 'bg-blue-500',
    },
    // {
    //     title: 'Create a Timeline',
    //     description: 'Get a birds-eye-view of your procrastination.',
    //     icon: ClockIcon,
    //     background: 'bg-purple-500',
    // },
]
</script>