import { 
  getAuth,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { errosFirebase } from "./erros";
import { auth } from "../../config/firebase";

const provider = new GoogleAuthProvider();

export async function handleSubmitSignup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    await auth.signOut();
    return 'Verifique seu email para confirmar o cadastro';
  } catch (error) {
    const erroInfo = await errosFirebase(error);
    return erroInfo;
  }
}

export async function handleSubmitLogin(email, password) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
    return response?.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function handleSubmitLoginGoogle() {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage);
    // ...
  });
}