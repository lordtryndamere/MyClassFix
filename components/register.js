
import React, { Component,PureComponent } from 'react';
import firebase, { app } from 'firebase';
import styles from './/styles';
import {

  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  Image


} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import publicIP from 'react-native-public-ip';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions} from 'react-navigation'



export default class LoginView extends PureComponent {

  constructor(props) {
    super(props);
    this.onBackPress=this.onBackPress.bind(this)
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
      types:'student',
     



    }
    
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
 
  onBackPress = () => {
    // this.props.navigation.dispatch(NavigationActions.back())
    this.props.navigation.goBack()
  };

  HandleIp = ()=>  {
  publicIP()
  .then(ip => {
    console.log (ip);

  })
  .catch(error => {
    console.log(error);
  
  });
}
  
ñ

 HandleTypes = (value) => {
 if(value == 'student'){
   this.setState({types:'students'})

 }else{
   this.setState({type:'teachers'})
 }


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
  
      

        firebase.database().ref(this.state.types).update(usuario.uid   + '/personalData',{
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
          firebase.database().ref('/roleByUser').update(usuario.uid,{type:"student"})

            .then(()=>{
              this.props.navigation.navigate('Login')
            })
      
        
        })


    }
    
    typeTeacher = () =>{
    this.setState({typeteacher:'teachers'})
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
        firebase.database().ref(this.state.typeteacher).update(usuario.uid  + '/personalData',{
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
            .then(()=>{
              this.props.navigation.navigate('Login')
            })
          
    
        })
      
    }
    if (this.state.types=='students') { 
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

   
    
    }else if(this.state.typeteacher=='teachers')  {    
    
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
      
                <Image  style={{marginBottom:20}} source={require('../assets/LOGO2.png')}  />
                        {this.state.errorMessage &&
                      <Text style={{ color: 'red' }}> 
                        {this.state.errorMessage}
                      </Text>}
                    <View  style={styles.acomodar} >       
                            <TouchableHighlight    style={[styles.buttonestudiante, styles.estudiantebutton]}  onPress={()=> this.HandleTypes('student')} >
                            <Text style={styles.loginText}>ESTUDIANTE</Text>
                          </TouchableHighlight>
                          
                          <TouchableHighlight style={[styles.buttondocente, styles.docentebutton]}    onPress={()=> this.HandleTypes('teacher')} >
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

