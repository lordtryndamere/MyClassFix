import React ,{PureComponent} from 'react'
import Toast from 'react-native-simple-toast';
import *as firebase from 'firebase'
import {Video} from 'expo-av'
import {StyleSheet,View,Text,Dimensions,TouchableOpacity,ScrollView,Image} from 'react-native'
import {Avatar,Header,Rating,Icon,Card} from 'react-native-elements'
import {TabView,SceneMap,TabBar} from 'react-native-tab-view'

import {widthPercentageToDP  as ancho
  ,heightPercentageToDP  as    alto ,
  listenOrientationChange as op,
  removeOrientationListener as rp } from 'react-native-responsive-screen'


// const vid = firebase.auth().currentUser.uid
export default class Perfil extends PureComponent{
    constructor(props){
        super(props)
       this.state ={
           ...props,
           index:0,
           duration: 0.0,
           routes:[
               {key:'first',title:"PRESENTACIÓN"},
               {key:'second',title:"CONOCIMIENTOS"}
           ]
       }
  

       
    }

    onLoad = (data) => {
        this.setState({ duration: data.duration });
      };



  HandleButtonReservarClase = (key,sk,name,lastname) =>{
    const uid = firebase.auth().currentUser.uid
    firebase.database().ref(`/roleByUser/${uid}`).once('value',snapshot=>{
      rol = snapshot.val()  
      if(rol.type === "teacher"){
        Toast.show("Acceso degenado , solo un estudiante puede reservar clases",5000)
      }else{
        this.props.navigation.navigate('ReservaView',{key,sk,name,lastname})
      }
    })
  }

    
render(){
    const {name,lastname,key,foto,rank,acentSkill,type,sk,desc,video} = this.props.navigation.state.params.Profile



    
    const FirstRoute = () =>(
        <View style={[styles.scene]}>
            <ScrollView>
            <Text style={styles.PresentationText} >
                {desc}
            </Text>
          <View style={{paddingBottom:50}} >
            <Video
            onFullscreenUpdate={Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT}
            onLoad={this.onLoad}
            useNativeControls={true}
            source={{uri:video}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={false}
           
            style={{width:"100%",height:300}}
            />
          </View>
    </ScrollView>
        </View>
    )
    
    const SecondRoute = () =>(
        
        <View style={[styles.scene]}>
        <ScrollView>
            {
        <View style={styles.nivelesTop}>
                        {(() => {
                         
                            if(sk != undefined && sk[0] != undefined && sk[0]['idiomas'].length > 0 ){
                             

                              return (
                                <Card  title="IDIOMAS" titleStyle={{color:"#424242"}}  containerStyle={{paddingLeft:20,paddingRight:20,shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                
                                elevation: 10,}} > 
                            
                            
                        
                            <View style={styles.containertop} >
        
                                <Image  style={styles.imagen} source={require("../assets/skill/languaje.png")} />
                              <Text style={{ fontSize:14,
                                        color:"#9e9e9e",
                                        textShadowColor:"#9e9e9e",
                                        fontWeight:"700"}} > 
                                {sk[0]['idiomas'].join(', ')  } 
                              </Text>
                            </View>
                           
                            
                            </Card>)
                            }
                        })()}
                
                        {(() => {
                            if(sk != undefined && sk[1] != undefined && sk[1]['musica'].length > 0   ){
                             

                              return (
                                <Card  title="MUSICA" titleStyle={{color:"#424242",alignContent:'flex-start'}} containerStyle={{paddingLeft:20,paddingRight:20,shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                
                                elevation: 10,}} > 
                         
                         
                           
                              <View style={styles.containertop} >
                             
                                <Image   style={styles.imagen} source={require("../assets/skill/music.png")} />
                                <Text style={{color:"#757575", textShadowColor:"#9e9e9e",
                                        fontWeight:"700"}} > 
                                {sk[1]['musica'].join(', ')  } 
                              </Text>
                            </View>
                            
                        
                            </Card>)
                            }
                        })()}

                        {(() => {   
                            if(sk != undefined && sk[2] != undefined && sk[2]['tecnologia'].length > 0   ){
                              

                              return (   
                                <Card   title="TECNOLOGIA" titleStyle={{color:"#424242" ,alignContent:'flex-start'}} containerStyle={{paddingLeft:20,paddingRight:20,shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                
                                elevation: 10,}} > 
                           
                        
                          
                              <View style={styles.containertop} >
                              
                                <Image   style={styles.imagen}  source={require("../assets/skill/tecnologi.png")} />
                                <Text style={{color:"#757575", textShadowColor:"#9e9e9e",
                                        fontWeight:"700"}} > 
                                {sk[2]['tecnologia'].join(', ')  } 
                              </Text>
                            </View>
                            
                         
                            </Card>)
                            }
                        })()}

                        {(() => {  
                            if(sk != undefined && sk[3] != undefined && sk[3]['universidad'].length > 0   ){
                              

                              return (
                                <Card  title="UNIVERSIDAD" titleStyle={{color:"#424242"  ,alignContent:'flex-start'}}  containerStyle={{paddingLeft:20,paddingRight:20,shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                
                                elevation: 10,}} > 
                           
                           
                              <View style={styles.containertop} >
                            
                                <Image   style={styles.imagen}  source={require("../assets/skill/pregrado.png")} />
                                <Text style={{color:"#757575", textShadowColor:"#9e9e9e",
                                        fontWeight:"700"}} > 
                                {sk[3]['universidad'].join(', ')  } 
                              </Text>
                            </View>
                           
                          
                            </Card>)
                            }
                        })()}

                        {(() => { 
                            if(sk != undefined && sk[4] != undefined && sk[4]['secundaria'].length > 0   ){
                               

                              return (
                            <Card   title="SECUNDARIA" titleStyle={{color:"#424242",alignContent:'flex-start'}}  containerStyle={{paddingLeft:20,paddingRight:20,shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            
                            elevation: 10,}} > 
                                    
                        
                            
                              <View style={styles.containertop} >
                  
                                <Image    style={styles.imagen} source={require("../assets/skill/secundary.png")} />
                                <Text style={{color:"#757575", textShadowColor:"#9e9e9e",
                                        fontWeight:"700"}} > 
                                {sk[4]['secundaria'].join(', ')  } 
                              </Text>
                            </View>
                        
                            
                            </Card> )
                            }
                        })()}

                        {(() => { 
                            if(sk != undefined && sk[5] != undefined && sk[5]['primaria'].length > 0  ){
                              
                              
                              return (
                            <Card    title="PRIMARIA" titleStyle={{color:"#424242",alignContent:'flex-start'}}   containerStyle={{paddingLeft:20,paddingRight:20,shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            
                            elevation: 10,}} > 
                            
             
                               
                              <View style={styles.containertop} >
                        
                                <Image    style={styles.imagen} source={require("../assets/skill/primary.png")} />
                                <Text style={{color:"#757575", textShadowColor:"#9e9e9e",
                                        fontWeight:"700"}} > 
                                {sk[5]['primaria'].join(', ')  } 
                              </Text>
                            </View>
                          
                            </Card>)
                            }
                        })()}

                        {(() => { 
                            if(sk != undefined && sk[6] != undefined && sk[6]['otros'].length > 0  ){
                             

                              return (
                                <Card  title="OTROS" titleStyle={{color:"#424242",alignContent:'flex-start'}}   containerStyle={{ paddingLeft:20,paddingRight:20,shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                
                                elevation: 10,}} > 
                                
                                
                                 
                              <View style={styles.containertop} >
                                  
                                <Image   style={styles.imagen}  source={require("../assets/skill/others.png")} />
                              <Text style={{color:"#757575", textShadowColor:"#9e9e9e",
                                        fontWeight:"700"}} > 
                                {sk[6]['otros'].join(', ')  } 
                              </Text>
                              </View>
                         
                              </Card>
                            )
                            }
                        })()}
                    
                  
                      

                 
        </View>
    }
    </ScrollView>
        </View>
    )


    return(
        <View style={styles.container}>
                <View style={styles.top} >   
                    <Header
                          centerComponent={{ text: 'D O C E N T E S', style: { color: '#212121', fontSize:18,fontWeight:"bold"} }}
                          containerStyle={{backgroundColor:"#fff",borderBottomWidth:2,borderBottomColor:"#9e9e9e",shadowOpacity:12,shadowColor: "#000",      shadowOffset: {
                            width: 0,
                            height: 12,
                          },
                          shadowOpacity: 0.58,
                          shadowRadius: 16.00,
                          elevation: 24,
                         }}
                         leftComponent={<Icon  type={"material-community"}   name={"arrow-left"} color={"#212121"}  onPress={()=>this.props.navigation.goBack()} />}


                  />
                </View>

        <View style={styles.center}>
            <Avatar
                rounded
                source={{
                    uri: foto
                }}
                size={100}
                // renderPlaceholderContent={<Image source={require('../assets/logo.png')} />}
                />
                <Text style={styles.text} >{`${name}${lastname}`} </Text>
                <Text style={styles.text2} > {`Docente de ${acentSkill[0]}`} </Text>
                <Rating
                    type={"custom"}
                    ratingColor={"#00BEB1"}
                    
                    ratingImage={require("../assets/rating.png")}
                    style={styles.rating}
                    ratingBackgroundColor={"#00BEB1"}
                  imageSize={14}
    
                  readonly
                  startingValue={rank}
            
                />

            </View>


        <View style={styles.botton} >
            <TabView
                
                renderTabBar={props =>
                    <TabBar
                      {...props}
                        getLabelText={({ route }) => route.title}
                        activeColor={"#212121"}
                        inactiveColor={"#bdbdbd"}
                        contentContainerStyle={styles.TabView}
                        
                      indicatorStyle={{ backgroundColor: '#00BEB1' }}
                      style={{ backgroundColor: '#fff' }}

                    />}
                
                style={{backgroundColor:"#fff"}}
                navigationState={this.state}
                renderScene={SceneMap({
                    first:FirstRoute,
                    second:SecondRoute,
                })}
                onIndexChange={index=>this.setState({index})}
                initialLayout={{width:Dimensions.get('window').width}}
            />


        </View>
      <TouchableOpacity   onPress={()=>this.HandleButtonReservarClase(key,sk,name,lastname)}  style={[styles.TouchableOpacityStyle, styles.reservarclase]} >
          <Text style={styles.loginText}>RESERVAR CLASE</Text>
    </TouchableOpacity>
   
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
        height:"5%",
    },
    center:{

        width:"100%",
        height:"43%",
        marginTop:60,
        flex:1,
        alignContent:'center',
        alignItems:'center'


    },
    scene:{
        flex:1,
        width:"100%",
        height:"100%",
        paddingBottom:50

    },
    scene2:{
        flex:1,
        width:"100%",
        height:"100%"
    },
    botton:{
        width:"100%",
        height:"52%"
    },
    text:{
        fontWeight:"bold",
        fontSize:ancho('4.5%'),
        color:"#212121"
    },
    text2:{
        fontSize:ancho('3.5%'),
        color:"#9e9e9e"
    },
    rating:{
        borderColor:"#00BEB1",
        paddingRight:5,
    
    },

TouchableOpacityStyle: {
   //Here is the trick
   position: 'absolute',
   alignItems: 'center',
   justifyContent: 'center',
//    right: 30,
    bottom:0,
},
  loginText:{
    color: 'white',
    fontWeight:"bold",
    fontSize:16

  },
  reservarclase:{
    resizeMode: 'contain',
    backgroundColor: "#00BEB1",
    height:ancho('12%'),
    width:"100%",
  },
  TabView:{
      fontWeight:"bold",
      color:"#212121",
  
  },
  PresentationText:{
      paddingTop:30,
      paddingBottom:15,
      fontSize: ancho('3.5%'),
      color:"#757575",
      paddingLeft:50,
      paddingRight:50,
      textShadowOffset:{width:3,height:3},
      fontWeight:"500"
  },
  nivelesTop:{
      width:"100%",
      height:"100%",
    
   
  },
  containertop:{
      flexDirection:"column",
      alignContent:'flex-start',
      alignItems:'flex-start',
      paddingTop:5,
      paddingBottom:5,
  
      
    
     
  },
  imagen:{
    height:alto('6%'),
    width:ancho('6%')
  }

})