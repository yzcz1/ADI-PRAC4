<script setup>
import {
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonModal,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/vue';
import { createOutline } from 'ionicons/icons';
import { ref, watch } from 'vue';

// Props para recibir el producto desde el padre
const props = defineProps(['product']);
const emit = defineEmits(['update_product', 'close']);

// Estados locales para los campos del formulario
const nombre = ref('');
const categoria = ref('');
const precio = ref('');
const descripcion = ref('');
const imagen = ref('');
const isModalOpen = ref(false);

// Sincronizar los datos del producto con los campos locales
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      nombre.value = newProduct.nombre;
      categoria.value = newProduct.categoria;
      precio.value = newProduct.precio;
      descripcion.value = newProduct.descripcion;
      imagen.value = newProduct.imagen;
      isModalOpen.value = true; // Abre el modal al cargar los datos
    }
  },
  { immediate: true }
);

// Manejo de la actualización del producto
const handleUpdate = () => {
  if (!nombre.value || !categoria.value || !precio.value || !descripcion.value || !imagen.value) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  // Emitir los datos actualizados al padre
  emit('update_product', {
    id: props.product.id,
    nombre: nombre.value,
    categoria: categoria.value,
    precio: parseFloat(precio.value),
    descripcion: descripcion.value,
    imagen: imagen.value,
  });

  isModalOpen.value = false; // Cerrar el modal
  emit('close'); // Notificar al padre que el modal se cerró
};
</script>

<template>
  <ion-modal :is-open="isModalOpen" @did-dismiss="emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>Editar Producto</ion-title>
        <ion-button slot="end" fill="clear" @click="emit('close')">Cerrar</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="handleUpdate" class="edit-product-form">
        <!-- Campo Nombre -->
        <ion-item>
          <ion-label position="stacked">Nombre</ion-label>
          <ion-input v-model="nombre" placeholder="Nombre del producto" required />
        </ion-item>

        <!-- Campo Categoría -->
        <ion-item>
          <ion-label position="stacked">Categoría</ion-label>
          <ion-input v-model="categoria" placeholder="Categoría" required />
        </ion-item>

        <!-- Campo Precio -->
        <ion-item>
          <ion-label position="stacked">Precio (€)</ion-label>
          <ion-input v-model="precio" type="number" placeholder="Precio" required />
        </ion-item>

        <!-- Campo Descripción -->
        <ion-item>
          <ion-label position="stacked">Descripción</ion-label>
          <ion-textarea v-model="descripcion" placeholder="Descripción" required />
        </ion-item>

        <!-- Campo Imagen -->
        <ion-item>
          <ion-label position="stacked">Imagen</ion-label>
          <ion-select v-model="imagen" placeholder="Seleccionar una imagen" required>
            <ion-select-option value="bolsa_de_mano_skepta.jpg">bolsa_de_mano_skepta.jpg</ion-select-option>
            <ion-select-option value="bolso_puma_coperni.jpg">bolso_puma_coperni.jpg</ion-select-option>
            <ion-select-option value="botas_futbol_ultra_5.jpg">botas_futbol_ultra_5.jpg</ion-select-option>
            <ion-select-option value="botas_puma_evolve_niño.jpg">botas_puma_evolve_niño.jpg</ion-select-option>
            <ion-select-option value="camiseta_ac_milan.jpg">camiseta_ac_milan.jpg</ion-select-option>
          </ion-select>
        </ion-item>

        <!-- Botón Guardar Cambios -->
        <ion-button expand="block" type="submit">Guardar Cambios</ion-button>
      </form>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.edit-product-form {
  padding: 1rem;
}

.save-button {
  margin-top: 1rem;
}
</style>
