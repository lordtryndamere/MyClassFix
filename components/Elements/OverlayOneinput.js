import React,{Component} from 'react'
import {StyleSheet,View,Text} from 'react-native'
import {Overlay,Input,Button} from 'react-native-elements'

export default class OverlayOneinput extends Component{
    constructor(){
        super();
    }
    render(){
        return(
           <Overlay isVisible={true} overlayBackgroundColor="transparent"   overlayStyle={styles.overlaystyle} >
               <View style={styles.viewOverlay} >
                   <Input
                   placeholder="texto" 
                   containerStyle={styles.inputcontainer}
                   onChangeText={value=>console.log(value)}
                   value=""  />
                   <Button  
                    buttonStyle={styles.buttonStyle}
                   title="Actualizar"/>
               </View>
           </Overlay>
        )
    }
}


const styles = StyleSheet.create({
overlaystyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
},
viewOverlay:{
    width:"100%",
    backgroundColor:"#fff",
    padding:20,
    borderColor:"#00BEB1",
    borderBottomWidth:2,
    borderTopWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2

},
inputcontainer:{
    marginBottom:20
},
buttonStyle:{
    backgroundColor:"#00BEB1"
}
})