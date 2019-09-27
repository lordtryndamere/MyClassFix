import React, { Component } from 'react';
import firebase from 'firebase';
import styles from './/styles';
import {

  Text,
  View,
  TextInput,
  TouchableHighlight,

  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      lastname :'',
      email   : '',
      password: '',
      country:'',
    }
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
          <TouchableHighlight style={[styles.buttonContainer, styles.estudiantebutton]} onPress={() => this.navigation.navigate('Register')}>
          <Text style={styles.loginText}>ESTUDIANTE</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.docentebutton]} onPress={() => this.navigation.navigate('Register')}>
          <Text style={styles.loginText}>DOCENTE</Text>
        </TouchableHighlight>

        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="Nombres"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}/>
        </View>
        
        <View style={styles.inputContainer}>
         
          <TextInput style={styles.inputs}
              placeholder="Apellidos"
              underlineColorAndroid='transparent'
              onChangeText={(lastname) => this.setState({lastname})}/>
        </View>
        <View style={styles.inputContainer}>

        <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>

        <TextInput style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputContainer}>

        <TextInput style={styles.inputs}
            placeholder="Repetir contraseña"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputContainer}>

        <TextInput style={styles.inputs}
            placeholder="Pais"
            underlineColorAndroid='transparent'
            onChangeText={(country) => this.setState({country})}/>
        </View>

   

        <TouchableHighlight style={[styles.buttonContainer, styles.registerbutton]} onPress={() => this.navigation.navigate('Register')}>
          <Text style={styles.loginText}>REGISTRARME</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
    );
  }
}

