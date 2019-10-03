import React,{PureComponent} from 'react';
import {View,Text} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Left,Icon} from 'native-base';
import {ListItem,Avatar,Card,Header,SearchBar} from 'react-native-elements'


export default class SettinsView extends PureComponent{
    render (){
        return(
        <View>
              <Header
  leftComponent={<Icon name="menu"  onPress ={ ()=> this.props.navigation.navigate('DrawerOpen')} />}
  // centerComponent={{ text: 'M Y C L A S S F L I X', style: { color: '#26a69a', fontSize:20} }}

  containerStyle={{
    backgroundColor:'#fff',
    borderBottomColor:'#9E9E9E',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    
  }}
/>
        </View>
        )
    }
}

