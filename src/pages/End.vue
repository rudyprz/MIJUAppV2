<template>
  <q-page class="flex flex-center column bg-primary">
    <div class="row q-pa-md text-center q-gutter-md" style="width:50%">
      <q-img src="statics/img/Temo.png"></q-img>
      <h4 class="text-white">¡Gracias por tomarte las fotos con los transformers!</h4>
      <p class="text-white">Un correo te fue enviado a <span class="text-bold text-uppercase"> {{ state.mail }} </span> con una liga de acceso. Ingresa a la liga para registrarte al club del tío temo y podrás visualizar tus fotos. Podrás descargarlas y compartirlas</p>
      <div class="text-center">
        <q-btn
            icon="send"
            color="secondary"
            size="md"
            label="Finalizar"
            @click="finalizar"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import store from "../services/store";
import Parse from 'parse';

export default {
  name: 'End',
  data () {
    return {
      state: store.state
    }
  },
  methods: {
    async finalizar() {
      try {
        await store.emptyPics();
        this.$router.replace('/');
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>
