import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


initializeAuthentication()
let googleprovider = new GoogleAuthProvider()
let githubprovider = new GithubAuthProvider();


function App() {
  let [user, setUser] = useState({})

  let handlegooglesignin = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, email, photoURL } = result.user;
        let loggedInuser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInuser)
      })
  }
  let handleGitSignin = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubprovider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const { displayName, email, photoURL } = result.user;
        let loggedInuser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInuser)
      })
  }
  let handlesignout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser({})
    })
  }
  return (
    <div className="App">
      {/* {
        user.name ? <h1>Welcome <br />{user.name}</h1> : <Button onClick={handlegooglesignin}><FontAwesomeIcon icon="fa-brands fa-google" />Google Sign In</Button>
      } */}
      {
        user.email && <div className="mb-5">
          <h1>Welcome</h1>
          <h1>{user.name}</h1>
          <img src={user.photo} referrerpolicy="no-referrer" alt="" />
        </div >
      }
      <div className="mt-3">
        {
          user.name ?
            <Button onClick={handlesignout} className='ms-3'><FontAwesomeIcon icon="fa-brands fa-google" />Sign Out</Button> :
            <div> <Button onClick={handlegooglesignin}><FontAwesomeIcon icon="fa-brands fa-google" />Google Sign In</Button>
              <Button onClick={handleGitSignin} className='ms-3'><FontAwesomeIcon icon="fa-brands fa-google" />Github Sign In</Button></div>


        }

      </div>
    </div>
  );
}

export default App;
