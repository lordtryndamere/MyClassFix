import React,{Component} from 'react'
import {View,Text,StyleSheet } from 'react-native'


export default class Presentacion extends Component{
    render(){
        return(
            <View style={styles.container} >
                <Text> Presentacion View </Text>
            </View>
        )
    }
}


const styles  = StyleSheet.create({
        container:{
            alignContent:'center',
            justifyContent:'center',
            flex:1
        }



})