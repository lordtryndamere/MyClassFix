<<<<<<< HEAD
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
=======
import React, { Component } from "react";
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'


//IMPORTS EXTERNS

import Login from './components/login';
import Home from './components/home';
import Register from './components/register';


// CONST

const HomeScreen = createStackNavigator({ Home: Home });


export default createAppContainer(
  createSwitchNavigator(
    {
      Login: Login,
      Register:Register,
      HomeScreen:HomeScreen,
 
    },
    {
      initialRouteName: 'Login',
    }
  )
);
>>>>>>> 17bcfab61e1106881e15a4bf09ea9266ebe5ec89
