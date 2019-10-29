import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { Header, Icon } from 'react-native-elements'
import { Agenda, Calendar } from 'react-native-calendars'
import moment from 'moment'
import {
    widthPercentageToDP as ancho
    , heightPercentageToDP as alto,
    listenOrientationChange as op,
    removeOrientationListener as rp
} from 'react-native-responsive-screen'


export default class ReservasClase extends Component {
    constructor(props) {
        super(props)
        this.state ={
            ...props,
            calendar:[],
            key:this.props.navigation.state.params,

        }

    
        
        
    }


    loadCalendar =  (day)=>{
    //   ref.orderByChild('date').startAt(startTime).on()
    
        var stado = [];
        const {key} = this.state
        console.log(day);
        var startTime = moment(day.timestamp).utc().format('x')
        var endTime = moment(day.timestamp).utc().add(1, 'day').format('x')
        console.log(startTime)
        console.log(endTime)

         firebase.database().ref(`/teachers/${key}/newCalendar/week`).once('value',snapshot=>{
            fechas = snapshot.val()
            // console.log(fechas);
            
        
        }).then(()=>{
            for (const llave in fechas) {
                firebase.database().ref(`/teachers/${key}/newCalendar/week/${llave}`).orderByChild('date').startAt(parseInt(startTime)).once('value',snapshot=>{
                //    var date =  new Date(snapshot.val().date)
                //    console.log(date.toISOString());
                console.log(snapshot.val());
                
                   
               })
   
           }
        })

        
       

    }
    render() {
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
                            selectedDayTextColor:'#00BEB1',
                            textMonthFontWeight: 'bold',
                            textMonthFontSize: ancho('4.5%'),
                            textSectionTitleColor: '#00BEB1',
                            selectedDayBackgroundColor: '#00BEB1',
                            textDayFontWeight: '600',
                            textDayFontSize: ancho('3.6%'),
                            dayTextColor:'#9e9e9e',
                            textDayHeaderFontSize: ancho('3.4%'),
                            indicatorColor: '#00BEB1',
                            
                            // agendaDayNumColor: 'green',
                            // agendaTodayColor: '#00BEB1',
                            // agendaKnobColor: '#00BEB1'
                        }}
                        // agenda container style
                        style={{
                            marginTop:20,
                            borderBottomWidth: 2,
                            borderBottomColor: "#9e9e9e", shadowOpacity: 12, shadowColor: "#000", shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,
                            elevation: 24,



                        }}
                    />

                </View>
                <View style={styles.bottoncontent} >


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
        paddingBottom:60
    },
    centerContent: {
        height: '55%',
        width: '100%'
    },
    bottoncontent:{
        height:"40%",
        width:'100%'
    }
})