<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  useIonRouter,
} from '@ionic/vue';
import { updateProducto, obtenerProducto } from '@/firebase/repositories/productRepository';

const router = useIonRouter();
const route = router.currentRoute;

// Estado para los datos del producto
const producto = reactive({
  id: '',
  nombre: '',
  categoria: '',
  precio: '',
  descripcion: '',
  imagen: '',
});

// Estados para los mensajes de éxito y error
const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Función para cargar los datos del producto
const cargarProducto = async () => {
  const productId = route.value.params.id; // Obtener el ID del producto desde la URL
  if (!productId) {
    errorMessage.value = 'Producto no encontrado.';
    return;
  }

  try {
    const data = await obtenerProducto(productId);
    producto.id = productId;
    producto.nombre = data.nombre;
    producto.categoria = data.categoria;
    producto.precio = data.precio;
    producto.descripcion = data.descripcion;
    producto.imagen = data.imagen;
  } catch (error) {
    errorMessage.value = 'Error al cargar el producto.';
    console.error(error.message);
  }
};

// Función para guardar los cambios en el producto
const guardarCambios = async () => {
  if (!producto.nombre || !producto.categoria || !producto.precio || !producto.descripcion || !producto.imagen) {
    errorMessage.value = 'Todos los campos son obligatorios.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    await updateProducto(producto.id, {
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: parseFloat(producto.precio),
      descripcion: producto.descripcion,
      imagen: producto.imagen,
    });

    successMessage.value = 'Producto actualizado con éxito.';
    setTimeout(() => {
      router.push('/products');
    }, 2000);
  } catch (error) {
    errorMessage.value = 'Error al actualizar el producto.';
    console.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

// Cargar los datos del producto al montar el componente
onMounted(() => {
  cargarProducto();
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Editar Producto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form @submit.prevent="guardarCambios">
        <!-- Campo Nombre -->
        <ion-item>
          <ion-label position="stacked">Nombre</ion-label>
          <ion-input v-model="producto.nombre" placeholder="Nombre del producto" required />
        </ion-item>

        <!-- Campo Categoría -->
        <ion-item>
          <ion-label position="stacked">Categoría</ion-label>
          <ion-input v-model="producto.categoria" placeholder="Categoría" required />
        </ion-item>

        <!-- Campo Precio -->
        <ion-item>
          <ion-label position="stacked">Precio (€)</ion-label>
          <ion-input v-model="producto.precio" type="number" placeholder="Precio" required />
        </ion-item>

        <!-- Campo Descripción -->
        <ion-item>
          <ion-label position="stacked">Descripción</ion-label>
          <ion-textarea v-model="producto.descripcion" placeholder="Descripción" required />
        </ion-item>

        <!-- Campo Imagen -->
        <ion-item>
          <ion-label position="stacked">Imagen</ion-label>
          <ion-select v-model="producto.imagen" placeholder="Seleccionar una imagen" required>
            <ion-select-option value="bolsa_de_mano_skepta.jpg">bolsa_de_mano_skepta.jpg</ion-select-option>
            <ion-select-option value="bolso_puma_coperni.jpg">bolso_puma_coperni.jpg</ion-select-option>
            <ion-select-option value="botas_futbol_ultra_5.jpg">botas_futbol_ultra_5.jpg</ion-select-option>
            <ion-select-option value="botas_puma_evolve_niño.jpg">botas_puma_evolve_niño.jpg</ion-select-option>
            <ion-select-option value="camiseta_ac_milan.jpg">camiseta_ac_milan.jpg</ion-select-option>
          </ion-select>
        </ion-item>

        <!-- Mensajes de error y éxito -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

        <!-- Botón Guardar Cambios -->
        <ion-button expand="block" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  margin: 1rem 0;
}

.success-message {
  color: green;
  text-align: center;
  margin: 1rem 0;
}
</style>
