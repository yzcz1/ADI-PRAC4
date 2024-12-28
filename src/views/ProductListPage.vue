<script setup>
import { ref, reactive } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { getProductos, addProducto, deleteProducto, updateProducto } from '@/firebase/repositories/productRepository';
import { logout } from '@/firebase/services/authService';

import AddProduct from './AddProduct.vue';
import ProductList from './ProductList.vue';
import EditProductModal from './EditProductModal.vue'; // Importar el nuevo modal
import { onIonViewDidEnter } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado reactivo para los productos y el modal
const estado = reactive({
  productos: [],
  lastVisible: null, // Para paginación
  isLoading: false, // Indica si está cargando
  selectedProduct: null, // Producto seleccionado para editar
});

// Cargar los productos al entrar en la página
onIonViewDidEnter(async function () {
  await loadProductos();
});

// Función para cargar productos (paginación)
async function loadProductos() {
  estado.isLoading = true;
  try {
    const { productos, lastVisible } = await getProductos(6, estado.lastVisible);
    estado.productos = [...estado.productos, ...productos];
    estado.lastVisible = lastVisible; // Actualiza el último producto visible
  } catch (error) {
    console.error('Error al cargar productos:', error.message);
  } finally {
    estado.isLoading = false;
  }
}

// Función para añadir un producto
async function do_addProduct(producto) {
  try {
    const nuevoProducto = await addProducto(
      producto.nombre,
      producto.categoria,
      producto.precio,
      producto.descripcion,
      producto.imagen
    );
    estado.productos.unshift(nuevoProducto); // Añadir el producto al inicio de la lista
    console.log('Producto añadido:', nuevoProducto);
  } catch (error) {
    console.error('Error al añadir producto:', error.message);
  }
}

// Función para eliminar un producto
async function do_deleteProduct(id) {
  try {
    console.log('Eliminando producto:', id);
    await deleteProducto(id);
    estado.productos = estado.productos.filter((producto) => producto.id !== id); // Filtrar el producto eliminado
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
  }
}

// Función para abrir el modal de edición
function do_editProduct(product) {
  estado.selectedProduct = product; // Establecer el producto seleccionado
}

// Función para manejar la actualización desde el modal
async function handleProductUpdate(updatedProduct) {
  try {
    await updateProducto(updatedProduct.id, updatedProduct);
    const index = estado.productos.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      estado.productos[index] = updatedProduct; // Actualizar la lista local
    }
    console.log('Producto actualizado:', updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
  } finally {
    estado.selectedProduct = null; // Cerrar el modal
  }
}

// Función para cerrar sesión
async function do_logout() {
  try {
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Productos</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="do_logout">
            <ion-icon :icon="logOutOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Componente para añadir productos -->
      <add-product @add_product="do_addProduct" />

      <!-- Lista de productos -->
      <ion-list>
        <product-list
          :productos="estado.productos"
          @delete_product="do_deleteProduct"
          @edit_product="do_editProduct"
        />
      </ion-list>

      <!-- Modal para editar producto -->
      <edit-product-modal
        v-if="estado.selectedProduct"
        :product="estado.selectedProduct"
        @update_product="handleProductUpdate"
        @close="estado.selectedProduct = null"
      />
    </ion-content>
  </ion-page>
</template>

<style scoped>
.load-more-container {
  margin-top: 1rem;
  text-align: center;
}
</style>
