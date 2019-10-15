import React, { Component,PureComponent } from 'react';
import * as firebase from 'firebase';
import {Overlay,Card,Button} from 'react-native-elements'
import styles from  './styles'
import {NavigationActions} from 'react-navigation'
import Preloader from './Preloader'


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
  ActivityIndicator,

  
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


export default class LoginView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
       email  : '',
       email2:'',
      password: '',
      errorMessage:null,
      loggedIn: null,
      emailAddress:'',
      isVisible:false,
      correoenviado:null,
      modalvisible:false,
      messagelogin:'',
      loader:false

    }
  }

  handleLogin = () => {
    const {email,password} = this.state
    if(!email&&password){
      this.setState({errorMessage:"Verifica los datos ingresados"})
    }else {  
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then(()=>{
      this.setState({messagelogin:"iniciando..."})
      setTimeout(()=>{
        this.props.navigation.navigate('HomeScreen') 
      },2000) 
    })
    .catch(error => this.setState({errorMessage:"Error Usuario o contraseña incorrectos!"}))
  }

  }
    // componentWillMount(){
    //   var firebaseConfig = {
    //       apiKey: "AIzaSyDD8IvY_nMvjYzuA5QGzcndDovfbqGF-vo",
    //       authDomain: "myclassflix-dev.firebaseapp.com",
    //       databaseURL: "https://myclassflix-dev.firebaseio.com",
    //       projectId: "myclassflix-dev",
    //       storageBucket: "myclassflix-dev.appspot.com",
    //       messagingSenderId: "1055855079259",
    //       appId: "1:1055855079259:web:ab973b7a8f4c4d3963f47e"
    //     };
    //     // Initialize Firebase
    //     firebase.initializeApp(firebaseConfig);
    //     firebase.auth().onAuthStateChanged((user)=>{
    //     if(user){
    //         this.setState({loggedIn:true})
    //     }else {
    //         this.setState({loggedIn:false})
    //       }
    //     });
    // }

componentDidMount(){
  setTimeout(() => {
    this.setState({loader:true})
  }, 2000);
}


  NavigateRegister = () =>{
    Linking.openURL('https://www.myclassflix.com/login')
  }


  isVisible(visible) {
    this.setState({isVisible: visible});
   
  }

  ResetPassword(){
    var auth = firebase.auth()
    const email = this.state.email2


    auth.sendPasswordResetEmail(email).then(()=>{
      this.setState({correoenviado:"Por favor verifica tu correo electronico"})
    }).then(()=>{
      setTimeout(()=>{
        this.isVisible(false)
      },6000)
     
    })
    .catch((e)=>{
  
      this.setState({correoenviado:"Algo ocurrio no se pudo enviar el correo de restablecimiento"})
    })

  }
  render() {
    const {loader} = this.state
    if(loader==false){
      return <Preloader/>
    } else {  
    return (
<ImageBackground source={require('../assets/chica.jpg')}  style={styles.container} >
  
     <KeyboardAvoidingView   keyboardVerticalOffset={-170} behavior='padding' > 
      <SafeAreaView      style={styles.container}>
           <Image  style={{marginBottom:20,height:120,width:200}} source={require('../assets/LOGO2.png')}  />
            {this.state.errorMessage &&
          <Text style={{ color: 'white' }}>
            {this.state.errorMessage}
          </Text>}
  


          

    <Overlay   overlayStyle={{height:'40%',width:'80%',borderRadius:30}}   isVisible={this.state.isVisible} >
    {this.state.correoenviado &&
          <Text style={{ color: '#0097A7' }}>
            {this.state.correoenviado}
          </Text>} 
       <View style={{justifyContent:'center',alignContent:'center'   }}  >
                <Card title="Restablecimiento de contraseña" containerStyle={{borderRadius:30}} >
              <View style={styles.inputContainer3} >
                <TextInput
                placeholderTextColor="#0097A7"
                style={styles.inputs5}
                placeholder="Escribe tu email"
                underlineColorAndroid='transparent'
                onChangeText={(email2) => this.setState({email2})}/>
              </View>
              </Card>
          <View style={{justifyContent:'center',alignContent:'center',paddingTop:30}} >
        <Button  title="Enviar"   type="solid"      buttonStyle={{ width:'35%',position:'relative',marginLeft:100,borderRadius:10}} onPress={()=> this.ResetPassword()} ></Button>
          </View>

          <View style={{justifyContent:'center',alignContent:'center',marginLeft:20}} >
          <TouchableOpacity onPress={()=>this.isVisible(false)} style={styles.buttonContainer} >
              <Text style={styles.text3}>Salir</Text>
          </TouchableOpacity>
          </View>
      </View>   
    </Overlay>
  



        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="C o r r e o    e l e c t r o n i c o"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
         
          <TextInput style={styles.inputs}
              placeholder="C o n t r a s e ñ a "
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.isVisible(true)}>
            <Text style={styles.text}>¿Haz olvidado tu contraseña?</Text>
        </TouchableOpacity>
          
        <TouchableNativeFeedback  style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleLogin()}>
          <Text style={styles.loginText}>INGRESAR</Text>
        </TouchableNativeFeedback>
              <Text style={{color:"white",fontSize:14}} > {this.state.messagelogin} </Text>
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
}

