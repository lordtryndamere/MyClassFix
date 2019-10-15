import React ,{PureComponent} from 'react'
import { StyleSheet,View,ActivityIndicator,SafeAreaView, ImageBackground} from 'react-native'


import firebaseConfig from '../utils/FireBase'
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig)

export default class extends PureComponent{




    render(){
        return(
            <ImageBackground style={styles.preloaderView2} source={require('../assets/chica.jpg')} >
            <SafeAreaView styles={styles.preloaderView} >
               <ActivityIndicator style={{alignContent:'center',alignItems:'center',justifyContent:'center',paddingTop:350}}   color="white" size="large" /> 
            </SafeAreaView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
        preloaderView:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },  
    preloaderView2:{    
        height:"100%",
        width:'100%'
    }
})