import React ,{PureComponent} from 'react'
import {StyleSheet,View,Text} from 'react-native'

export default class Perfil extends PureComponent{
    constructor(props){
        super(props)
        console.log(props)
    }
render(){
    var {name,lastname} = this.props.navigation.state.params.Profile
    return(
        <View style={styles.ViewBody}>
        <Text>Visitando Perfil de s {name}{lastname} </Text>

        </View>
    )
}  

}
const styles=StyleSheet.create({
    ViewBody:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    }
})