import React,{Component} from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import LoginView from './login'
// import RegisterView from './register'
import Drawer from './Drawer';
import Preoloader from './Preloader'


const AuthStack = createStackNavigator({
// RegisterView:RegisterView,
LoginView:LoginView,
Preoloader:Preoloader

},{
  initialRouteName:'LoginView',
  headerMode:'none'
});
const AppNavigator = 
    createSwitchNavigator(
      {
        AuthStack: {
          screen: AuthStack,
        },
  
        Drawer: {
          screen: Drawer,
        },
      });
 
export default createAppContainer(AppNavigator);

