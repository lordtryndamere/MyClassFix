import React,{PureComponent} from 'react';
import {View,Text,StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'
import  OverlayInput from "./Elements/OverlayOneinput"

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
                    onPress: () => console.log("Clickeo En Cambiar Email")

                },
                {
                    title:"Cambiar Contraseña",
                    iconType:"material-community",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#00BEB1",
                    iconNameLeft:"lock-reset",
                    iconColorLeft:"#00BEB1",
                    onPress: () => console.log("Clickeo En Cambiar Contraseña")

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
                            color:item.iconNameRight
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