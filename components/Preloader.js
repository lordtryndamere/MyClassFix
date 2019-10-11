import React ,{PureComponent} from 'react'
import { StyleSheet,View,ActivityIndicator,SafeAreaView} from 'react-native'


import firebaseConfig from '../utils/FireBase'
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig)

export default class extends PureComponent{




    render(){
        return(
            <SafeAreaView styles={styles.preloaderView} >
               <ActivityIndicator  color="blue" size="large" /> 


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    preloaderView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center'
    }
})