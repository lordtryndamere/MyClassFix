import React,{PureComponent} from 'react';
import {View,Text,StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'
import Toast from 'react-native-simple-toast';
import  OverlayInput from "./Elements/OverlayOneinput"
import OverlayTwo    from "./Elements/OverlayTwoinput"
import OverlayThree from './Elements/OverlayThreeinput'

export default class UpdateUserinfo extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            ...props,
            overLayComponent:null,      
            menuItems:[
                {
                    title:"Cambiar Nombre y Apellidos",
                    iconType:"material-community",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#00BEB1",
                    iconNameLeft:"account-circle",
                    iconColorLeft:"#00BEB1",
                    onPress: ()=> this.openOverlay("Nombrer y Apellidos",this.updateUserDisplayName,props.userinfo.displayName)


                },
                {
                    title:"Cambiar Email",
                    iconType:"material-community",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#00BEB1",
                    iconNameLeft:"at",
                    iconColorLeft:"#00BEB1",
                    onPress: () => this.openOverlayTwo("Email","Password", props.userinfo.email ,this.UpdateUserEmail)

                },
                {
                    title:"Cambiar Contraseña",
                    iconType:"material-community",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#00BEB1",
                    iconNameLeft:"lock-reset",
                    iconColorLeft:"#00BEB1",
                    onPress: () => this.openOverlayThree("Contraseña actual","Nueva contraseña","Repetir nueva contraseña",this.updateUserpassword  )

                },
            ]
        }

    }

openOverlay =(Placeholder,updateFunction,inputValue)=>{
      this.setState({
          overLayComponent:<OverlayInput
              isVisibleOverlay={true}
              Placeholder={Placeholder}
              updateFunction={updateFunction}
              inputValue={inputValue}
          />  
      }) 

}
updateUserDisplayName =  (NewDisplayname) =>{
    
        if(NewDisplayname){
        this.state.uPdateUserDisplayname(NewDisplayname);
        }
        else { 
            this.setState({overLayComponent:null})
        }
} 

UpdateUserEmail = async (NewEmail,password) =>{
    const emailOld = this.props.userinfo.email;
    if(emailOld != NewEmail && password){
        this.state.updateUserEmail(NewEmail,password);
    }
    this.setState({
        overLayComponent:null
    })
}


openOverlayTwo = (PlaceholderOne,PlaceholderTwo,InputValueOne,updateFunction) =>{
this.setState({
        overLayComponent:<OverlayTwo
        isVisibleOverlay={true}
        PlaceholderOne={PlaceholderOne}
        PlaceholderTwo={PlaceholderTwo}
        InputValueOne={InputValueOne}
        InputValueTwo=""
        password={true}
        updateFunction={updateFunction}
       
       
    />  
})
}

updateUserpassword  = async (currentPassword,newPassword,newPasswordRepeat) =>{
    if(currentPassword && newPassword&& newPasswordRepeat){
        if(newPassword===newPasswordRepeat){
            if(currentPassword===newPassword){
                Toast.show("La nueva contraseña , no puede ser igual a la actual")
            }else{
            this.state.UpdateUserPassword(currentPassword,newPassword)
            }

        }else{
            Toast.show("Las contraseñas no coinciden",1500)
        }
    }else{
        Toast.show("Tienes que rellenar todos los capos",1500)
    }

    this.setState({
    overLayComponent:null
})
}

openOverlayThree =(PlaceholderOne,PlaceholderTwo,PlaceholderThree,updateFunction)=>{
    this.setState({
        overLayComponent:<OverlayThree
        isVisibleOverlay={true}
        PlaceholderOne={PlaceholderOne}
        PlaceholderTwo={PlaceholderTwo}
        PlaceholderThree={PlaceholderThree}
        InputValueOne=""
        InputValueTwo=""
        InputValueThree=""
        password={true}
        updateFunction={updateFunction}
       
       
    />  
})   

}
    render(){
        const  {menuItems,overLayComponent}  = this.state
        return(
            <View> 
                        {
                    menuItems.map((item,index)=>(

                        <ListItem
                        key={index}
                        title={item.title}
                        leftIcon={{
                            type: item.iconType,
                            name: item.iconNameLeft,
                            color:item.iconColorRight}}
                        rightIcon={{
                            type:item.iconType,
                            name:item.iconNameRight,
                            color:item.iconColorRight
                        }}
    
                        onPress={item.onPress}
                        containerStyle={styles.list}
                        />
                        ))

                        }

                   
            {overLayComponent}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list:{

    borderBottomWidth:1,
    borderBottomColor:"#e3e3d3"
}

})