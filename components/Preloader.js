import React ,{PureComponent} from 'react'
import { StyleSheet,View,ActivityIndicator,SafeAreaView, ImageBackground,Image} from 'react-native'
import {widthPercentageToDP  as ancho
    ,heightPercentageToDP  as    alto ,
    listenOrientationChange as op,
    removeOrientationListener as rp } from 'react-native-responsive-screen'

import firebaseConfig from '../utils/FireBase'
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig)

export default class extends PureComponent{




    render(){
        return(
            <ImageBackground style={styles.preloaderView2} source={require('../assets/chica.jpg')} >
            <SafeAreaView styles={styles.preloaderView} >
                <View style={styles.Image} >
                    <Image  source={require('../assets/logo.png')} />
                </View>
               <ActivityIndicator style={{alignContent:'center',alignItems:'center',justifyContent:'center',paddingTop:40}}   color="white" size="large" /> 
            </SafeAreaView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
        preloaderView:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },  
    preloaderView2:{    
        height:"100%",
        width:'100%'
    },
    Image:{
        paddingTop:200,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }
})