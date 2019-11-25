<template>
  <q-page class="bg-primary">
    <div class="q-gutter-md q-pa-md">
      <h4 class="text-center text-white">Mi Sesión de Fotos</h4>
      <div class="row justify-center items-start q-ma-md" v-for="(pic, idx) in pics" :key="idx">
          <q-card v-if="pic" style="width: 100%; max-width: 990px;">
            <q-img spinner-color="white" :src="pic.url" style="width: 990px; height:727px">
              <q-img src="statics/img/marco1.png" class="absolute-full transparent" style="width: 990px; height: 727px" />
              <div class="spinner-container" v-if="pic.uploading && !pic.failed">
                <q-spinner color="white" size="4em" />
              </div>
              <div class="spinner-container" v-if="pic.failed">
                <q-icon name="cloud_off" style="font-size: 48px;"></q-icon>
              </div>
            </q-img>
            <q-card-actions align="around">
              <q-btn
                flat
                round
                color="primary"
                icon="delete"
                @click="deletePic(idx)"
                :disable="pic.uploading"
              />
            </q-card-actions>
          </q-card>
      </div>
      <br>
      <div class="text-center">
        <q-btn
          icon="send"
          color="secondary"
          size="md"
          label="Terminar Sesión"
          @click="finalizarSesion"
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>

<script>
import store from "../services/store";
import { EventBus } from "../services/event-bus";
import imageUploader from "../services/image-uploader";
import Parse from 'parse';


export default {
  name: 'Sesion',
  data() {
    return {
      state: store.state,
    };
  },
  mounted() {
    EventBus.$off("takePicture");
    EventBus.$on("takePicture", this.uploadImageFromCamera);
  },
  computed: {
    pics() {
      return this.state.pics;
    }
  },
  methods: {
    async deletePic(idx) {
      try {
        await store.deletePic(idx);
        this.$q.notify({ message: "Picture deleted." });
      } catch (err) {
        console.error(err);
        this.$q.notify({ message: "Delete failed. Check log." });
      }
    },
    async uploadImageFromCamera() {
      try {
        imageUploader.uploadImageFromCamera();
      } catch (err) {
        console.error("Uploading failed");
        console.dir(err);
        store.updatePicFailed(localPic);
        this.$q.notify({ message: "Uploading failed. Check log." });
      }
    },
    async finalizarSesion() {
      try {
        let mailing = this.state.mail;
        console.log(mailing);
        Parse.initialize("BrounieApp", null, "C4suYZKkyRMYPGR7fEae");
        Parse.serverURL = "https://74ab3ebd.ngrok.io/parse";

        const PhotosEv = Parse.Object.extend("PhotosEvent");
        const photosevent = new PhotosEv();
        photosevent.set("email", mailing);
        photosevent.save()
        .then((gameScore) => {
          // Execute any logic that should take place after the object is saved.
          alert('Email registrado');
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        });
        this.$router.push('/End');;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>
