import {
  widthPercentageToDP as ancho
  , heightPercentageToDP as alto,
  listenOrientationChange as op,
  removeOrientationListener as rp
} from 'react-native-responsive-screen'
import { DatePicker, Picker } from 'native-base'
import moment from 'moment'
import Toast from 'react-native-simple-toast';
import React, { Component, PureComponent } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import * as firebase from 'firebase'
import styles from './/styles';
import {

  Text,
  View,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  ActivityIndicator,




} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import publicIP from 'react-native-public-ip';
import axios from 'axios';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { NavigationActions, ScrollView } from 'react-navigation'

const  ind =
<View> <ActivityIndicator size="large" color="white" />  </View>



export default class LoginView extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      student: "students",
      teacher: "teachers",
      tipodocumentoescogido: undefined,
      name: '',
      lastname: '',
      email: '',
      Phone: '',
      password: '',
      repeatPassword: '',
      country: '',
      errorMessage: null,
      Loading:null,
      TypesDocument: ['Cedula Extranjeria', 'Cedula ciudadania', 'Pasaporte'],
      age: '',
      city: '',
      linkPhoto: '',
      working: '',
      schoolname: '',
      address: '',
      ranking: '',
      resume: '',
      terminos: '',
      types: '',
      routes: [
        { key: 'first', title: "ESTUDIANTE" },
        { key: 'second', title: "PROFESOR" }
      ],
      index: 0,
      fecha: "",
      numerodocumento: "",
      ipCreation: "",
      parent:{
        document:"",
        email:"",
        name:"",
        Phone:"",
        tipodocumentoescogido:""
 
      },
      parentc:false
    



    }

  }








  HandleIp = () => {
    publicIP()
      .then(ip => {
        return this.setState({ ipCreation: ip })

      })
      .catch(error => {
        console.log(error);

      });
  }



  HandleTypes = (value) => {
    if (value == 'student') {
      this.setState({ types: 'students' })

    } else {
      this.setState({ type: 'teachers' })
    }


  }

  sendEmailStudent = (idStudent) => {

    return axios.get(`https://www.myclassflix.com/mailer/webresources/api/send/students/${idStudent}/verify`);

  }
  sendEmailTeacher = (idTeacher) => {

    return axios.get(`https://www.myclassflix.com/mailer/webresources/api/send/teachers/${idTeacher}/verify`);

  }










  typeStudent =   async  (value) => {
    this.ageStudent()
    this.setState({ types: 'students' })
    this.HandleIp();


    var { name, email, lastname, password, repeatPassword, fecha, Phone, ipCreation } = this.state
    var d = moment().unix()



     await firebase.database().ref(`/students/${value.user.uid}/personalData`).update({
      surname: lastname,
      email: email,
      name: name,
      age: moment(fecha).format('YYYY-MM-DD'),
      tel: Phone,
      ipCreation: ipCreation,
      dateCreation: d

    })

     await  firebase.database().ref(`/roleByUser/${value.user.uid}`).update({ type: "student" })
     setTimeout(() => {
      this.props.navigation.goBack()
     }, 3000);
     
   
  
   

  


  }

  typeTeacher = async (value) => {
    

    this.setState({ types: 'teachers' })
    // const user = firebase.auth().currentUser.uid
    var { name, email, lastname, password, repeatPassword, fecha, Phone, ipCreation, tipodocumentoescogido, numerodocumento, linkPhoto } = this.state

    var branch = {
      myStudies: {
        basicStudies: {
          0: {
            date: 0,
            description: "",
            state: "",
            title: "",
            uninersity: ""
          }

        },

        languages: {
          0: {
            date: "",
            language: "",
            level: "",
          }
        },
        recognition: {
          0: {
            date: "",
            description: "",
            from: ""
          }
        },
        skills: {
          0: {
            level: "",
            type: ""
          }
        }
      }
    }
    //INSERT DATES
    var c = moment().unix()
    await firebase.database().ref(`/teachers/${value.user.uid}/personalData`).update({
      typeDocument: tipodocumentoescogido,
      document: numerodocumento,
      tel: Phone,
      name: name,
      surname: lastname,
      email: email,
      verifiedAccount: false,
      progress: {

        approved: false,
        lenguage: false,
        recognition: false,
        resume: false,
        skills: false,
        student: false,
        video: false
      },


      linkPhoto: linkPhoto,
      working: "",
      schoolname: "",
      address: "",
      ranking: "",
      resume: "",
      dataCreation: c,
      ipCreation: ipCreation
    })

       await firebase.database().ref(`/roleByUser/${value.user.uid}`).update({ type: 'teacher' })
 
       setTimeout(() => {
        this.props.navigation.goBack()
       }, 3000);
     

        
 
      
   

  }



  HandleRegisterStudent =  async () => {
    this.setState({ types: 'students' })
    var { name, email, lastname, password, repeatPassword, fecha, Phone, ipCreation, tipodocumentoescogido, numerodocumento, linkPhoto, types } = this.state
    if (name, lastname, email, password, repeatPassword, fecha) {
      if (types == 'students') {
        if (Phone != "" && Phone.toString().length == 10) {
          if (password == repeatPassword) {

          await  firebase.auth().createUserWithEmailAndPassword(email.toLocaleLowerCase(), password)
              .then( async (value) => {
                this.setState({Loading:ind})
                this.typeStudent(value)
                 await this.sendEmailStudent(value.user.uid).then((res) => {
                  if (res.data.status == 202) {
                    Toast.show("Se ah enviado un correo de verificacion para confirmar si eres tu",2000)
                  }
                }).catch((error) => {
                  this.setState({ errorMessage: 'ErrorServer' })
                })

              }).then(() => {

                Toast.show("Te has registrado exitosamente", 3000)

              })
              //   .catch((err) => {
              //   Toast.show("Usuario no registrado, por favor verifica todos los campos", 3000)

              // })
    



          } else {
            Toast.show("Las contraseñas no coinciden", 2000)
          }
        } else {
            Toast.show("Numero de telefono incorrecto", 2000)
        }



      }
    } else {
      Toast.show("Por favor rellena todos los campos", 2000)
    }

  }


  HandleRegisterTeacher =  async () => {
    this.setState({ types: 'teachers' })
    var { name, email, lastname, password, repeatPassword, fecha, Phone, ipCreation, tipodocumentoescogido, numerodocumento, linkPhoto, types } = this.state
    if (name, lastname, email, password, repeatPassword, fecha,numerodocumento,tipodocumentoescogido) {
      if (types == 'teachers') {
        if (Phone != "" && Phone.toString().length == 10) {
          if (password == repeatPassword) {

          await  firebase.auth().createUserWithEmailAndPassword(email.toLocaleLowerCase(), password)
              .then( async (value) => {
                this.setState({Loading:ind})
                this.typeTeacher(value)
               await this.sendEmailTeacher(value.user.uid).then((res) => {
                if (res.data.status == 202) {
                  Toast.show("Se ah enviado un correo de verificacion para confirmar si eres tu",2000)
                }
              }).catch((error) => {
                this.setState({ errorMessage: 'ErrorServer' })
              })
              }).then(() => {

                Toast.show("Te has registrado exitosamente", 3000)

              })
              //   .catch((err) => {
              //   Toast.show("Usuario no registrado, por favor verifica todos los campos", 3000)

              // })
    



          } else {
            Toast.show("Las contraseñas no coinciden", 2000)
          }
        } else {
            Toast.show("Numero de telefono incorrecto", 2000)
        }



      }
    } else {
      Toast.show("Por favor rellena todos los campos", 2000)
    }
  }

 



  onValueChange2(value) {
    this.setState({
      tipodocumentoescogido: value,
      parentc:true
    });
    console.log(value);

  }




  ageStudent() {
    var {fecha,parentc} = this.state
                
    var yearStudent= moment(fecha).get('year')
    var anioActual = moment().get('year')

 
     // fecha del sistema
     var fechaActual = new Date();
     var diaActual = fechaActual.getDate();
     var mesActual = (fechaActual.getMonth() + 1);
     var anioActual = fechaActual.getFullYear();
    if (parentc) {
     if (anioActual - parseInt(yearStudent) < 18) {
        return( <View>
          <View style={styles.inputContainer}>
          <Picker
          mode="dialog"
          iosIcon={<Icon name="arrow-down" style={styles.iconregister} />}
          style={styles.picker}
          placeholder="asignaturas"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.selected2}
          onValueChange={this.onValueChange2.bind(this)}
        >
    
          {this.state.TypesDocument.map((item, index) => {
            return (
              <Picker.Item label={item} value={item} key={index} />
            )
          })}
    
        </Picker>
        </View>
    
        <View style={styles.inputContainer}>
    
              <TextInput style={styles.inputs}
                placeholder="N u m e r o  d o c u m e n t o  a c u d i e n t e"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({ email })} />
        </View>
          
        <View style={styles.inputContainer}>
    
      <TextInput style={styles.inputs}
        placeholder="N o m b r e  a c u d i e n t e"
        underlineColorAndroid='transparent'
        onChangeText={(email) => this.setState({ email })} />
      </View>
      <View style={styles.inputContainer}>
    
      <TextInput style={styles.inputs}
        placeholder="N u m e r o  d e  c e l u l a r   a c u d i e n t e"
        keyboardType="number-pad"
        underlineColorAndroid='transparent'
        onChangeText={(email) => this.setState({ email })} />
      </View>
    
      <View style={styles.inputContainer}>
    
    <TextInput style={styles.inputs}
      placeholder="C o r r e o   e l e c t r o n i c o  a c u d i e n t e "
      underlineColorAndroid='transparent'
      onChangeText={(email) => this.setState({ email })} />
    </View>
    
        </View>)
       
     }else{
       this.setState({parent:false})
       
     }
    }else{
      this.setState({parentc:false})
    } 
    }

  firstRoute = () => (

    <View style={[styles.scene]} >



      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior="padding" >
        <ScrollView>

          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="N o m b r e s"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({ name })} />
          </View>

          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="A p e l l i d o s"
              underlineColorAndroid='transparent'
              onChangeText={(lastname) => this.setState({ lastname })} />
          </View>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="C o r r e o  e l e c t r o n i c o"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
          </View>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              keyboardType='number-pad'
              placeholder=" C e l u l a r"
              underlineColorAndroid='transparent'
              onChangeText={(Phone) => this.setState({ Phone })} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="C o n t r a s e ñ a"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="R e p e t i r  c o n t r a s e ñ a"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(repeatPassword) => this.setState({ repeatPassword })} />
          </View>
          <View style={styles.inputContainer}>

            <DatePicker
              defaultDate={new Date}
              locale={"es"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"calendar"}
              placeHolderText="DD/MM/YYYY"
              textStyle={{ color: "#fff" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(date) => this.setState({fecha:date })}
              disabled={false}
            />
          </View>
        {this.state.parentc
          ?this.ageStudent()
          :console.log("no es true")
          }

        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
            <TouchableNativeFeedback style={[styles.buttonContainer, styles.registerbutton2]} onPress={() => this.HandleRegisterStudent()}>
              <Text style={styles.loginText}>REGISTRARME</Text>
            </TouchableNativeFeedback>
          </View>
            
              {this.state.Loading}
              

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )




  secondRoute = () => (


    <View style={[styles.scene]} >


      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior="padding" >
        <ScrollView>

          <View style={styles.inputContainer}>

            <Picker
              mode="dialog"
              iosIcon={<Icon name="add-circle"   style={styles.iconregister} />}
              style={styles.picker}
              placeholder="asignaturas"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >

              {this.state.TypesDocument.map((item, index) => {
                return (
                  <Picker.Item label={item} value={item} key={index} />
                )
              })}

            </Picker>

          </View>

          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              keyboardType='number-pad'
              placeholder="N u m e r o  d o c u m e n t o"
              underlineColorAndroid='transparent'
              onChangeText={(numerodocumento) => this.setState({ numerodocumento })} />
          </View>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="N o m b r e s"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({ name })} />
          </View>

          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="A p e l l i d o s"
              underlineColorAndroid='transparent'
              onChangeText={(lastname) => this.setState({ lastname })} />
          </View>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="C o r r e o  e l e c t r o n i c o"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })} />
          </View>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              keyboardType='number-pad'
              placeholder=" C e l u l a r"
              underlineColorAndroid='transparent'
              onChangeText={(Phone) => this.setState({ Phone })} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="C o n t r a s e ñ a"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="R e p e t i r  c o n t r a s e ñ a"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(repeatPassword) => this.setState({ repeatPassword })} />
          </View>
      
          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
            <TouchableNativeFeedback  style={[styles.buttonContainer, styles.registerbutton2]} onPress={() => this.HandleRegisterTeacher()}>
              <Text style={styles.loginText}>REGISTRARME</Text>
            </TouchableNativeFeedback> 
          </View>
             
              {this.state.Loading}
              
               
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )


  render() {







    return (


      <ImageBackground source={require('../assets/chica.jpg')} style={styles.container} >

        <View style={styles.container}>
          <View style={styles.top} >
            <Image style={{ height: "90%", width: "57%" }} source={require('../assets/PRUEBA-18.png')} />
            {this.state.errorMessage &&
              <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
              </Text>}
          </View>

          <View style={styles.botton} >

            <TabView

              renderTabBar={props =>
                <TabBar
                  {...props}
                  getLabelText={({ route }) => route.title}
                  activeColor={"#bdbdbd"}
                  inactiveColor={"#212121"}
                  contentContainerStyle={styles.TabView}

                  indicatorStyle={{ backgroundColor: '#fff' }}
                  style={{ backgroundColor: 'transparent' }}

                />}

              style={{ backgroundColor: "transparent", justifyContent: 'center', alignContent: 'center' }}
              navigationState={this.state}
              renderScene={SceneMap({
                first: this.firstRoute,
                second: this.secondRoute,
              })}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
            />


          </View>





        </View>

      </ImageBackground>


    );
  }
}

