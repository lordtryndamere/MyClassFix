import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firebase from 'firebase';

//IMPORTS EXTERNOS
import Login from './/componets/login';
import Home from './/componets/home';
import Register from './/componets/register';


const AppNavigator = createStackNavigator({
  Login : {
    screen:Login
  },
  Register :{
    screen:Register
  },
  Home:{
    screen: Home
  },
  
},{initialRouteName:'Login'});



export default createAppContainer(AppNavigator);
