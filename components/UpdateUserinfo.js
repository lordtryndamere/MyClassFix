import React,{PureComponent} from 'react';
import {View,Text,StyleSheet} from 'react-native'
import {ListItem} from 'react-native-elements'
import  OverlayInput from "./Elements/OverlayOneinput"

export default class UpdateUserinfo extends PureComponent{
    constructor(state){
        super(state);
        this.state={
            ...state,
            overLayComponent:null,      
            menuItems:[
                {
                    title:"Cambiar Nombre y Apellidos",
                    iconType:"material-community",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#9C27B0",
                    iconNameLeft:"account-circle",
                    iconColorLeft:"#ccc",
                    onPress: ()=> console.log("Clickeo En Cambiar Nombre")


                },
                {
                    title:"Cambiar Email",
                    iconType:"material-community",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#9C27B0",
                    iconNameLeft:"at",
                    iconColorLeft:"#ccc",
                    onPress: () => console.log("Clickeo En Cambiar Email")

                },
                {
                    title:"Cambiar Contraseña",
                    iconType:"material-community",
                    iconNameRight:"chevron-right",
                    iconColorRight:"#9C27B0",
                    iconNameLeft:"lock-reset",
                    iconColorLeft:"#ccc",
                    onPress: () => console.log("Clickeo En Cambiar Contraseña")

                },
            ]
        }

    }

    
    render(){
        console.log(this.state.userinfo)
        const  {menuItems}  = this.state
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

                    <OverlayInput/>    

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