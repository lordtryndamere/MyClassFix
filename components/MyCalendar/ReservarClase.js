import React, { Component } from 'react'
import 'moment/locale/es'
import Toast from 'react-native-simple-toast';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Alert ,Image,FlatList} from 'react-native'
import * as firebase from 'firebase'
import { Header, Icon, ListItem,Card } from 'react-native-elements'
// import {  Calendar } from 'react-native-calendars'
import moment from 'moment'
import {
    widthPercentageToDP as ancho,
    heightPercentageToDP as alto,
    listenOrientationChange as op,
    removeOrientationListener as rp
} from 'react-native-responsive-screen'



var Data  = []
export default class ReservasClase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            ...props,
            isLoading:"",
            calendar: [],
            key: this.props.navigation.state.params.key,
            skill:this.props.navigation.state.params.sk,
            name:this.props.navigation.state.params.name,
            lastname:this.props.navigation.state.params.lastname,
            tipo:this.props.navigation.state.params.type,
            newSkill:this.props.navigation.state.params.newSkill,
            day:null,
            keycalendar:"",
            time:"",
            EndTime:""

        }

         
        
            


    }


    HandleReserva = (item,skill,name,lastname,tipo,newSkill,key,keycalendar,time)=>{
        const uid = firebase.auth().currentUser.uid

        firebase.database().ref(`/students/${uid}/coints`).once('value',snapshot=>{
            var data = snapshot.val()
            if (data  != null     ){
                if (data.numberClassPlant > 0  && data.numberClassPlant != null)
                {
                    this.props.navigation.navigate('Reserva',{item,skill,name,lastname,tipo,newSkill,key,keycalendar,time})
                }
                else{
                    Alert.alert('RESERVAR CLASE','Por favor ingresa desde un computador, y escoge el paquete que deseas comprar para continuar.')
                }
            }else{
                    Alert.alert('RESERVAR CLASE','Por favor ingresa desde un computador, y escoge el paquete que deseas comprar para continuar.')
            }

     
        })


    }

 
    loadCalendar = () => {

    
        const { key } = this.state
        var Dates = []
        var startTime = parseInt(moment().format('x'))
        
        

        
   
            firebase.database().ref(`/teachers/${key}/newCalendar/week`).orderByChild('date').startAt(startTime).on('value', snapshot => {

                fechas = snapshot.val()
    
                for (const llave in fechas) {
                    var kc = llave
                    firebase.database().ref(`/teachers/${key}/newCalendar/week/${llave}`).once('value', snapshot => {

                        if (snapshot.val().status != undefined && snapshot.val().status != null && snapshot.val().status == 1  ) {
                    
                            
                            var temp = snapshot.val().date
                            var date = moment(temp).format('DD-MM-YYYY HH:mm')
                            Dates.push(date)
                        }
    
                    })
                   
                    
                }
                var fechasFinal = []
                Dates.forEach(element => {
                    var substr = element.split(" ")
                    var index = fechasFinal.find(it => it == substr[0])
                    if (index != undefined) {
                        fechasFinal[index].push(substr[1])
                
                        
                    } else {
                        fechasFinal.push(substr[0])
                        fechasFinal[substr[0]] = []
                        fechasFinal[substr[0]].push(substr[1])
                       
                        
                    }
                });
        
                this.setState({EndTime:fechasFinal})

                
                this.setState({keycalendar:kc})

                
               
                if (Dates.length == 0 ) {
                    Toast.show('El profesor no a programado fechas para este dia ...')
                } else {
                    this.setState({ calendar: Dates });
                }
    
            })
        

    }

    componentDidMount  (){
        this.setState({isLoading:true})
        this.loadCalendar()

        
    }

    renderItem = ({item,index}) =>(
        

        <Card
    
        containerStyle={{
          padding: 0, borderRadius: 20, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
    
          elevation: 10,
      
        }}>
    
          <ListItem
    
            containerStyle={{
              borderRadius: 20, shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.55,
              shadowRadius: 14.78,
    
              elevation: 22,
              height: 105,
              elevation: 10,
            }}
        
     
          
            title={item[index]}
    
            titleStyle={{ color: 'black', fontWeight: 'bold',fontSize:ancho('3.8%') }}
            subtitle={item}
            bottomDivider
            chevron={
                <TouchableOpacity onPress={()=>this.HandleReserva(item,skill,name,lastname,tipo,newSkill,key,keycalendar,time)} style={[styles.buttonContainer, styles.reservarButton]} >
                <Text style={styles.reservastext}>RESERVAR</Text>
                </TouchableOpacity>}

  
          />
        </Card>
    

    )

    render() {
        const {skill,name,lastname,tipo,newSkill,key,keycalendar,time,calendar} = this.state

     
        
        
        
        return (
            <View style={styles.container} >
                <View style={styles.top} >
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
                <View style={styles.containertext} >  
                                        <Text style={styles.textclases} > Clases disponibles </Text>   
                </View>


                <View style={styles.bottoncontent}>
                
                {
            // this.state.isLoading
            // ?<View style={{ paddingTop: 120, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            //   <Image source={require('../../assets/spinner.gif')} style={{ height: alto('23%'), width: ancho('38%') }} />
            //   <Text style={styles.textload}>Cargando profesores ....</Text>
            // </View>
             <FlatList
              keyExtractor={(item, index) => 'key' + index}
              initialNumToRender={15}
              data={this.state.EndTime}
              renderItem={this.renderItem}
              get

            />

        }



                    
                    
                </View>




            </View>

        )
    }
}



{/* <ListItem
key={index}
style={{paddingLeft:20,paddingRight:20}}
title={item}
titleStyle={{color:"#757575",alignContent:'center',alignItems:'center',justifyContent:'center'}}
chevron={
<TouchableOpacity onPress={()=>this.HandleReserva(item,skill,name,lastname,tipo,newSkill,key,keycalendar,time)} style={[styles.buttonContainer, styles.reservarButton]} >
<Text style={styles.reservastext}>RESERVAR</Text>
</TouchableOpacity>}

bottomDivider

/> */}




const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    top: {
        alignContent: 'center',
        width: '100%',
        height: '6%',
     
    },  
    // centerContent: {
    //     height: '55%',
    //     width: '100%'
    // },
    bottoncontent: {
        height: "95%",
        width: '100%',
        paddingBottom:30,
        paddingTop:10
    },
    buttonContainer:{
        height:alto('5%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:260,
        borderRadius:30,
        borderColor:"#00BEB1"

    },
    reservarButton:{
        borderWidth:2,
        borderRadius:30,
        borderColor:"#00BEB1",
        backgroundColor: "transparent",
        height:alto('5%'),
        width:ancho('33%'),
    },
    reservastext:{
     color: '#00BEB1',
     fontWeight:"bold",
     fontSize:ancho("3.8%")

            
          
    },
    reservastext2:{
        color: '#00BEB1',
        fontWeight:"bold",
        fontSize:ancho("4.4%")
   
               
             
       },
    textclases:{
        fontWeight:"700",
        color:"#616161",
        fontSize:ancho("4.2%")
    },
    containertext:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:10

    },    textload:{
        paddingTop:15,
        color:"#9E9E9E",
        textShadowColor:'#75827d',
        fontSize:ancho('4%')
    },
})