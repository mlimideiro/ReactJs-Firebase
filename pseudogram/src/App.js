import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';
import './App.css';

class App extends Component {
  constructor () { //ESTADO que llama al constructor
    super();
    this.state= {
      user: null, //Objeto que está vacio como estado
      picture: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount (){ //METODO DE CICLO DE VIDA
    firebase.auth().onAuthStateChanged(user => { //REVISA EL ESTADO DEL USER
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleAuth (){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
     .then(result => console.log(`${result.user.email} ha iniciado sesión`))
     .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout () {
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido de la sesión`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/Fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.log(error.message);
    }, () => {
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      };

      const dbRef = firebase.database().ref('picture');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

   renderLoginButton () {
     //Si el usuario está logueado
     if (this.state.user) {
       return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}!</p>
          <button onClick={this.handleLogout}>Salir</button>
          <FileUpload onUpload={ this.handleUpload }/>

          {
            this.state.picture.map(picture => (
              <div>
               <img src={picture.image} />
               <br/>
               <img width="48" src={picture.photoURL} alt={picture.displayName} />
               <br/>
               <span>{picture.displayName}</span>
              </div>
            )).reverse()
          }


        </div>
       );
     } else {
       //Si el usuadio no está logueado
       return (
        <button onClick={this.handleAuth}>Login con Google</button>
      );
     }
   }

   render() {
     return (
       <div className="App">
         <div className="App-header">
           <h2>Pseudogram</h2>
         </div>
         <p className="App-intro">
          { this.renderLoginButton()}
         </p>
       </div>
     );
   }
}

export default App;
