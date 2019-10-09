import React, { Component,PureComponent } from 'react';
import firebase, { auth } from 'firebase';
import {Toast} from 'react-native-elements'
import styles from  './styles'



import {

  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  Image,
  Linking,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
  Modal
} from 'react-native';



export default class LoginView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      errorMessage:null,
      loggedIn: null,
      emailAddress:'',
      modalvisible:false
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
    Linking.openURL('https://www.myclassflix.com/login')
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    
    return (
<ImageBackground source={require('../assets/chica.jpg')}  style={styles.container} >
     <KeyboardAvoidingView   keyboardVerticalOffset={-170} behavior='padding' > 
      <SafeAreaView      style={styles.container}>
           <Image  style={{marginBottom:20,height:120,width:200}} source={require('../assets/LOGO2.png')}  />
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

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.setModalVisible(true)}>
            <Text style={styles.text}>¿Haz olvidado tu contraseña?</Text>
        </TouchableHighlight>

        <TouchableOpacity  style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleLogin()}>
          <Text style={styles.loginText}>INGRESAR</Text>
        </TouchableOpacity>

     <TouchableHighlight style={styles.buttonContainer} >
            <Text style={styles.text2}>Puedes registrarte aqui abajo</Text>
        </TouchableHighlight>

        <TouchableOpacity  style={[styles.buttonContainer, styles.registerbutton]} onPress={() => this.NavigateRegister()}>
          <Text style={styles.loginText}>REGISTRATE</Text>
        </TouchableOpacity>
      </SafeAreaView>
      </KeyboardAvoidingView>
</ImageBackground>

    );
  }
}

