import React,{Component} from 'react'
import {StyleSheet,Text,View,TouchableHighlight,Image,TouchableOpacity,ScrollView} from 'react-native'
import firebase from 'firebase'


export default class ContentCompo extends Component{
    render (){
        return(

        <TouchableOpacity activeOpacity={1} style={styles.drawerTransparent} onPress={()=>this.props.navigation.goBack()}  >
            <TouchableOpacity activeOpacity={1}  style={styles.drawer} disabled={false} >
                <ScrollView>

                <View style={styles.header} >
                    <Image source={require('../assets/user.png')} style={styles.headerImage} />
                    <Text     style={styles.text,{color:'white'}}>Bienvenido {firebase.auth().currentUser.email}  </Text>
                </View>

                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/home.png')} style={styles.headerImage}  />
                    <Text style={styles.text} >Inicio</Text>
                </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('UserView')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/buscar.png')} style={styles.headerImage}  />
                    <Text style={styles.text} > Buscar Docentes</Text>
                </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('Settings')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/soporte.png')} style={styles.headerImage}  />
                    <Text style={styles.text} > Soporte</Text>
                </View>
                </TouchableHighlight>

       

                </ScrollView>
            </TouchableOpacity>
        </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    drawerTransparent:{
        flex:1,
        backgroundColor:'transparent'
    },
    drawer:{
        flex:1,
        width:280,
        backgroundColor:'white'
    },
    header:{
        width:'100%',
        height:200,
        backgroundColor:'#009688',
        alignItems:'center',
        justifyContent:'center' 
        
    },
    headerImage:{
        borderRadius:100,
        

    },
    row:{
        flexDirection:'row',
        paddingVertical:15,
        paddingLeft:10
    },
    menu:{
        width:10,
        height:10,
        backgroundColor:'red',
        borderRadius:50,
        alignSelf:'center',
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:15,
        color:'#111'
    },
    line:{
        width:'90%',
        alignSelf:'center',
        height:1,
        backgroundColor:'gray',
        margin:15
    }
});