import React, {Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'

export default class Calendario extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}} >

                <Text>  Vista de calendario  </Text>

            </View>
        )
    }
}


const styles = StyleSheet.create({
container:{
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
}
})