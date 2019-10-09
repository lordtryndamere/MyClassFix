import React,{PureComponent} from 'react';
import {View,Text,Image} from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base'
import {createDrawerNavigator,DrawerNavigatorItems} from 'react-navigation-drawer'
import {SafeAreaView,StyleSheet} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import UsersView from './UsersView';
import Settings from './SettinsView';
import HomeView from './HomeView';
import UserView from './UsersView';
import menu from '../assets/menu2.png';
import ContenCompo from './ContenCompo';
import ProfileView from './ProfileView'
import { createStackNavigator } from 'react-navigation-stack';


const Stack = createStackNavigator (   {
    HomeScreen:HomeView,
    Settings:Settings,
    UserView:UserView,
    ProfileView:ProfileView
},{
    headerMode:'none'
    }
)


  
const MyApp = createDrawerNavigator({

Home:{
    screen:Stack
},
BuscarDocentes:{
    screen:UsersView
},
Soporte:{
    screen:Settings
    
},



},{initialRouteName:'Home',
contentComponent: ContenCompo,
drawerPosition:'left'
})


//   const styles = StyleSheet.create({

//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     drawerHeader: {
//       height: 200,
//       backgroundColor: 'white'
//     },
//     drawerImage: {
//       height: 150,
//       width: 150,
//       borderRadius: 75
//     }
  
//   })
  
export default MyApp;