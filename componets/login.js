import React, { Component } from 'react';
import firebase from 'firebase';
import styles from  './styles'
import Icon from'react-native-vector-icons/MaterialIcons'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,

  Alert,
  ImageBackground
} from 'react-native';


export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      errorMessage:null
    }
  }

  handleLogin = () => {
    const {email,password} = this.state
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then( () => this.props.navigation.navigate('Home'))
    .catch(error => this.setState({errorMessage:"Passowrd Or User Don't Exist Here"}))
  }

  componentDidMount(){
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
  }

  render() {
    return (
      <ImageBackground source={require('../assets/chica.jpg')}  style={styles.container} > 
      <View       style={styles.container}>
            <Icon size={80}  style={styles.ico} >perm_identity</Icon>
            {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleLogin()}>
          <Text style={styles.loginText}>INGRESAR</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text  style={styles.textregistry}>Registrate aqui</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.registerbutton]} onPress={() => this.navigation.navigate('Register')}>
          <Text style={styles.loginText}>REGISTRATE</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
    );
  }
}

