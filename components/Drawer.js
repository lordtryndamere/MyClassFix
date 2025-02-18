import React,{PureComponent} from 'react';
import {View,Text,Image} from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base'
import {createDrawerNavigator,DrawerNavigatorItems} from 'react-navigation-drawer'
import {SafeAreaView,StyleSheet} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import ReservaView from './MyCalendar/ReservarClase'
import UsersView from './UsersView';
import Settings from './SettinsView';
import HomeView from './HomeView';
import UserView from './UsersView';
import menu from '../assets/menu2.png';
import ContenCompo from './ContenCompo';
import ProfileView from './ProfileView'
import Preoloader from './Preloader'
import { createStackNavigator } from 'react-navigation-stack';
import Perfil from './Perfil'
import AjustesView from './AjustesView'
import Pago from './MyCalendar/Pago'
import Reserva from './MyCalendar/Reserva'
import {widthPercentageToDP  as ancho
    ,heightPercentageToDP  as    alto ,
    listenOrientationChange as op,
    removeOrientationListener as rp } from 'react-native-responsive-screen'

const Stack = createStackNavigator (   {
    HomeScreen:HomeView,
    Settings:Settings,
    UserView:UserView,
    ProfileView:ProfileView,
    ReservaView:ReservaView,
    Reserva:Reserva,
    Pago:Pago,
    Preoloader:Preoloader,
    AjustesView:AjustesView,
    //Perfil:Perfil
    Perfil:{
        screen:Perfil
      
    }
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