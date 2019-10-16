import React ,{PureComponent} from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'
import {Avatar} from 'react-native-elements'
import *as firebase from 'firebase'
export default class Perfil extends PureComponent{
    constructor(props){
        super(props)
        console.log(props)
    }
render(){
    var {name,lastname,key,foto} = this.props.navigation.state.params.Profile
    return(
        <View style={styles.ViewBody}>
            <View style={{justifyContent:'center',flexDirection:'row',alignContent:'center'}}>
            <Avatar
                rounded
                source={{
                    uri: foto
                }}
                size={120}
                // renderPlaceholderContent={<Image source={require('../assets/logo.png')} />}
                />
            </View>



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