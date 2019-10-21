import React,{Component} from 'react'
import {View,Text,StyleSheet } from 'react-native'


export default class Conocimientos extends Component{
    render(){
        return(
            <View style={styles.container} >
                <Text> Conocimientos View </Text>
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