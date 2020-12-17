import app from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCfM_xAUR9o_bL7A_ewt9VOY0ZCjDkH_uU",
    authDomain: "react-auth-19cff.firebaseapp.com",
    projectId: "react-auth-19cff",
    storageBucket: "react-auth-19cff.appspot.com",
    messagingSenderId: "779402875519",
    appId: "1:779402875519:web:1522e918c428e73632254a"
  };

  class Firebase {
      constructor() {
          app.initializeApp(firebaseConfig);

          this.auth = app.auth();
      }

      /* Auth API */
      doCreateUserWithEmailAndPassword = (email,password) => 
        this.auth.createUserWithEmailAndPassword(email,password)
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });

        doSignInWithEmailAndPassword = (email,password) => 
          this.auth.signInWithEmailAndPassword(email,password)
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
          
        doSignOut = () => this.auth.signOut();

        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
    }

  export default Firebase;