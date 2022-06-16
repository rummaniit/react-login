import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
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
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [error, setError] = useState('')

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

  let handleregistration = (e) => {
    e.preventDefault()
    console.log(email, password);
    const auth = getAuth();
    if (password.length < 6) {
      setError('Password is Less than 6')
    }
    else {

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setError('')
          console.log(user);
        })
    }
  }


  let handleEmail = (e) => {
    setEmail(e.target.value)
  }
  let handlePassword = (e) => {
    setPassword(e.target.value);
  }
  return (
    <div className="mx-5">
      <form onSubmit={handleregistration}>
        <h1 className="text-primary">Please Register</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" required onBlur={handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" required onBlur={handlePassword} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check" >
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <div className="mb-3 text-danger">
          {error}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>


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
