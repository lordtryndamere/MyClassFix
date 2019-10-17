import React,{Component} from 'react'
import {StyleSheet,View} from 'react-native'
import {Overlay,Input,Button,Icon} from 'react-native-elements'

export default class OverlayOneinput extends Component{
    constructor(props){
        super(props);
        this.state={
            ...props
        }
        
    }
    onChangeinput = inputData =>{
        this.setState({
            inputValue:inputData
        })
    }
    Update=()=>{
        const newValue = this.state.inputValue;
        this.state.updateFunction(newValue)
        this.setState({
            isVisibleOverlay:false
        });
    };


    close = () => {
        this.setState({
            isVisibleOverlay:false
        });
        this.state.updateFunction(null);
    }
    render(){
        const {isVisibleOverlay,Placeholder,inputValue} = this.state
        return(
           <Overlay isVisible={isVisibleOverlay} overlayBackgroundColor="transparent"   overlayStyle={styles.overlaystyle} >
               <View style={styles.viewOverlay} >
                   <Input
                   placeholder={Placeholder}
                   containerStyle={styles.inputcontainer}
                   onChangeText={value=>this.onChangeinput(value)}
                   value={inputValue} />
                   <Button
                   onPress={()=>this.Update()}  
                    buttonStyle={styles.buttonStyle}
                   title="Actualizar"/>
                   <Icon  onPress={() => this.close()} size={30}  containerStyle={styles.containerclose}  type="material-community" name="close-circle-outline" />
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
},
containerclose:{
    position:"absolute",
    right:-16,
    top:-16
}
})