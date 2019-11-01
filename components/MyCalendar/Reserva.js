import React ,{Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Item,Picker} from 'native-base'
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
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
        key: this.props.navigation.state.params.key,
        item: this.props.navigation.state.params.item,
        skill:this.props.navigation.state.params.skill,
        name:this.props.navigation.state.params.name,
        lastname:this.props.navigation.state.params.lastname,
        tipo:this.props.navigation.state.params.tipo,
        keycalendar:this.props.navigation.state.params.keycalendar,
        selected2:undefined,
        text:"",
        dateClass: {
            descriptionClass: "",
            descriptionTeacher: "",
            skill: "Selecciona la asignatura",
            status: "closed",
            titleClass: "Nombre de la clase",
            idTeacher: "",
            idStudent: "",
            chat: {},
            attachments: {}
          }
     
       }
        
    }

    onValueChange2(value) {
        this.setState({
          selected2: value
        });
      }

      emailClass(param) {
        return axios.get(`https://www.myclassflix.com/mailer/webresources/api/reminder/${param}`);
      }
      AñadirClase() {
          const uidstudent  = firebase.auth().currentUser.uid
        const {dateClass,item,key,keycalendar} = this.state
         dateClass['startTime'] = item;
          dateClass['endTime'] = moment().unix(item).add(50, 'minutes').unix();
          dateClass['idTeacher'] = key
          dateClass['idStudent'] = uidstudent
          firebase.database().ref('classes/').push(
            dateClass
          ).then((value) => {
            firebase.database().ref('classes/').update('' + value.key, {
              key: value.key
            }).then(() => {
              // agregando nodo de notifications los usuarios
              // this.db.list('students/' + this._userService.uid + '/notifications').push({ idClass: value.key })
              // this.db.list('teachers/' + this._userService.vid + '/notifications').push({ idClass: value.key })
    
              // agregando clase a los usuarios
              firebase.database().ref('students/' + uidstudent + '/myClasses').push({ idClass: value.key })
              firebase.database().ref('teachers/' + key + '/myClasses').push({ idClass: value.key })
    
              //actualizar el estado del calendario
              firebase.database().ref(`teachers/${key}/newCalendar/week/${keycalendar}`).update({ status: 2 });
    
              this.emailClass(value.key);
    
              var coints
              this.db.database.ref('students/' + uidstudent + '/coints').once('value', data => {
                coints = data.val()
              }).then(() => {
                var valor = parseInt(coints["numberClassPlant"])
                if (valor > 0) {
                  var valorf = valor - 1;
                  firebase.database().ref('students/' + uidstudent + '/coints').update('/', { numberClassPlant: valorf })
                }
              })
            })
          })
        
      }



      LoadPicker (){
          const {skill} = this.state

          if(skill[0]['idiomas'] != undefined &&  skill[0]['idiomas'].length >0 )
          { return(
            skill[0]['idiomas'].map((item, index) => {
                return (<Picker.Item label={item} value={index} key={index}/>) 
            })
          )
          }


           if(skill[1]['musica'] != undefined &&  skill[1]['musica'].length >0 )
          { return(
            skill[1]['musica'].map((item, index) => {
                return (<Picker.Item label={item} value={index} key={index}/>) 
            })
          )
          }


           if(skill[2]['tecnologia'] != undefined &&  skill[2]['tecnologia'].length >0 )
          { return(
            skill[2]['tecnologia'].map((item, index) => {
                return (<Picker.Item label={item} value={index} key={index}/>) 
            })
          )
          }


           if(skill[3]['universidad'] != undefined &&  skill[3]['universidad'].length >0 )
          { return(
            skill[3]['universidad'].map((item, index) => {
                return (<Picker.Item label={item} value={index} key={index}/>) 
            })
          )
          }else if(skill[4]['secundaria'] != undefined &&  skill[4]['secundaria'].length >0 )
          { return(
            skill[4]['secundaria'].map((item, index) => {
                return (<Picker.Item label={item} value={index} key={index}/>) 
            })
          )
          }

           if(skill[5]['primaria'] != undefined &&  skill[5]['primaria'].length >0 )
          { return(
            skill[5]['primaria'].map((item, index) => {
                return (<Picker.Item label={item} value={index} key={index}/>) 
            })
          )
          }
          

           if(skill[6]['otros'] != undefined &&  skill[6]['otros'].length >0 )
          { return(
            skill[6]['otros'].map((item, index) => {
                return (<Picker.Item label={item} value={index} key={index}/>) 
            })
          )
          }




      }

 
 
    render(){
        const { item,skill,name,lastname,tipo} = this.state
        console.log(skill);
        

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
                        <Text  style={styles.text} >  Estas  reservando  una clase para  ({item})   
                       con el(a) Docente   {name} {lastname} </Text>      

                             
                </View>

                <View style={styles.bottonstyle}>
            
            <Item>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: ancho("80%") }}
                placeholder="asignaturas"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              > 

                {this.LoadPicker()}
                        
              </Picker>
            </Item>
            <View style={styles.textAreaContainer} >
                <TextInput
                   onChangeText={(text) => this.setState({text})}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                />
            </View>
         
                    
                    
            </View>
            <TouchableOpacity    style={[styles.TouchableOpacityStyle, styles.reservarclase]} >
          <Text style={styles.loginText}>RESERVAR CLASE</Text>
            </TouchableOpacity>    


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
        paddingLeft:20,
        paddingRight:20,
        width:"100%",
        height:"20%",
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center'

    },
    text:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        fontSize:ancho("4%"),
        fontWeight:"bold",
        color:"#424242"

        
    },
    bottonstyle:{
        paddingLeft:20,
        paddingRight:20,
        height:"75%",
        width:"100%"
    },
    TouchableOpacityStyle: {
        //Here is the trick
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
     //    right: 30,
         bottom:0,
     },  
     reservarclase:{
        resizeMode: 'contain',
        backgroundColor: "#00BEB1",
        height:ancho('12%'),
        width:"100%",
      },
      loginText:{
        color: 'white',
        fontWeight:"bold",
        fontSize:16
    
      },
      textAreaContainer:{
        borderColor: '#9e9e9e',
        borderWidth: 1,
        padding: 5
      },
      textArea:{
        height: alto("45%"),
        justifyContent: "flex-start"
      }
})