import React ,{PureComponent} from 'react'
import {StyleSheet,View,Text,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import {Avatar,Header,Rating,Icon} from 'react-native-elements'
import *as firebase from 'firebase'
import {TabView,SceneMap,TabBar} from 'react-native-tab-view'




// const FirstRoute = () =>(
//     <View style={[styles.scene]}>
//     <ScrollView>

//     </ScrollView> 

//     </View>
// )

// const SecondRoute = () =>(
//     <View style={[styles.scene]}>
//     <ScrollView>
 
        
//     </ScrollView> 

//     </View>
// )




export default class Perfil extends PureComponent{
    constructor(props){
        super(props)
       this.state ={
           index:0,
           routes:[
               {key:'first',title:"PRESENTACIÓN"},
               {key:'second',title:"CONOCIMIENTOS"}
           ]
       }
    }
render(){
    var {name,lastname,key,foto,rank,skl,desc,video} = this.props.navigation.state.params.Profile

    const FirstRoute = () =>(
        <View style={[styles.scene]}>
            <Text style={styles.PresentationText} >
                {desc}
            </Text>

        </View>
    )
    
    const SecondRoute = () =>(
        <View style={[styles.scene]}>

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
                <Text style={styles.text} >{`${name}${lastname} `} </Text>
                <Text style={styles.text2} > {skl[0]} </Text>
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
   <TouchableOpacity  style={[styles.TouchableOpacityStyle, styles.reservarclase]} >
          <Text style={styles.loginText}>RESERVAR CLASE</Text>
    </TouchableOpacity>

        </View>

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
        height:"40%",
        paddingTop:70,
        flex:1,
        alignContent:'center',
        alignItems:'center'


    },
    scene:{
        flex:1,
    },
    botton:{
        width:"100%",
        height:"60%"
    },
    text:{
        fontWeight:"bold",
        fontSize:18,
        color:"#212121"
    },
    text2:{
        fontSize:16,
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
    height:50,
    width:"100%",
  },
  TabView:{
      fontWeight:"bold",
      color:"#212121",
  
  },
  PresentationText:{
      paddingTop:30,
      fontSize:16,
      color:"#757575",
      paddingLeft:50,
      paddingRight:50,
      textShadowOffset:{width:3,height:3},
      fontWeight:"500"
  }
})