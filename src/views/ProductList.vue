<script setup>
import ProductItem from './ProductItem.vue';

// Props para recibir la lista de productos desde el componente padre
let props = defineProps(["productos"]);
defineEmits(["delete_product", "edit_product"]);
</script>

<template>
  <div class="product-list">
    <!-- Iterar sobre la lista de productos y renderizar cada uno -->
    <product-item
      v-for="producto in productos"
      :key="producto.id"
      v-bind="producto"
      @delete_product="$emit('delete_product', $event)"
      @edit_product="$emit('edit_product', $event)"
    />
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
