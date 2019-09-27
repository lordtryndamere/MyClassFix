import React from 'react';
import  {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
          
},
container2: {
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
      
},
    inputContainer: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
        width:290,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',        
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        color:"#f0ffff",
        textShadowColor:'#75827d',
        position:'absolute'
      
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:260,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "white",
      height:35,
      width:180,
    },
    registerbutton: {
      backgroundColor: "white",
      marginTop:100,
      height:35,
      width:180,
     
    },
    loginText: {
      color: '#75827d',
      
    },
    text:{
        color:"#f0ffff",
        textShadowColor:'#75827d',
        fontSize:16
    },
    textregistry:{
  
      marginTop:150,
      color:"#f0ffff",
      textShadowColor:'#75827d',
      fontSize:16
    },
    ico:{
        marginBottom:40,
        color:"#f0ffff",
        
    },
    menuIcon:{
      zIndex:9,
      position:'absolute',
      top:40,
      left:20
  
    },
    estudiantebutton:{
      position:'relative',
      backgroundColor: "white",
      flexDirection:'row',
      marginRight:150,
      marginTop:100,
      height:35,
      width:130,


    },
    docentebutton:{
      position:'relative',
      flexDirection:'row',
      backgroundColor: "white",
      marginLeft:150,
      marginBottom:150,
      height:35,
      width:130,




    },
    buttonestudiante:{
      position:'relative',
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      marginTop:60
    },

    buttondocente:{
      position:'relative',
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      marginBottom:150
      

    },
    acomodar:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent:'center'
    }
    
  
  });

  export default styles;