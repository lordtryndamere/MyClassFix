import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground
} from 'react-native';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <ImageBackground source={require('../assets/chica.jpg')}  style={styles.container}> 
      <View       style={styles.container}>
        <Tex>Bienvenido</Tex>
      </View>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
   
  })
 