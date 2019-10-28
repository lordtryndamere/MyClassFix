import  React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Header,Icon} from 'react-native-elements'
import {Agenda,Calendar} from 'react-native-calendars'
import {widthPercentageToDP  as ancho
    ,heightPercentageToDP  as    alto ,
    listenOrientationChange as op,
    removeOrientationListener as rp } from 'react-native-responsive-screen'


export default class ReservasClase extends Component{
    constructor(props){
        super(props)

    }
    render (){
        return(
        <View style={styles.container} >  
           <View style={styles.top} >   
                    <Header
                          centerComponent={{ text: 'RESERVAR CLASE', style: { color: '#212121', fontSize:18,fontWeight:"bold"} }}
                          containerStyle={{backgroundColor:"#fff",borderBottomWidth:2,borderBottomColor:"#9e9e9e",shadowOpacity:12,shadowColor: "#000",      shadowOffset: {
                            width: 0,
                            height: 12,
                          },
                          shadowOpacity: 0.58,
                          shadowRadius: 16.00,
                          elevation: 24,
                         }}
                         leftComponent={<Icon  type={"material-community"}   name={"arrow-left"} color={"#212121"}  onPress={()=>this.props.navigation.goBack()} />}


                  />
                </View>
        </View>

        )
    }
}



const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    top:
{alignContent:'center',
    width:"100%",
    height:'5%'
}    
})