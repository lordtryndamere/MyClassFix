import React,{PureComponent} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Left,Icon} from 'native-base';
import {ListItem,Avatar,Card,Header,SearchBar} from 'react-native-elements'
import {DrawerActions} from 'react-navigation-drawer'
import styles from './styles'
import {widthPercentageToDP  as ancho
  ,heightPercentageToDP  as    alto ,
  listenOrientationChange as op,
  removeOrientationListener as rp } from 'react-native-responsive-screen'

export default class SettinsView extends PureComponent{
    render (){
        return(
        <View>
              <Header
  leftComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())} >
  <View  style={styles.row}>
      <Image source={require('../assets/menu2.png')} style={styles.headerImage2}  />
  </View>
  </TouchableOpacity>}
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

