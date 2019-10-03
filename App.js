
import React, { Component } from "react";
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'


//IMPORTS EXTERNS

import Login from './components/login';
import UserView from './components/UsersView';
import Register from './components/register';
import HomeScreen from './components/HomeView';
import Drawer from './components/Drawer'



// CONST

// const HomeScreen = createStackNavigator({ Home: Home });


export default createAppContainer(
  createSwitchNavigator(
    {
      Login: Login,
      Register:Register,
      UserView:UserView,
      HomeScreen:Drawer,
      
 
    },
    {
      initialRouteName: 'Login',
    }
  )
);

