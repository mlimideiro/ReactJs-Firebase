import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor () { //ESTADO que llama al constructor
    super();
    this.state= {
      user: null //Objeto que está vacio como estado
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout =this.handleLogout.bind(this);
  }

  componentWillMount (){ //METODO DE CICLO DE VIDA
    firebase.auth().onAuthStateChanged(user => { //REVISA EL ESTADO DEL USER
      this.setState({ user });
    })
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
   renderLoginButton () {
     //Si el usuario está logueado
     if (this.state.user) {
       return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}!</p>
          <button onClick={this.handleLogout}>Salir</button>
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
