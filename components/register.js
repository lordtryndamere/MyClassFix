import React, { Component,PureComponent } from 'react';
import firebase from 'firebase';
import styles from './/styles';
import {

  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import publicIP from 'react-native-public-ip';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      lastname :'',
      email   : '',
      Phone: '',
      password: '',
      repeatPassword:'',
      country:'',
      errorMessage:null,
      TypesDocument:'',
      age:'',
      document:'',
      city:'',
      linkPhoto:'',
      working :'',
      schoolname:'',
      address:'',
      ranking:'',
      resume:'',
      terminos:'',
      types:'',



    }
    
  }
  HandleIp = ()=>  {
  publicIP()
  .then(ip => {
    console.log (ip);

  })
  .catch(error => {
    console.log(error);
  
  });
}
  


 HandleTypes = (type) => {
  this.state.types =type

  this.state.terminos = false

  // if (type == "teachers") {

  //   this.acudiente = false

  // }
 }
 
  sendEmailStudent= (idStudent) => {

    return axios.get(`https://www.myclassflix.com/mailer/webresources/api/send/students/${idStudent}/verify`);

  }
  sendEmailTeacher = (idTeacher)=> {

    return axios.get(`https://www.myclassflix.com/mailer/webresources/api/send/teachers/${idTeacher}/verify`);

  }
  
 
  

  HandleRegister = () =>{
    typeStudent = () =>{
      var d = new Date();
      var usuario = firebase.auth().currentUser
      
        firebase.database(this.HandleTypes()).update(usuario.uid   + '/personalData',{
          name:this.state.name,
          surname:this.state.lastname,
          email:this.state.email,
          country:this.state.country,
          age:this.state.age,
          verifiedAccount:false,
          dataCreation : d.getTime(),
          ipCreation:this.HandleIp,
          tel:this.state.Phone
          
        }).then(()=>{
          firebase.database('/roleByUser').update(usuario.uid,{type:"student"})
          firebase.database(this.HandleTypes()+ '/'  +usuario.uid + '/personalData').push({hashLogin:'hashLogin'})
          .then((hash)=>{
            firebase.database(this.HandleTypes()+'/'+usuario.uid+'/personalData/').update(hash.key,{hashLogin:hash.key})
            // firebase.auth().signOut()
            .then(()=>{
              this.props.navigation.navigate('Login')
            })
          })
        
        })


    }
    
    typeTeacher = () =>{
      var usuario = firebase.auth().currentUser
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
        var c = new Date();
        firebase.database().update(usuario.uid  + '/personalData',{
          typeDocument :this.state.TypesDocument,
          document:this.state.document,
          tel:this.state.Phone,
          name:this.state.name,
          surname:this.state.lastname,
          email:this.state.email,
          verifiedAccount:false,
          progress: {

            approved: false,
            lenguage: false,
            recognition: false,
            resume: false,
            skills: false,
            student: false,
            video: false
          },
          country:this.state.country,
          city:this.state.city,
          linkPhoto:this.state.linkPhoto,
          working:this.state.working,
          schoolname:this.state.schoolname,
          address:this.state.address,
          ranking:this.state.ranking,
          resume:this.state.resume,
          dataCreation:c.getTime(),
          ipCreation:this.HandleIp()
        }).then(()=>{
          firebase.database('/roleByUser').update(usuario.uid,{type : 'teacher'})
          firebase.database(this.HandleTypes() + '/' + usuario.uid + '/personalData').push({ hashLogin: "hashLogin" })
          .then((hash) => {
            firebase.database(this.HandleTypes() + ' /' + usuario.uid + '/personalData/').update(hash.key,{hashLogin : hash.key})
            // firebase.auth().signOut()
            .then(()=>{
              this.props.navigation.navigate('Login')
            })
          })
    
        })
      
    }
    if (this.HandleTypes('students')) { 
      if (this.state.Phone != ""   && this.state.Phone.toString().length == 10 ){
        if ( this.state.password == this.state.repeatPassword){

          var val = firebase.auth().createUserWithEmailAndPassword(this.state.email.toLocaleLowerCase(),this.state.password);
            val.catch((err)=>{
              this.setState({errorMessage:"Algo Ocurrio, usuario no registrado"})

            })
          // this.typeStudent()
          var usuario = firebase.auth().currentUser
          this.sendEmailStudent(usuario.uid).then((res)=>{
            if (res.data.status==202){
              this.setState({errorMessage:'SendEmailValidate'})
            }
          }).catch((error)=>{
            this.setState({errorMessage:'ErrorServer'})
          })  

  
        }else{
          this.setState({errorMessage:"Las Contraseñas no coinciden"})
        }
      }else{
        this.setState({errorMessage:"Numero de telefono incorrecto"})
      }

   
    
    }else if(this.HandleTypes('teachers'))  {    
    
      if (this.document != "") {
  
        

          if (this.state.TypesDocument != "Tipo") {

            if (this.state.password == this.state.repeatpassword) {

              if (this.state.Phone != "" && this.state.Phone == null ? '' : this.state.Phone.toString().length == 10) {

                let val = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

                val.catch((err) => {

                  this.setState({errorMessage:'Error validate'})

                })

                val.then(() => {

   

                  // this.typeTeacher()

                  var usuario = firebase.auth().currentUser
                  this.sendEmailTeacher(usuario.uid).then((res) => {

                    if (res.data.status == 202) {

                      this.errorMessage="sendEmailValidate"

                    }

                    if (res.data.status != 202) {

                      this.errorMessage="ErrorEmailValidate"

                    }

                  }).catch((error) => {

                    this.errorMessage="Server error"

                  })

                })

              } else {

                this.errorMessage="Error Telefono"

              }

            } else {

              this.errorMessage="Error contraseña"

            }

          } else {

            this.errorMessage="Error typedocument"
          }
      } 
  
}
}
  render() {
    return (
          

            <ImageBackground source={require('../assets/chica.jpg')}  style={styles.container} >
            <KeyboardAvoidingView style={styles.container2}  behavior='padding' enabled >
           
                <View style={styles.container}>
      
                        <Icon size={80}  style={styles.ico1} >perm_identity</Icon>
                        {this.state.errorMessage &&
                      <Text style={{ color: 'red' }}> 
                        {this.state.errorMessage}
                      </Text>}
                    <View  style={styles.acomodar} >       
                            <TouchableHighlight    style={[styles.buttonestudiante, styles.estudiantebutton]}  onPress={()=> this.HandleTypes('students')} >
                            <Text style={styles.loginText}>ESTUDIANTE</Text>
                          </TouchableHighlight>
                          
                          <TouchableHighlight style={[styles.buttondocente, styles.docentebutton]}  onPress={()=> this.HandleTypes('teachers')} >
                            <Text style={styles.loginText}>DOCENTE</Text>
                          </TouchableHighlight>
                    </View>
          
              <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
              placeholder="Nombres"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}/>
        </View>
        
        <View style={styles.inputContainer}>
         
          <TextInput style={styles.inputs}
              placeholder="Apellidos"
              underlineColorAndroid='transparent'
              onChangeText={(lastname) => this.setState({lastname})}/>
        </View>
        <View style={styles.inputContainer}>

        <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
         
         <TextInput style={styles.inputs}
             keyboardType='number-pad'
             placeholder="Celular"
             underlineColorAndroid='transparent'
             onChangeText={(Phone) => this.setState({Phone})}/>
       </View>

        <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputContainer}>

        <TextInput style={styles.inputs}
            placeholder="Repetir contraseña"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(repeatPassword) => this.setState({repeatPassword})}/>
        </View>
        <View style={styles.inputContainer}>

        <TextInput style={styles.inputs}
            placeholder="Pais"
            underlineColorAndroid='transparent'
            onChangeText={(country) => this.setState({country})}/>
        </View>

   

        <TouchableOpacity style={[styles.buttonContainer, styles.registerbutton2]} onPress={() => this.HandleRegister()}>
          <Text style={styles.loginText}>REGISTRARME</Text>
        </TouchableOpacity>
                          
              </View>
                  
      </KeyboardAvoidingView>
          </ImageBackground>
      

    );
  }
}

