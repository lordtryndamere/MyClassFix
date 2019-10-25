import React,{PureComponent} from 'react'
import {View,Text,StyleSheet, SafeAreaView} from 'react-native'
import Userinfo from './Userinfo'
import {widthPercentageToDP  as ancho
    ,heightPercentageToDP  as    alto ,
    listenOrientationChange as op,
    removeOrientationListener as rp } from 'react-native-responsive-screen'

export default class AjustesView extends PureComponent{
    render(){
        return(
            <SafeAreaView style={styles.Container}>
                <Userinfo/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        height:"100%",
        width:"100%",
        alignContent:'center',
    
    }
})