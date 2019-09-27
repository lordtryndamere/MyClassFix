import React from 'react';
import  {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    
   
     
      
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        borderRadius:10,
        borderBottomWidth: 1,
        width:250,
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
        color: '#FFFFFF',
      
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
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "white",
    },
    registerbutton: {
      backgroundColor: "white",
      marginTop:100,
     
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
        color:"#f0ffff"
    },
    menuIcon:{
      zIndex:9,
      position:'absolute',
      top:40,
      left:20
    }
    
  
  });

  export default styles;