<script setup>
import {
  IonItem,
  IonButton,
  IonIcon,
  IonLabel,
} from '@ionic/vue';
import { trashOutline, createOutline } from 'ionicons/icons';

// Props para recibir los datos del producto
let props = defineProps(["id", "nombre", "categoria", "precio", "descripcion", "imagen"]);

// Emitir eventos para editar o eliminar el producto
let emit = defineEmits(["delete_product", "edit_product"]);

const handleDelete = () => {
  if (confirm(`¿Estás seguro de que quieres eliminar el producto "${props.nombre}"?`)) {
    emit('delete_product', props.id);
  }
};

const handleEdit = () => {
  emit('edit_product', {
    id: props.id,
    nombre: props.nombre,
    categoria: props.categoria,
    precio: props.precio,
    descripcion: props.descripcion,
    imagen: props.imagen,
  });
};
</script>

<template>
  <ion-item>
    <!-- Imagen del producto -->
    <img :src="`/images/${imagen}`" alt="Imagen del producto" class="product-image" />

    <!-- Información del producto -->
    <ion-label>
      <h2>{{ nombre }}</h2>
      <p>Categoría: {{ categoria }}</p>
      <p>Precio: €{{ precio }}</p>
      <p>{{ descripcion }}</p>
    </ion-label>

    <!-- Botón Editar -->
    <ion-button slot="end" @click="handleEdit" color="primary">
      <ion-icon :icon="createOutline" />
    </ion-button>

    <!-- Botón Eliminar -->
    <ion-button slot="end" @click="handleDelete" color="danger">
      <ion-icon :icon="trashOutline" />
    </ion-button>
  </ion-item>
</template>

<style scoped>
.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
}
</style>
