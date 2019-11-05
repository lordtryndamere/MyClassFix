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
  DatePickerIOSComponent,



} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import publicIP from 'react-native-public-ip';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, ScrollView } from 'react-navigation'



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
      TypesDocument: ['Cedula ciudadania', 'Cedula Extranjeria', 'Pasaporte'],
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
      date: "",
      numerodocumento: "",
      ipCreation: ""




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










  typeStudent = (value) => {
    this.setState({ types: 'students' })
    this.HandleIp();


    var { name, email, lastname, password, repeatPassword, date, Phone, ipCreation } = this.state
    var d = moment().unix()



    firebase.database().ref('students').update(value.user.uid + '/personalData', {
      surname: lastname,
      email: email,
      name: name,
      age: date,
      tel: Phone,
      ipCreation: ipCreation,
      dateCreation: d

    }).then(() => {
      firebase.database().ref('/roleByUser').update(value.user.uid, { type: "student" })

        .then(() => {
          this.props.navigation.navigate('LoginView')
        })


    })


  }

  typeTeacher = (value) => {
    

    this.setState({ types: 'teachers' })
    // const user = firebase.auth().currentUser.uid
    var { name, email, lastname, password, repeatPassword, date, Phone, ipCreation, tipodocumentoescogido, numerodocumento, linkPhoto } = this.state

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
    firebase.database().ref('teachers').update(value.user.uid + '/personalData', {
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
    }).then(() => {
      firebase.database('/roleByUser').update(value.user.uid, { type: 'teacher' })
        .then(() => {
          this.props.navigation.navigate('Login')
        })


    })

  }



  HandleRegisterStudent = () => {
    this.setState({ types: 'students' })
    var { name, email, lastname, password, repeatPassword, date, Phone, ipCreation, tipodocumentoescogido, numerodocumento, linkPhoto, types } = this.state
    if (name, lastname, email, password, repeatPassword, date) {
      if (types == 'students') {
        if (Phone != "" && Phone.toString().length == 10) {
          if (password == repeatPassword) {

            firebase.auth().createUserWithEmailAndPassword(email.toLocaleLowerCase(), password)
              .then((value) => {
                console.log(value)
                this.typeStudent(value)

                this.sendEmailStudent(value.user.uid).then((res) => {
                  if (res.data.status == 202) {
                    this.setState({ errorMessage: 'SendEmailValidate' })
                  }
                }).catch((error) => {
                  this.setState({ errorMessage: 'ErrorServer' })
                })

              }).then(() => {

                Toast.show("Te has registrado exitosamente", 3000)

              })
            val.catch((err) => {
              Toast.show("Usuario no registrado", 3000)

            })
            // this.typeStudent()



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


  HandleRegisterTeacher = () => {
    var { name, email, lastname, password, repeatPassword, date, Phone, ipCreation, tipodocumentoescogido, numerodocumento, linkPhoto, types } = this.state
    this.setState({ types: 'teachers' })
    if (name.email, lastname, password, repeatPassword, date, Phone, tipodocumentoescogido) {


      if (types == 'teachers') {


        if (password == repeatPassword) {

          if (Phone != "" && Phone == null ? '' : Phone.toString().length == 10) {

            var val = firebase.auth().createUserWithEmailAndPassword(email, password);

            val.catch((err) => {

              this.setState({ errorMessage: 'Error validate' })

            })

            val.then((value) => {



              this.typeTeacher(value)

              this.sendEmailTeacher(value.user.uid).then((res) => {

                if (res.data.status == 202) {

                  this.errorMessage = "sendEmailValidate"

                }

                if (res.data.status != 202) {

                  this.errorMessage = "ErrorEmailValidate"

                }

              }).catch((error) => {

                this.errorMessage = "Server error"

              })

            }).then(() => {
              Toast.show("Te has registrado exitosamente", 2000)
            })

          } else {

            Toast.show("Numero de telefono incorrecto", 2000)

          }

        } else {

          Toast.show("Las contraseñas no coinciden", 1500)

        }
      }
    } else {
      Toast.show("Por favor rellena todos los campos", 1500)
    }
  }

  onValueChange2(value) {
    this.setState({
      tipodocumentoescogido: value
    });
    console.log(value);

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
              androidMode={"default"}
              placeHolderText="DD/MM/YYYY"
              textStyle={{ color: "#fff" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(date) => this.setState({ date })}
              disabled={false}
            />
          </View>
          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
            <TouchableOpacity style={[styles.buttonContainer, styles.registerbutton2]} onPress={() => this.HandleRegisterStudent()}>
              <Text style={styles.loginText}>REGISTRARME</Text>
            </TouchableOpacity>
          </View>


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
              keyboardType='number-pad'
              placeholder="N U M E R O  D O C U M E N T O"
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
            <TouchableOpacity style={[styles.buttonContainer, styles.registerbutton2]} onPress={() => this.HandleRegisterTeacher()}>
              <Text style={styles.loginText}>REGISTRARME</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )


  render() {







    return (


      <ImageBackground source={require('../assets/chica.jpg')} style={styles.container} >

        <View style={styles.container}>
          <View style={styles.top} >
            <Image style={{ height: "90%", width: "55%" }} source={require('../assets/PRUEBA-18.png')} />
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

