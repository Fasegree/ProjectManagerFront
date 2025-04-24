<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PanelLeft } from 'lucide-vue-next'
import { useSidebar } from './utils'
import { Bars3Icon } from '@heroicons/vue/16/solid'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  
<Bars3Icon 
data-sidebar="trigger"
  class="size-7 cursor-pointer"
  @click="toggleSidebar"/>

</template>
