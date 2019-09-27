import React, { Component } from 'react';
import firebase from 'firebase';
import styles from './styles'
import {

  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

export default class Home extends Component {



  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Home');
}

  render() {
    return (
    
      <View       style={styles.container}>
  <Text
  >Hi</Text>



<TouchableHighlight style={[styles.buttonContainer, styles.registerbutton]} onPress={() => this.logOut()}>
          <Text style={styles.loginText}>Logout</Text>
</TouchableHighlight>      

      </View>

    );
  }
}


 