<script setup lang="ts">
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
      IonItem, IonLabel, IonInput, IonButton, toastController } from '@ionic/vue';
    import { login } from '@/firebase/services/authService'
    import {ref} from "vue"
    import {useRouter} from "vue-router"
    

    const router = useRouter()
    const email = ref("")
    const password = ref("")

    async function handleLogin() {
        try {
            console.log("Login con ", email.value, password.value)
            await login(email.value, password.value)
            // Aquí iría la lógica de autenticación con Firebase
            localStorage.setItem('user', JSON.stringify({ email: email.value }))
            router.push('/products')
        } catch (error) {
            const toast = await toastController.create({
                message: error.message,
                duration: 2000,
                color: 'danger'
                })
            toast.present()
        }
    }

</script>


<template>
      <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form @submit.prevent="handleLogin">
        <ion-item>
          <ion-input
            v-model="email"
            type="email"
            placeholder="email"
            required
          />
        </ion-item>

        <ion-item class="ion-margin-bottom">
          <ion-input
            v-model="password"
            placeholder="contraseña"
            type="password"
            required
          />
        </ion-item>

        <ion-button
          type="submit"
          expand="block"
          class="ion-margin-top"
        >
          Iniciar Sesión
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>