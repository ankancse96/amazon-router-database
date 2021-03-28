import { useContext } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../App";
import { createUserWithEmailAndPassword, handaleFbSignIn, handaleGoogleSignIn, handaleSignOut, initializedLoginFramework, signInWithEmailAndPassword } from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState (false);
  const [user,setUser] = useState({
    isSignedIn:false,
    newUser: false,
    name:" ",
    email:" ",
    photo:" ",
    password:" ",
    error:" ",
    success: false,
  });

  initializedLoginFramework();
  const [loggedInUser,setLoggedInUser]= useContext(UserContext);
  console.log(loggedInUser)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handaleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }
  const signOut = () => {
    handaleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }

  const fbSignIn = () => {
    handaleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }
const handaleBlur = (e) => {
    let isFieldValid = true ;
    
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        
    } if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value)
        isFieldValid= isPasswordValid && passwordHasNumber ;
    } if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
}

  const handaleSubmit = (e) => {
  //  console.log(user.email , user.password)
      if(newUser && user.email && user.password){
          createUserWithEmailAndPassword(user.name,user.email,user.password)
          .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
          })
      }
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email,user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        })
      }
      e.preventDefault();
  }


  return (
    <div style={{textAlign:"center"}}>
        {
          user.isSignedIn ? <button onClick={signOut}>Sign Out</button>:
          <button onClick={googleSignIn}>Sign In</button>
        } <br />

       <button onClick={fbSignIn}>Login with Facebook</button>

        {
          user.isSignedIn &&
          <div> <p>welcome, {user.name} , email: {user.email}</p>
          <img src={user.photo} alt="error" />
          </div>
        }
        <h1>Our Own Authentication Service</h1>
        <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign Up</label>
        <form onSubmit={handaleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handaleBlur} placeholder="Name"/>}
        <br />
        <input type="text" onBlur={handaleBlur} name="email" placeholder="email" required></input> <br></br>
        <input type="password" onBlur={handaleBlur} name="password" placeholder="password" required></input> <br></br>
        <input type="submit" value= {newUser?'Sign Up' : 'Sign In'}/>
        </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>User {newUser ? 'created ' : 'logged In'} successfully</p>
        }
    </div>
  );
}

export default Login;
