import React,{Component} from 'react'
import {StyleSheet,Text,View,TouchableHighlight,Image,TouchableOpacity,ScrollView,ImageBackground} from 'react-native'
import * as firebase from 'firebase'
import {NavigationActions} from 'react-navigation'

export default class ContentCompo extends Component{

    render (){
        return(

        <TouchableOpacity activeOpacity={1} style={styles.drawerTransparent}  >
            <TouchableOpacity activeOpacity={1}  style={styles.drawer} disabled={false} >
                <ScrollView>

                <ImageBackground   source={require('../assets/ImageBack.png')}  style={styles.header} >
                    <Image source={require('../assets/user.png')} style={styles.headerImage} />
                    <Text   style={styles.text,{color:'white',fontWeight:"bold"}}>Mi Perfil {firebase.auth().currentUser.displayName}  </Text>
                </ImageBackground>

                    
                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('UserView')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/buscar.png')} style={styles.headerImage2}  />
                    <Text style={styles.textDocentes} > BUSCAR DOCENTES</Text>
                </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('Settings')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/reservadas.png')} style={styles.headerImage2}  />
                    <Text style={styles.textclases} > CLASES RESERVADAS</Text>
                </View>
                </TouchableHighlight>

                {/* <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('Settings')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/classlive.png')} style={styles.headerImage2}  />
                    <Text style={styles.text} >CLASSLIVE</Text>
                </View>
                </TouchableHighlight> */}

                {/* <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('Settings')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/grupales.png')} style={styles.headerImage2}  />
                    <Text style={styles.text} > CLASES GRUPALES</Text>
                </View>
                </TouchableHighlight> */}

                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('Settings')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/creditos.png')} style={styles.headerImage2}  />
                    <Text style={styles.text} >MIS CREDITOS</Text>
                </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.navigate('AjustesView')} >
                <View  style={styles.row}>
                    <Image source={require('../assets/soporte.png')} style={styles.headerImage2}  />
                    <Text style={styles.text} >MI CUENTA</Text>
                </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'rgba(0,0,0,0.2)'} onPress={()=> firebase.auth().signOut().then(()=>{
                    this.props.navigation.navigate('LoginView')
                })}>
                <View  style={styles.row}>
                    <Image source={require('../assets/sesion.png')} style={styles.headerImage2}  />
                    <Text style={styles.text} > CERRAR SESION</Text>
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
        backgroundColor:'transparent',
        borderRightColor:'#bdbdbd',
        borderRightWidth:7,
     
    },
    drawer:{
        flex:1,
        width:280,
        backgroundColor:'white',
        borderRightColor:'#bdbdbd',
        borderRightWidth:7,
        
    },
    header:{
        
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#bdbdbd',
        borderBottomWidth:7,
        borderRightColor:'#bdbdbd',
   
 
        
    },
    headerImage:{
        borderRadius:100,
        marginRight:40,
        marginRight:40
        

    },
    headerImage2:{
        marginLeft:40,
        position:'relative'
        

    },
    row:{
        flexDirection:'row',
        paddingVertical:15,
       
    },
    menu:{
        width:10,
        height:10,
        backgroundColor:'red',
        borderRadius:50,
        alignSelf:'center',
    },
    text:{
        paddingRight:8,
        fontSize:13,
        fontWeight:'bold',
        flex:1,
       justifyContent:'center',
       alignItems:'center',
       marginLeft:20,
        color:'#111',
        position:'relative'
    },
    line:{
        width:'90%',
        alignSelf:'center',
        height:1,
        backgroundColor:'gray',
        margin:15
    },
    textclases:{
        marginTop:6,

        marginRight:10,
        fontSize:13,
        fontWeight:'bold',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:32,
        color:'#111',
        position:'relative'
    },
    textDocentes:{
        marginTop:6,
        marginRight:10,
        fontSize:13,
        fontWeight:'bold',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:18,
        color:'#111',
        position:'relative'

    }
});