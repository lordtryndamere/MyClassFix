import React ,{PureComponent} from 'react'
import {StyleSheet,View,Text,Dimensions} from 'react-native'
import {Avatar,Header} from 'react-native-elements'
import *as firebase from 'firebase'
import {TabView,SceneMap,TabBar} from 'react-native-tab-view'

const FirstRoute = () =>(
    <View style={[styles.scene]}> 
    <Text>PrIMERA</Text> 
    </View>
)

const SecondRoute = () =>(
    <View style={[styles.scene]}> 
    <Text>Segunda</Text> 
    </View>
)




export default class Perfil extends PureComponent{
    constructor(props){
        super(props)
       this.state ={
           index:0,
           routes:[
               {key:'first',title:"PRESENTACION"},
               {key:'second',title:"CONOCIMIENTOS"}
           ]
       }
    }
render(){
    var {name,lastname,key,foto} = this.props.navigation.state.params.Profile
    return(
        <View style={styles.container}>
                <View style={styles.top} >   
                    <Header
                          centerComponent={{ text: 'DOCENTES', style: { color: '#212121', fontSize:16} }}
                          containerStyle={{backgroundColor:"#fff"}}
                  />
                </View>

            <View style={{justifyContent:'center',flexDirection:'row',alignContent:'center'}}>
            <Avatar
                rounded
                source={{
                    uri: foto
                }}
                size={120}
                // renderPlaceholderContent={<Image source={require('../assets/logo.png')} />}
                />
            </View>



            <TabView
                
                renderTabBar={props =>
                    <TabBar
                      {...props}
                    getLabelText={({ route }) => route.title}
                      indicatorStyle={{ backgroundColor: '#00BEB1' }}
                      style={{ backgroundColor: '#fff' }}
                    />}
                
                style={{backgroundColor:"#424242"}}
                navigationState={this.state}
                renderScene={SceneMap({
                    first:FirstRoute,
                    second:SecondRoute,
                })}
                onIndexChange={index=>this.setState({index})}
                initialLayout={{width:Dimensions.get('window').width}}
            />

        </View>
    )
}  

}
const styles=StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        flex:1,
        alignContent:'center'
    },
    top:{
        alignContent:'center',
        width:"100%",
        height:"10%",
        paddingBottom:6
    },
    scene:{
        flex:1,
    }
})