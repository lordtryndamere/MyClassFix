import  React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'



export default class ReservasClase extends Component{
    constructor(props){
        super(props)

    }
    render (){
        return(
        <View style={styles.container} >  
            <Text>  Vista reservarclase </Text>

        </View>

        )
    }
}



const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }    
})