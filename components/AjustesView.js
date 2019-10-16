import React,{PureComponent} from 'react'
import {View,Text,StyleSheet, SafeAreaView} from 'react-native'
import Userinfo from './Userinfo'

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
        alignContent:'center',
    
    }
})