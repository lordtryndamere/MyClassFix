import React,{Component} from 'react'
import {StyleSheet} from 'react-native'
import {Overlay,Input,Button,Icon} from 'react-native-elements'
import { View } from 'native-base';

export default class OverlayThreeinput extends Component{
    constructor(props){
        super(props);
        this.state={
            ...props
        }
        
    }
    onChangeinputOne = inputData =>{
        this.setState({
            InputValueOne:inputData
        })
    }

    onChangeinputTwo = inputData =>{
        this.setState({
            InputValueTwo:inputData
        })
    }

    onChangeinputThree = inputData =>{
        this.setState({
            InputValueThree:inputData
        })
    }





    
    Update=()=>{
        const NewValueOne =  this.state.InputValueOne;
        const NewValueTwo =  this.state.InputValueTwo;
        const NewValueThree =  this.state.InputValueThree;

        this.state.updateFunction(NewValueOne,NewValueTwo,NewValueThree)

        setTimeout(() => {
            this.setState({
                isVisibleOverlay:false
            });
        }, 4000);
        // this.setState({
        //     isVisibleOverlay:false
        // });
    };


    close = () => {
        this.setState({
            isVisibleOverlay:false
        });
        this.state.updateFunction(null);
    }
    render(){
        const {isVisibleOverlay,PlaceholderOne,PlaceholderTwo,PlaceholderThree,InputValueOne,InputValueTwo,InputValueThree,password} = this.state
        return(
           <Overlay isVisible={isVisibleOverlay} overlayBackgroundColor="transparent"   overlayStyle={styles.overlaystyle} >
               <View style={styles.overlaystyle}>
                   <Input
                   placeholder={PlaceholderOne}
                   containerStyle={styles.inputcontainer}
                   onChangeText={value =>this.onChangeinputOne(value)}
                   value={InputValueOne}
                   secureTextEntry={password} />
                    <Input
                   placeholder={PlaceholderTwo}
                   secureTextEntry={password}
                   containerStyle={styles.inputcontainer}
                   onChangeText={value =>this.onChangeinputTwo(value)}
                   value={InputValueTwo} />
                    <Input
                   placeholder={PlaceholderThree}
                   secureTextEntry={password}
                   containerStyle={styles.inputcontainer}
                   onChangeText={value =>this.onChangeinputThree(value)}
                   value={InputValueThree} />
                   <Button
                   onPress={()=>this.Update()}  
                    buttonStyle={styles.buttonStyle}
                   title="Cambiar contraseña"/>
                   <Icon  onPress={() => this.close()} size={30} color="#00BEB1"  containerStyle={styles.containerclose}  type="font-awesome" name="window-close" />
            </View>
           </Overlay>
        )
    }
}
    

const styles = StyleSheet.create({
    overlaystyle:{
    alignItems:'center',
    justifyContent:'center',
    // width:"70%",
    // height:"40%",
    // backgroundColor:"#fff",
    // padding:20,
    // borderColor:"#00BEB1",
    // borderBottomWidth:2,
    // borderTopWidth:2,
    // borderLeftWidth:2,
    // borderRightWidth:2

    
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
    right:-2,
    top:-4
}
})