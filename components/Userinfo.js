import React,{PureComponent} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import {Avatar} from 'react-native-elements'
import * as firebase from 'firebase'
import  UpdateUser from './UpdateUserinfo'

export default class Userinfo extends PureComponent{
    constructor(state){
        super(state)
        this.state={
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
CheckUserAvatar =photoURL =>{
return photoURL 
?photoURL 
:"https://firebasestorage.googleapis.com/v0/b/myclassflix-prod.appspot.com/o/AVATAR.png?alt=media&token=addb518d-64fb-495c-969d-6c21df32a495";

 
}

uPdateUserDisplayname = (newDisplayName) =>{
console.log(newDisplayName)
}

retunUpdateUserinfoComponent = userinfoData=>{
    if(userinfoData.hasOwnProperty("uid")){
        return(
            <UpdateUser userinfo={this.state.userinfo} uPdateUserDisplayname={this.uPdateUserDisplayname}  /> 
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