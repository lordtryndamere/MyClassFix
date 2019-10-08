import React, { Component,PureComponent } from 'react';
import firebase from 'firebase';
import {Toast} from 'react-native-elements'
import styles from  './styles'
import Icon from'react-native-vector-icons/MaterialIcons'
import {

  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity
} from 'react-native';


export default class LoginView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      errorMessage:null,
      loggedIn: null
    }
  }

  handleLogin = () => {
    const {email,password} = this.state
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then( () => this.props.navigation.navigate('HomeScreen'))
    .catch(error => this.setState({errorMessage:"Error Usuario o contraseña incorrectos!"}))
  }
  NavigateRegister = () =>{
    this.props.navigation.navigate('Register');
  }

  componentWillMount(){
    var firebaseConfig = {
        apiKey: "AIzaSyDD8IvY_nMvjYzuA5QGzcndDovfbqGF-vo",
        authDomain: "myclassflix-dev.firebaseapp.com",
        databaseURL: "https://myclassflix-dev.firebaseio.com",
        projectId: "myclassflix-dev",
        storageBucket: "myclassflix-dev.appspot.com",
        messagingSenderId: "1055855079259",
        appId: "1:1055855079259:web:ab973b7a8f4c4d3963f47e"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      // firebase.auth().onAuthStateChanged((user)=>{
      //   if(user){
      //     this.setState({loggedIn:true})
      //   }else {
      //     this.setState({loggedIn:false})
      //   }
      // });
  }

  render() {
    return (
      <ImageBackground source={require('../assets/chica.jpg')}  style={styles.container} > 
      <View       style={styles.container}>
            <Icon size={80}  style={styles.ico} >perm_identity</Icon>
            {this.state.errorMessage &&
          <Text style={{ color: 'white' }}>
            {this.state.errorMessage}
          </Text>}

        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
         
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text style={styles.text}>¿Haz olvidado tu contraseña?</Text>
        </TouchableHighlight>

        <TouchableOpacity  style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleLogin()}>
          <Text style={styles.loginText}>INGRESAR</Text>
        </TouchableOpacity>

        
            <Text style={styles.text2}>Puedes registrarte aqui abajo </Text>
       

        <TouchableOpacity  style={[styles.buttonContainer, styles.registerbutton]} onPress={() => this.NavigateRegister()}>
          <Text style={styles.loginText}>REGISTRATE</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    );
  }
}

