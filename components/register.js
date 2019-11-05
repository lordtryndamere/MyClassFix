import {widthPercentageToDP  as ancho
  ,heightPercentageToDP  as    alto ,
  listenOrientationChange as op,
  removeOrientationListener as rp } from 'react-native-responsive-screen'
import {DatePicker} from 'native-base'
import React, { Component,PureComponent } from 'react';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view'
import firebase, { app } from 'firebase';
import styles from './/styles';
import {

  Text,
  View,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  Picker


} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import publicIP from 'react-native-public-ip';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, ScrollView} from 'react-navigation'



export default class LoginView extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      tipodocumentoescogido:undefined,
      name:'',
      lastname :'',
      email   : '',
      Phone: '',
      password: '',
      repeatPassword:'',
      country:'',
      errorMessage:null,
      TypesDocument:"",
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
      routes:[
        {key:'first',title:"ESTUDIANTE"},
        {key:'second',title:"PROFESOR"}
    ],
    index:0,
    date:"",
    numerodocumento:""
     



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

onValueChange2(value) {
  this.setState({
    tipodocumentoescogido: value
  });
  console.log(value);
  
}

 firstRoute = () => (

  <View style={[styles.scene]} >
  <KeyboardAvoidingView    keyboardVerticalOffset={60}   behavior="padding" >
         <ScrollView>
         
         <View style={styles.inputContainer}>
  
  <TextInput style={styles.inputs}
      placeholder="N o m b r e s"
      underlineColorAndroid='transparent'
      onChangeText={(name) => this.setState({name})}/>
  </View>
  
  <View style={styles.inputContainer}>
  
  <TextInput style={styles.inputs}
      placeholder="A p e l l i d o s"
      underlineColorAndroid='transparent'
      onChangeText={(lastname) => this.setState({lastname})}/>
  </View>
  <View style={styles.inputContainer}>
  
  <TextInput style={styles.inputs}
    placeholder="C o r r e o  e l e c t r o n i c o"
    keyboardType="email-address"
    underlineColorAndroid='transparent'
    onChangeText={(email) => this.setState({email})}/>
  </View>
  <View style={styles.inputContainer}>
  
  <TextInput style={styles.inputs}
     keyboardType='number-pad'
     placeholder=" C e l u l a r"
     underlineColorAndroid='transparent'
     onChangeText={(Phone) => this.setState({Phone})}/>
  </View>
  
  <View style={styles.inputContainer}>
  <TextInput style={styles.inputs}
    placeholder="C o n t r a s e ñ a"
    secureTextEntry={true}
    underlineColorAndroid='transparent'
    onChangeText={(password) => this.setState({password})}/>
  </View>
  <View style={styles.inputContainer}>
  
  <TextInput style={styles.inputs}
    placeholder="R e p e t i r  c o n t r a s e ñ a"
    secureTextEntry={true}
    underlineColorAndroid='transparent'
    onChangeText={(repeatPassword) => this.setState({repeatPassword})}/>
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
            onDateChange={(date)=>this.setState({date})}
            disabled={false}
            />
  </View>
  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}} >
  <TouchableOpacity style={[styles.buttonContainer, styles.registerbutton2]} onPress={() => this.HandleRegister()}>
            <Text style={styles.loginText}>REGISTRARME</Text>
    </TouchableOpacity>
  </View>
  
  
         </ScrollView>
         </KeyboardAvoidingView>
    </View>
      )




secondRoute = () => (
      
        <View style={[styles.scene]} >
        <KeyboardAvoidingView    keyboardVerticalOffset={60}   behavior="padding" >
               <ScrollView>

        <View style={styles.inputContainer}>
        
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" color="#fff" />}
                style={styles.picker}
                selectedValue={this.state.TypesDocument}
                onValueChange={(itemValue) =>
                this.setState({TypesDocument: itemValue})
                }>

            <Picker.Item label="Cedula ciudadania" value="cedula ciudadania" />
            <Picker.Item label="Cedula extranjeria" value="cedula extranjeria" />
            <Picker.Item label="Pasaporte " value="pasaporte" />
 
              </Picker>
           
        </View>
             
          <View style={styles.inputContainer}>
        
        <TextInput style={styles.inputs}
            keyboardType='number-pad'
            placeholder="N U M E R O  D O C U M E N T O"
            underlineColorAndroid='transparent'
            onChangeText={(numerodocumento) => this.setState({numerodocumento})}/>
        </View>
          <View style={styles.inputContainer}>
        
        <TextInput style={styles.inputs}
            placeholder="N o m b r e s"
            underlineColorAndroid='transparent'
            onChangeText={(name) => this.setState({name})}/>
        </View>
        
        <View style={styles.inputContainer}>
        
        <TextInput style={styles.inputs}
            placeholder="A p e l l i d o s"
            underlineColorAndroid='transparent'
            onChangeText={(lastname) => this.setState({lastname})}/>
        </View>
        <View style={styles.inputContainer}>
        
        <TextInput style={styles.inputs}
          placeholder="C o r r e o  e l e c t r o n i c o"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
        
        <TextInput style={styles.inputs}
           keyboardType='number-pad'
           placeholder=" C e l u l a r"
           underlineColorAndroid='transparent'
           onChangeText={(Phone) => this.setState({Phone})}/>
        </View>
        
        <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="C o n t r a s e ñ a"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputContainer}>
        
        <TextInput style={styles.inputs}
          placeholder="R e p e t i r  c o n t r a s e ñ a"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(repeatPassword) => this.setState({repeatPassword})}/>
        </View>
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}} >
        <TouchableOpacity style={[styles.buttonContainer, styles.registerbutton2]} onPress={() => this.HandleRegister()}>
                  <Text style={styles.loginText}>REGISTRARME</Text>
          </TouchableOpacity>
        </View>
        
        
               </ScrollView>
               </KeyboardAvoidingView>
          </View>
      )
     

  render() {

 
  
      
      
       

    return (
          

            <ImageBackground source={require('../assets/chica.jpg')}  style={styles.container} >
     
                <View style={styles.container}>
              <View style={styles.top} >
                <Image  style={{height:"90%",width:"55%"}} source={require('../assets/PRUEBA-18.png')}  />
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
                
                style={{backgroundColor:"transparent",justifyContent:'center',alignContent:'center'}}
                navigationState={this.state}
                renderScene={SceneMap({
                    first:this.firstRoute,
                    second:this.secondRoute,
                })}
                onIndexChange={index=>this.setState({index})}
                initialLayout={{width:Dimensions.get('window').width}}
            />


        </View>

       



              </View>
           
          </ImageBackground>
      

    );
  }
}

