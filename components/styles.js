import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {widthPercentageToDP  as ancho
  ,heightPercentageToDP  as    alto ,
  listenOrientationChange as op,
  removeOrientationListener as rp } from 'react-native-responsive-screen'

import  {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      height:  "100%",
      width:"100%",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     
          
},
container2: {
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:40
      
},
    inputContainer: {
            borderRadius: 30,
            borderWidth: 2,
            borderColor: '#fff',
            width:ancho('80%'),
            height:alto('6%'),
            marginBottom:20,
            flexDirection: 'row',
            alignItems:'center',        
    },
    inputs:{
        height:alto('7%'),
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        color:"#f0ffff",
        textShadowColor:'#75827d',
        position:'relative'
      
    },
    inputs5:{
      height:45,
      marginLeft:16,
      color:"#0097A7",
      textShadowColor:'#0097A7',
      position:'relative',
    
  },


    inputContainer2: {
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#BDBDBD',
      width:290,
      height:45,
      flexDirection: 'row',
      alignItems:'center',          
},
inputContainer3: {
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#0097A7',
  width:240,
  height:38,  
          
},
inputs2:{
 
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  color:"#757575",
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
      height:alto('5%'),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:260,
      borderRadius:30,
    },
    
    loginButton: {
      backgroundColor: "white",
      height:alto('5%'),
      width:ancho('45%'),
    },
    registerbutton: {
      backgroundColor: "white",
      marginTop:15,
      height:alto('5%'),
      width:ancho('45%'),
     
    },
    loginText: {
      color: '#75827d',
      
    },
    text:{
        color:"#f0ffff",
        textShadowColor:'#75827d',
        fontSize:16,
        paddingLeft:20  
    },
    textload:{
      paddingTop:15,
      color:"#9E9E9E",
      textShadowColor:'#75827d',
      fontSize:ancho('4%')
  },
    text2:{
      color:"#f0ffff",
      textShadowColor:'#75827d',
      fontSize:16,
      marginTop:40
  },
  text3:{
    color:"#009688",
    textShadowColor:'#212121',
    fontSize:14,
    marginLeft:10,
   
   
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
    ico1:{
      marginTop:40,
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
      flexDirection:'row',
      position:'relative',
      backgroundColor: "white",
      height:35,
      width:130,


    },
    docentebutton:{
      flexDirection:'row',
      position:'relative',
      backgroundColor: "white",
      height:35,
      width:130,




    },
    buttonestudiante:{
      position:'relative',
      height:45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      width:50,
      marginRight:5
   
    },

    buttondocente:{
      position:'relative',
      height:45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      width:50,
      marginLeft:5

    

    },
    acomodar:{
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent:'center',
      display:'flex',
      width:100,
      marginBottom:40
      
    },
    registerbutton2:{
      backgroundColor: "white",
      marginBottom:80,
      height:35,
      width:180,
     
    },
    row:{
      flexDirection:'row',
      marginLeft:10,
      paddingVertical:15,
      
      
  
    },
    headerImage2:{
     marginTop:5,
      position:'relative',
      height:100,
      width:140
  
    },
    headerImage3:{
      height:alto('3%'),
      width:ancho('5%'),
      position:'relative'
  
    },
    header3:{
        
      alignItems:'center',
      justifyContent:'center',
      borderBottomColor:'#bdbdbd',
      borderBottomWidth:1,
      borderRightColor:'#bdbdbd',
      backgroundColor:'white',
      borderRightWidth:1,
      width:'50%'
 

      
  },
  header4:{
        
    alignItems:'center',
    justifyContent:'center',
    borderBottomColor:'#bdbdbd',
    borderRightWidth:1,
    borderRightColor:'#bdbdbd',
    backgroundColor:'white',
    width:'50%',
    


    
},
header5:{
        
  alignItems:'center',
  justifyContent:'center',
  borderBottomColor:'#bdbdbd',
  borderBottomWidth:1,
 
  backgroundColor:'white',

  width:'50%'



  
},
header6:{
  alignItems:'center',
  justifyContent:'center',
  borderBottomColor:'#bdbdbd',
 
 
  backgroundColor:'white',
  width:'50%'


  
},

 
rating:{
  borderColor:"#00BEB1",
  paddingVertical:10

},
contentRating:{
  alignContent:'flex-start',
  alignItems:'flex-start',
  // marginRight:ancho('38%')
},
iconhome:{
  height:alto('13%'),
  width:ancho('35.5%')
},
scene:{
  paddingTop:30,
  paddingLeft:20,
  paddingRight:20,
  alignContent:'center',
  justifyContent:'center',
  alignItems:'center',
  flex:1,
  width:"100%",
  height:"100%",


},
botton:{
  height:"80%",
  width:"100%"
},
top:{
  height:"20%",
  width:"100%",
  alignItems:'center',
  justifyContent:'center',
  alignContent:'center'
},
picker:{
  width: ancho("80%"),
  color:"#fff"
},
iconregister:{
  color:"#fff",
  backgroundColor:'#fff'
}

    
  
  });

  export default styles;