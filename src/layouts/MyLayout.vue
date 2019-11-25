<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary">
        <q-img
          src="statics/img/miju.png"
          style="height: 10%; width: 10%"
        />
        <q-toolbar-title>

        </q-toolbar-title>
        <q-btn size="xl" v-if="$route.fullPath.includes('/Sesion')" flat round @click="takePicture">
          <q-icon name="camera" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { EventBus } from "../services/event-bus.js";

export default {
  name: 'MyLayout',
  methods: {
    takePicture() {
      EventBus.$emit('takePicture')
    }
  }
}
</script>
