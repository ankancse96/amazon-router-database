import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"
export const initializedLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
}

export const handaleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      
      const {displayName,photoURL,email} = res.user
      const signInUser = {
        isSignedIn:true,
        name:displayName,
        photo:photoURL,
        email:email,
        success: true
      }
      return signInUser
      
    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
  }

  export const handaleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
     
  
      // The signed-in user info.
      const user = result.user;
      user.success = true;
      return user;
      
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
  
    });
  }

 export const handaleSignOut = () =>{
   return firebase.auth().signOut()
    .then(res => {
      
      
      const signedOutUser = {
        isSignedIn:false,
        name:"",
        photo:"",
        email:""
  }
      return signedOutUser ;
}) 
.catch(err => {
  console.log(err)
  console.log(err.message)
})
}

export const createUserWithEmailAndPassword = (name,email,password) =>{
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( res => {
      // Signed in 
      const newUserInfo = res.user
      newUserInfo.error = ' ';
      newUserInfo.success = true;

      updateUserName(name);
      return newUserInfo;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email,password) =>{
 return firebase.auth().signInWithEmailAndPassword(email,password)
  .then( res => {
// Signed in
         const newUserInfo = res.user;
          newUserInfo.error = ' ';
          newUserInfo.success = true;
          return newUserInfo ;
          
// ...
})
.catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
});
}




const updateUserName= name => {
    const user = firebase.auth().currentUser;

     user.updateProfile({
      displayName: name,
      
    }).then(function() {
      console.log ('Update successful')
    }).catch(function(error) {
    
      console.log ('An error happened')
    });
} 


