import firebaseConfig from "./firebase.config";
import { initializeApp } from "firebase/app";

let initializeAuthentication = () => {

    initializeApp(firebaseConfig)
}
export default initializeAuthentication