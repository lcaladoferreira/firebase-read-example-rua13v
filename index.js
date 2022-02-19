import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import firebase from './fire.js'


class App extends Component {
  constructor() {
    super();


    this.state = {
      shoppingList: [],
      isLoading: true
    };

    
  }


  //Gets call once when loading the page
  componentWillMount() {
      
      //allow your app to sign in anonomously
      firebase.auth().signInAnonymously().catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
      });


      //Get the Shopping List table of firebase
      const shoppingsDB = firebase.database().ref("Shopping List");

      const tempshoppingList = [];
      shoppingsDB.on('value',snapshot => {
        //Read each item in shoppings
        //Store it in a temporary array
        snapshot.forEach(childSnapShot => {
          //childSnapShot.key is the name of the data
          //childSnapShot.val() is the value of the data
          tempshoppingList.push(childSnapShot.val());
          
        });

        this.setState({shoppingList: tempshoppingList, isLoading: false });
        
      });

      
      
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          loading...
        </div>
      );
    }
    return (
      <div>
        Shopping List <br/>
        { this.state.shoppingList.map( (item) => <li>{item}</li> ) }
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
