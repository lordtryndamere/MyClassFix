import React, { Component } from 'react';

import firebase from 'firebase';
import styles from './styles'
import {ListItem,Avatar} from 'react-native-elements'
import {

  Text,
  View,
  
  FlatList,
} from 'react-native';



export default class Home extends Component {

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
  key={item.uid}
  
  title={item.name}
  subtitle={item.email}
  leftAvatar={{ source: { uri: item.linkPhoto } }}
  bottomDivider
  chevron
   
  />
)

  render() {
    return (
    
      <View >
            <FlatList
              keyExtractor={(item, index) => 'key'+index}
              data={this.state.render}
              renderItem={this.renderItem}
              

            />

      </View>

    );
  }
}


 