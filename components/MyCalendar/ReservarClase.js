import React, { Component } from 'react'
import Toast from 'react-native-simple-toast';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Alert } from 'react-native'
import * as firebase from 'firebase'
import { Header, Icon, ListItem } from 'react-native-elements'
import {  Calendar } from 'react-native-calendars'
import moment from 'moment'
import {
    widthPercentageToDP as ancho,
    heightPercentageToDP as alto,
    listenOrientationChange as op,
    removeOrientationListener as rp
} from 'react-native-responsive-screen'




export default class ReservasClase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            ...props,
            calendar: [],
            key: this.props.navigation.state.params.key,
            skill:this.props.navigation.state.params.sk,
            name:this.props.navigation.state.params.name,
            lastname:this.props.navigation.state.params.lastname,
            tipo:this.props.navigation.state.params.type,
            newSkill:this.props.navigation.state.params.newSkill,
            day:null,
            keycalendar:"",
            time:""

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

 
    loadCalendar = (day) => {

        this.setState({day:day})
    
        const { key } = this.state
        var Dates = []
        var startTime = parseInt(moment(day.dateString).format('x'))
        var endTime = parseInt(moment(day.dateString).add(1, 'days').format('x'))
         this.setState({time:day.dateString})   
        
        

        

        if(  moment(day.dateString).format('YYYY-MM-DD') >=  moment().format('YYYY-MM-DD') )
        {   
            firebase.database().ref(`/teachers/${key}/newCalendar/week`).orderByChild('date').startAt(startTime).endAt(endTime).on('value', snapshot => {

                fechas = snapshot.val()
    
                for (const llave in fechas) {
                    var kc = llave
                    firebase.database().ref(`/teachers/${key}/newCalendar/week/${llave}`).once('value', snapshot => {

                        if (snapshot.val().status != undefined && snapshot.val().status != null && snapshot.val().status == 1  ) {
                            var date = moment(snapshot.val().date).format('YYYY/MM/DD - LT')
                            Dates.push(date)
                        }
    
                    })
                   
                    
                }
                this.setState({keycalendar:kc})

                
               
                if (Dates.length == 0 ) {
                    Toast.show('El profesor no a programado fechas para este dia ...')
                } else {
                    this.setState({ calendar: Dates });
                }
    
            })
        }
        else {
            Toast.show('No se pueden reservar clases con fechas anteriores a la actual',5000)

    }
    }


    render() {
        const {day,skill,name,lastname,tipo,newSkill,key,keycalendar,time} = this.state

     
        
        
        
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

                <View style={styles.centerContent}>
                    <Calendar
                        // the list of items that have to be displayed in agenda. If you want to render item as empty date
                        // the value of date key kas to be an empty array []. If there exists no value for date key it is
                        // considered that the date in question is not yet loaded
                        // items={{
                        //     '2019-10-22': [{ text: 'item 1 - any js object' }],
                        //     '2019-10-23': [{ text: 'item 2 - any js object' }],
                        //     '2019-10-24': [],
                        //     '2019-10-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }]
                        // }}
                        // callback that gets called when items for a certain month should be loaded (month became visible)
                        loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                        // callback that fires when the calendar is opened or closed
                        onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                        // callback that gets called on day press
                        onDayPress={(day) => { this.loadCalendar(day) }}
                        // callback that gets called when day changes while scrolling agenda list
                        onDayChange={(day) => { console.log('day changed') }}
                        // initially selected day

                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={'2050-05-30'}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={50}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={50}
                        // specify how each item should be rendered in agenda
                        // renderItem={(item, firstItemInDay) => {return (<View />);}}
                        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                        // renderDay={(day, item) => {return (<View />);}}
                        // specify how empty date content with no items should be rendered
                        // renderEmptyDate={() => {return (<View />);}}
                        // specify how agenda knob should look like
                        // renderKnob={() => {return (<View />);}}
                        // specify what should be rendered instead of ActivityIndicator
                        // renderEmptyData = {() => {return (<View />);}}
                        // specify your item comparison function for increased performance
                        rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                        // Hide knob button. Default = false
                        hideKnob={false}
                        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                        markedDates={{
                            '2012-05-16': { selected: true, marked: true },
                            '2012-05-17': { marked: true },
                            '2012-05-18': { disabled: true }
                        }}
                        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                        onRefresh={() => console.log('refreshing...')}
                        // Set this true while waiting for new data from a refresh
                        refreshing={false}
                        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                        refreshControl={null}
                        // agenda theme
                        theme={{
                            monthTextColor: '#00BEB1',
                            selectedDayTextColor: '#00BEB1',
                            textMonthFontWeight: 'bold',
                            textMonthFontSize: ancho('4.5%'),
                            textSectionTitleColor: '#00BEB1',
                            selectedDayBackgroundColor: '#00BEB1',
                            textDayFontWeight: '600',
                            textDayFontSize: ancho('3.6%'),
                            dayTextColor: '#9e9e9e',
                            textDayHeaderFontSize: ancho('3.4%'),
                            todayTextColor:'#00BEB1',
                            arrowColor:'#00BEB1',
                            textDisabledColor: '#d9e1e8',
                            selectedDotColor: '#00BEB1',
                            

                            

                    
                        }}
                       
                        style={{
                            marginTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: "#9e9e9e", shadowOpacity: 12, shadowColor: "#000", shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.37,
                            shadowRadius: 7.49,
                            elevation: 5,



                        }}
                    />

                </View>
                <View style={styles.bottoncontent}>
                    

                        {(() => {
                            if (this.state.calendar.length >= 1 && this.state.calendar != undefined) {
                                return (<View >
                                    <View style={styles.containertext} >  
                                        <Text style={styles.reservastext2} > { moment(day.dateString).format('MMMM')} {moment(day.dateString).format('D')}  </Text>
                                        <Text style={styles.textclases} > Clases disponibles </Text>   
                                    </View>
                                  
                                    <ScrollView>
                                    {this.state.calendar.map((item) => (

                                        
                                        <ListItem
                                        style={{paddingLeft:20,paddingRight:20}}
                                        containerStyle={{borderBottomWidth:1,borderBottomColor:"#9e9e9e",paddingLeft:5}}
                                            title={item}
                                            titleStyle={{color:"#757575"}}
                                            chevron={
                                            <TouchableOpacity onPress={()=>this.HandleReserva(item,skill,name,lastname,tipo,newSkill,key,keycalendar,time)} style={[styles.buttonContainer, styles.reservarButton]} >
                                            <Text style={styles.reservastext}>RESERVAR</Text>
                                            </TouchableOpacity>}
                                            
                                            bottomDivider
                                            

                                        />
                                    
                                    ))}
                                    </ScrollView>
                                    </View>
                                )
                            }
                        })()}
                    

                </View>




            </View>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    top: {
        alignContent: 'center',
        width: '100%',
        height: '5%',
        paddingBottom: 60
    },  
    centerContent: {
        height: '55%',
        width: '100%'
    },
    bottoncontent: {
        height: "40%",
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

    }
})