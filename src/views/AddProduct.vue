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
import { addOutline } from 'ionicons/icons';
import { ref } from 'vue';

// Campos del formulario
const nombre = ref('');
const categoria = ref('');
const precio = ref('');
const descripcion = ref('');
const imagen = ref('');
const isModalOpen = ref(false);

// Emitir evento para agregar producto
const emit = defineEmits(['add_product']);

const addProduct = () => {
  // Validar formulario
  if (!nombre.value || !categoria.value || !precio.value || !descripcion.value || !imagen.value) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  // Emitir el producto al componente padre
  emit('add_product', {
    nombre: nombre.value,
    categoria: categoria.value,
    precio: parseFloat(precio.value),
    descripcion: descripcion.value,
    imagen: imagen.value,
  });

  // Resetear campos y cerrar modal
  nombre.value = '';
  categoria.value = '';
  precio.value = '';
  descripcion.value = '';
  imagen.value = '';
  isModalOpen.value = false;
};

</script>

<template>
  <!-- Botón para abrir el modal -->
  <ion-item class="add-product-button">
    <ion-button slot="end" @click="isModalOpen = true">
      <ion-icon :icon="addOutline" />
      Añadir Producto
    </ion-button>
  </ion-item>

  <!-- Modal para añadir producto -->
  <ion-modal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
    <ion-header>
      <ion-toolbar>
        <ion-title>Añadir Producto</ion-title>
        <ion-button slot="end" fill="clear" @click="isModalOpen = false">Cerrar</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="addProduct" class="add-product-form">
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

        <!-- Botón Guardar -->
        <ion-button expand="block" type="submit" class="save-button">
          Guardar Producto
        </ion-button>
      </form>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.add-product-button {
  margin: 1rem 0;
}

.add-product-form {
  padding: 1rem;
}

.save-button {
  margin-top: 1rem;
}
</style>
