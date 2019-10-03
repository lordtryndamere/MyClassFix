import React,{PureComponent} from 'react';
import {View,Text} from 'react-native';
import {  } from 'native-base';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import UsersView from './UsersView';
import Settings from './SettinsView';
import  HomeView from './HomeView';


export default class Drawer extends PureComponent{
    render (){
    
        return(
        <App/>
        
     
        )
    }
}

const MyApp = createDrawerNavigator({
HomeView:{
screen:HomeView
},
Users:{
    screen:UsersView
},
Settings:{
    screen:Settings
}
})

const App = createAppContainer(MyApp)