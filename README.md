# MIJUAppV2 (mijuappv2)

Photos event with frame

## Install the dependencies
```bash
yarn
```
## Install Cordova Plugins (Camera and file)
```bash
quasar mode add cordova
cd src-cordova
cordova platform add android
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-camera
```

### Start the app in development mode for Android Studio (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m android
```


### Build the app for production for Android Studio
```bash
quasar build -m android
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Code based in this App
See blog [Part 1](https://www.learningsomethingnew.com/how-to-make-an-image-uploading-app-with-vue-quasar-firebase-storage-and-cordova-part-1).
See blog [Part 2](https://www.learningsomethingnew.com/how-to-make-an-image-uploading-app-with-vue-quasar-firebase-storage-and-cordova-part-2).
