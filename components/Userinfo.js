import React,{PureComponent} from 'react'
import {View,Text,StyleSheet,Image, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as  Permissions from 'expo-permissions'
import Toast from 'react-native-simple-toast';
import {Avatar} from 'react-native-elements'
import * as firebase from 'firebase'
import  UpdateUser from './UpdateUserinfo'
import { resolve } from 'dns';



export default class Userinfo extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            ...props,
            userinfo:{}
        }
    }

componentDidMount = async ()=>{
    await this.getUserinfo();
}

getUserinfo(){
const user = firebase.auth().currentUser;
user.providerData.forEach(userinfo=>{
this.setState({userinfo})
});

}

ChangeAvatarUser = async ()=>{
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(resultPermission.status =="denied"){
        Toast.show("Es Necesario aceptar permisos de galeria",Toast.LONG,4000);
    }else{
        const Result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect: [4,3]
        });
        if(Result.cancelled){
            Toast.show("Has cerrado la galeria de imagenes",Toast.LONG,1500);
        }else{
            console.log(Result);
            const {uid} = this.state.userinfo
            this.uploadImage(Result.uri,"ProfilePicture")
            .then(resolve=>{
                Toast.show("Avatar actualizado correctamente",Toast.BOTTOM,Toast.SHORT,1500);
            }).catch(error=>{
                Toast.show("Error al actualizar , intentalo mas tarde",Toast.BOTTOM,Toast.SHORT,1500);
            })
            
        }
    }
    
}

uploadImage= async(uri,nameImage)  =>{
    const {uid} = this.state.userinfo
    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.onerror= reject;
        xhr.onreadystatechange = () =>{
            if(xhr.readyState){
                resolve(xhr.response);
            }
        }
        xhr.open("GET",uri);
        xhr.responseType="blob";
        xhr.send
    }).then(async resolve=>{
        //let ref = firebase.storage().ref().child("teachers/"+uid+"Picture.jpg");  // asi creo referias para subir imagenes
        let ref = firebase.storage().ref(`/teachers/${uid}/`+nameImage ).put(resolve)  // paso una referia de donde quiero guardar y lo que quiero
        return await ref
    }).catch(error=>{
        Toast.show("Error al subir imagen al servidor",Toast.SHORT,Toast.BOTTOM,1500)
    });

    
    
}

reLogear = currentPassword =>{
    const user = firebase.auth().currentUser
    const  credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
    );
    return user.reauthenticateWithCredential(credentials)
}

CheckUserAvatar =photoURL =>{
return photoURL 
?photoURL 
:"https://firebasestorage.googleapis.com/v0/b/myclassflix-prod.appspot.com/o/AVATAR.png?alt=media&token=addb518d-64fb-495c-969d-6c21df32a495";

 
}

uPdateUserDisplayname =  async (newDisplayName) =>{
const update ={
    displayName:newDisplayName
}
 await firebase.auth().currentUser.updateProfile(update);
this.getUserinfo();

}

updateUserEmail = async (NewEmail,password) =>{
this.reLogear(password)
.then(()=>{
    const user  = firebase.auth().currentUser;
    user

    .updateEmail(NewEmail)
    .then(()=>{
        Toast.show("Correo Actualizado Correctamente", Toast.BOTTOM,  Toast.LONG,4000)
        Alert.alert("Por favor cierra sesion, e inicia con el nuevo email ")
     })
    .catch(err =>{
        Toast.show("Contraseña incorrecta", Toast.BOTTOM, Toast.LONG,2000)
        
    })
})
.catch(error =>{
    Toast.show("Contraseña incorrecta", Toast.BOTTOM, Toast.LONG)
    
})

}

retunUpdateUserinfoComponent = userinfoData =>{
    if(userinfoData.hasOwnProperty("uid")){
        return(
            <UpdateUser 
            userinfo={this.state.userinfo} 
            uPdateUserDisplayname={this.uPdateUserDisplayname}
            updateUserEmail={this.updateUserEmail}  /> 
        )
    }
}
    render(){
        var {displayName,email,photoURL} = this.state.userinfo

        return(
    <View style={styles.Userinfo}>
        <View  style={styles.ViewAvatar}>
                <Avatar
                rounded
                onEditPress={()=>this.ChangeAvatarUser()}
                showEditButton
                size="large"
                source={{uri:this.CheckUserAvatar(photoURL)}}
                containerStyle={styles.UserinfoAvatar}
                // renderPlaceholderContent={<Image source={require('../assets/logo.png')} />}
                
                />
                    <Text style={styles.text1} > {displayName} </Text>
                    <Text style={styles.text1} >   {email} </Text>
        </View>

        <View  >
        {this.retunUpdateUserinfoComponent(this.state.userinfo)}

        </View>
    </View>
        )
    }
}


const styles=StyleSheet.create({
    Userinfo:{
        alignContent:'center',
    },

    UserinfoAvatar:{
        marginRight:20
    },
    ViewAvatar:{
        paddingTop:50,
        backgroundColor:"#f2f2f2",
        alignContent:'center',
        alignItems:'center'

    },
    text1:{
        fontWeight:"bold",
        
        
    },
   
})