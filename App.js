
import React, { Component,PureComponent } from "react";
import {createAppContainer} from 'react-navigation';
import AppNavigator from './components/AppNavigator';


const AppContainer = createAppContainer(AppNavigator);

export default class App extends PureComponent{
  render(){
    return(
      <AppContainer/>
    )
  }
}


