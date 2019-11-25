<template>
  <q-page class="flex flex-center column bg-primary">
    <img class="q-mb-xl" alt="Club logo" src="statics/img/club.png" style="max-width: 100%; width: 20%">
    <div class="q-pa-md row" style="width:40%; text-align:center">
      <q-form
        @submit="onSubmit"
        class="q-gutter-sm-y"
        style="width:100%"
      >
        <q-input
          filled
          bg-color="white"
          v-model="email"
          type="email"
          label="Tu correo electrónico"
          lazy-rules
          :rules="[val => !!val || 'Ingresa un correo',
          val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Ingresa un correo válido',]"
        />
          <q-btn size="xl" flat round type="submit" color="white">
            <q-icon name="camera" />
          </q-btn>
      </q-form>

    </div>
  </q-page>
</template>

<script>
import store from "../services/store";

export default {
  name: 'PageIndex',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        await store.registerMail(this.email);
        this.$router.push('/Sesion');
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>
