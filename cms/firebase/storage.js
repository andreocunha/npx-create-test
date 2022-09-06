import { getDownloadURL, ref, uploadBytesResumable, listAll } from "firebase/storage";
import { storage } from "../../config/firebase";

export async function handleSubmitImage(file, progressPercentage, load, errorInfo) {
  if (!file) return;
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `posts/${file.name}`);  
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // progressPercentage(snapshot.totalBytes, snapshot.bytesTransferred, snapshot.totalBytes);
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // errorInfo(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // load(downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
}

export async function convertImageUrlToFile(url){
  // from url http to blob
  const response = await fetch(url);
  const blob = await response.blob();
  // blob to file
  const file = new File([blob], "image.png", { type: "image/png" });
  return file;
}