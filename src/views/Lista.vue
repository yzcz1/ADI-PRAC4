<script setup>
    import Item from './Item.vue'

    let props = defineProps(["items"])
    defineEmits(["delete_item", "toggle_item"])
    console.log(props.items)
</script>


<template>
    <item v-for="item in items" 
          :key="item.id" 
          v-bind="item"
          @delete_item="$emit('delete_item', $event)"/>
</template>