import React,{Component} from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { Transition } from 'react-native-reanimated';
import LoginView from './login'
import RegisterView from './register'
import Drawer from './Drawer';


const stack = createStackNavigator({
  Login:LoginView,
  Register:RegisterView
})
const AppNavigator = 
    createSwitchNavigator(
      {
        Login: LoginView,
        Register:RegisterView,
        Drawer:Drawer,
        stack:stack
        
      },
      {
        initialRouteName: 'Login',
        headerMode:'none'
      },{
        transition: (
          <Transition.Together>
            <Transition.Out
              type="slide-bottom"
              durationMs={400}
              interpolation="easeIn"
            />
            <Transition.In type="fade" durationMs={500} />
          </Transition.Together>
        ),
      }
    )
 
export default createAppContainer(AppNavigator);

