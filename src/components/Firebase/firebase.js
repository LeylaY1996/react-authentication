import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
          this.db = app.database();

      }

      /* Auth API */
      doCreateUserWithEmailAndPassword = (email,password) => 
         this.auth.createUserWithEmailAndPassword(email,password)
            
      

        doSignInWithEmailAndPassword = (email,password) => 
            this.auth.signInWithEmailAndPassword(email,password)
         
        
          
        doSignOut = () => this.auth.signOut();

        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

        /* User API */
        user = uid => this.db.ref(`users/${uid}`);

        users = () => app.database().ref('users');
    }

  export default Firebase;