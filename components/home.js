import React, { Component,PureComponent } from 'react';

import firebase from 'firebase';
import styles from './styles'
import {ListItem,Avatar} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {

  Text,
  View,
  FlatList,
  
} from 'react-native';



export default class Home extends PureComponent {

state={
  items:[],
  teacher: {},
  teachersAproveds:[],
  render:''
}

componentDidMount(){
  
  firebase.database().ref(`/approveds`).on('value',(snapshot)=>{
    var approveds = snapshot.val()

    // var Items = Object.values(data)
    for (var key in approveds) {
        firebase.database().ref(`/teachers/${key}/personalData`).on('value',snapshot=>{
            this.state.teacher = snapshot.val()
            this.state.teacher.uid = key
            this.state.teachersAproveds.push(this.state.teacher)
            var renderizar = Object.values(this.state.teachersAproveds)
            // console.log(this.state.render) 
            return this.setState({render:renderizar})
           

        })      
    }                
  
                   
    this.setState({items:approveds})
  } )
}


renderItem = ({ item }) => (
  
  <ListItem
  Component={TouchableScale}
  friction={90} 
  tension={100} 
  activeScale={0.95} 
  linearGradientProps={{
    colors: ['#424242', '#212121'],
    start: [1, 0],
    end: [0.2, 0],
  }}

  key={item.uid}
  title={item.name}
  titleStyle={{ color: 'white', fontWeight: 'bold' }}
  subtitle={item.email}
  subtitleStyle={{ color: 'white' }}
  leftAvatar={{ source: { uri: item.linkPhoto } }}
  chevron={{ color: 'white' }}
  bottomDivider
   
  />
)

  render() {
    return (
    
      <View >
            <FlatList
              keyExtractor={(item, index) => 'key'+index}
              data={this.state.render}
              renderItem={this.renderItem}
              initialNumToRender={8}
             
              

            />

      </View>

    );
  }
}


 