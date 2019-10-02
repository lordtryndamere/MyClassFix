
import React, { Component } from "react";
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'


//IMPORTS EXTERNS

import Login from './components/login';
import Home from './components/home';
import Register from './components/register';


// CONST

// const HomeScreen = createStackNavigator({ Home: Home });


export default createAppContainer(
  createSwitchNavigator(
    {
      Login: Login,
      Register:Register,
      HomeScreen:Home,
 
    },
    {
      initialRouteName: 'Login',
    }
  )
);

