import React ,{Component} from 'react'
import moment from 'moment'
import {View,Text,StyleSheet} from 'react-native'
import { Header ,Icon } from 'react-native-elements'
import {
    widthPercentageToDP as ancho,
    heightPercentageToDP as alto,
    listenOrientationChange as op,
    removeOrientationListener as rp
} from 'react-native-responsive-screen'


export default class Reserva  extends Component{
    constructor(props){
        super(props)
       this.state={
        item: this.props.navigation.state.params.item,
        skill:this.props.navigation.state.params.skill,
        name:this.props.navigation.state.params.name,
        lastname:this.props.navigation.state.params.lastname,
       }
        
    }
    render(){
        const { item,skill,name,lastname} = this.state
        return(
            <View style={styles.container} >
                <View style={styles.containertop} >
                <Header
                        centerComponent={{ text: 'RESERVAR CLASE', style: { color: '#212121', fontSize: 18, fontWeight: "bold" } }}
                        containerStyle={{
                            backgroundColor: "#fff", borderBottomWidth: 2, borderBottomColor: "#9e9e9e", shadowOpacity: 12, shadowColor: "#000", shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,
                            elevation: 24,
                        }}
                        leftComponent={<Icon type={"material-community"} name={"arrow-left"} color={"#212121"} onPress={() => this.props.navigation.goBack()} />}
                    />
                </View>
                <View style={styles.center} >
                        <Text>  Estas  reservando  una clase para el {moment(item).format('D')}  de {moment(item).format('MMMM')}   a las {moment(item).format('LT')}
                                con el(a) Docente {name} {lastname} 

                              </Text>

                </View>    


            </View>
        )
    }
}

const styles  = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%"
    },
    containertop:{
        alignContent: 'center',
        width: '100%',
        height: '5%',
        paddingBottom: 60
    },
    center:{
        width:"100%",
        height:"20%",
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center'

    }
})