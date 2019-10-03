import React,{PureComponent,Component} from 'react'
import {Text,View,Image} from 'react-native'
import {Left,Icon} from 'native-base';
import {ListItem,Avatar,Card,Header,SearchBar} from 'react-native-elements'
import {DrawerActions} from 'react-navigation-drawer'
import menu from '../assets/menu2.png'



export default class HomeView extends Component{

    showDrawer=()=>{
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }


    render(){
        return(
            <View>
  <Header
    leftComponent={<Icon name="menu" onPress={this.showDrawer}  ></Icon> }
    centerComponent={{ text: 'M Y C L A S S F L I X', style: { color: '#00BEB1', fontSize:20} }}

  containerStyle={{
    backgroundColor:'#fff',
    borderBottomColor:'#9E9E9E',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    
  }}
/>
                <Text>HomeView</Text>
              
            </View>




        );
    }
}