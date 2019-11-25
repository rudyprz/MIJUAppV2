
import loadImage from 'blueimp-load-image'
import Parse from "parse";
import store from "../services/store";

const base64JpegPrefix = "data:image/jpeg;base64,";

function removeBase64Prefix(base64Str) {
    return base64Str.substr(base64Str.indexOf(",") + 1);
}

function addBase64Prefix(imageData) {
    return base64JpegPrefix + imageData
}

async function generateThumbnail(imageData, maxWidth) {
    return new Promise(async resolve => {
        let url = base64JpegPrefix + imageData
        let res = await fetch(url)
        let blob = await res.blob()
        Parse.initialize("BrounieApp", null, "C4suYZKkyRMYPGR7fEae");
        Parse.serverURL = "https://74ab3ebd.ngrok.io/parse";
        const fileImg = new Parse.File("test.png", blob, "image/png");
        const mailing = store.state.mail;
        const PhotosEv = Parse.Object.extend("PhotosEvent");
        const photosevent = new PhotosEv();
        photosevent.set("email", mailing);
        photosevent.set("image1", fileImg);
        photosevent.save()
        .then((photosevent) => {
          // Execute any logic that should take place after the object is saved.
          alert('Foto creada');
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        });
        loadImage(
            blob,
            (canvas) => {
                let dataURL = canvas.toDataURL('image/jpeg');
                resolve(removeBase64Prefix(dataURL));
            }, {
                maxWidth: maxWidth,
                canvas: true
            }
        );
    });
}


export default {
    removeBase64Prefix,
    generateThumbnail,
    addBase64Prefix,
};
