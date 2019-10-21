import React, { Component,PureComponent } from 'react';
import * as firebase from 'firebase';
import {StyleSheet} from 'react-native'
import {Overlay,Button,Icon,Input} from 'react-native-elements'
import styles from  './styles'
import {NavigationActions} from 'react-navigation'
import Preloader from './Preloader'
import Toast from 'react-native-simple-toast';


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
    if(email&&password){
      
      firebase.auth()
      .signInWithEmailAndPassword(email,password)
      .then(()=>{
        this.setState({messagelogin:Toast.show("Iniciando ",Toast.LONG,1600)})
        setTimeout(()=>{
          this.props.navigation.navigate('HomeScreen') 
        },2000) 
      })
      .catch((e) => { 
        this.setState({errorMessage:"Error Usuario o contraseña incorrectos!"})
      
        setTimeout(() => {
          this.setState({errorMessage:null})
        }, 5000);
      })
    }else {  
      this.setState({errorMessage:"Tienes que rellenar todos los campos"})
      setTimeout(() => {
        this.setState({errorMessage:null})
      }, 5000);
  }

  }

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

    if(email){
      auth.sendPasswordResetEmail(email).then(()=>{
        this.setState({correoenviado:"Por favor verifica tu correo electronico"})
      }).then(()=>{
        setTimeout(()=>{
          this.setState({email2:null})
          this.setState({correoenviado:null})
          this.isVisible(false)
        },6000)
       
      })
      .catch((e)=>{
        this.setState({email2:null})
        this.setState({correoenviado:"Algo ocurrio no se pudo enviar el correo de restablecimiento"})
        setTimeout(() => {
          this.setState({correoenviado:null})
        }, 7000);
        
      })
    }else{
      
      this.setState({email2:null,})
    }


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
           <Image  style={{marginBottom:20,height:140,width:260}} source={require('../assets/PRUEBA-18.png')}  />
            {this.state.errorMessage &&
          <Text style={{ color: 'white' }}>
            {this.state.errorMessage}
          </Text>}
  


          

          <Overlay isVisible={this.state.isVisible} overlayBackgroundColor="transparent"   overlayStyle={styles2.overlaystyle} >
           {this.state.correoenviado &&
          <Text style={{ color: '#0097A7' }}>
            {this.state.correoenviado}
          </Text>} 

                <Input
                containerStyle={styles2.inputcontainer}
                placeholder="Escribe tu email"
                onChangeText={(email2) => this.setState({email2})}
                value={this.state.email2}/>


        <Button  title="Enviar Correo"   type="solid"        buttonStyle={styles2.buttonStyle} onPress={()=> this.ResetPassword()} />
        <Icon  onPress={()=>this.isVisible(false)} size={30} color="#00BEB1"  containerStyle={styles2.containerclose}  type="font-awesome" name="window-close" />
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
          
        <TouchableOpacity  style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.handleLogin()}>
          <Text style={styles.loginText}>INGRESAR</Text>
        </TouchableOpacity>
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

const styles2 = StyleSheet.create({
  overlaystyle:{
  alignItems:'center',
  justifyContent:'center',
  width:"85%",
  height:"37%",
  backgroundColor:"#fff",
  padding:20,
  borderColor:"#00BEB1",
  borderBottomWidth:2,
  borderTopWidth:2,
  borderLeftWidth:2,
  borderRightWidth:2

  
},
// viewOverlay:{  ESTILO CON VIEW
//     width:"100%",
//     backgroundColor:"#fff",
//     padding:20,
//     borderColor:"#00BEB1",
//     borderBottomWidth:2,
//     borderTopWidth:2,
//     borderLeftWidth:2,
//     borderRightWidth:2

// },
inputcontainer:{
  marginBottom:20
},
buttonStyle:{
  backgroundColor:"#00BEB1"
},
containerclose:{
  position:"absolute",
  right:-2,
  top:-4
}
})