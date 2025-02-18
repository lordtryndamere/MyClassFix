import React,{PureComponent} from 'react'
import {View,Image,TouchableOpacity,Text} from 'react-native'
import firebase from 'firebase'
import {Header } from 'react-native-elements'
import {DrawerActions} from 'react-navigation-drawer'
import Carousel from './Carousel'
import styles from './styles'
import {widthPercentageToDP  as ancho
  ,heightPercentageToDP  as    alto ,
  listenOrientationChange as op,
  removeOrientationListener as rp } from 'react-native-responsive-screen'





export default class HomeView extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      name:'',
      email:'',
      photoUrl:'',
      emailverified:''
    }
  }

 
    showDrawer=()=>{
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }


    componentDidMount(){
      op(this);
    }
    componentWillUnmount(){
      rp(this)
    }

    render(){
 
        return(

  <View style={{height:alto('100%'),width:ancho("100%")}}>  



          <View style={{width:ancho('100%'),height:alto('60%')}} >
                    <View>   
                    <Header
                      leftComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())} >
                      <View  style={styles.row}>
                          <Image source={require('../assets/menu2.png')} style={styles.headerImage3}  />
                      </View>
                      </TouchableOpacity> }
                      centerComponent={{ text: 'M Y C L A S S F L I X', style: { color: '#00BEB1', fontSize:ancho('4.5%')} }}
                    containerStyle={{
                      backgroundColor:'#fff',
                      borderBottomColor:'#9E9E9E',
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.00,
                      
                    }}
                  />
                  </View>

                                <View style={{padding: 7,justifyContent:'center',alignItems:'center'}}>
                                  <Text style={{ color:"#424242",
                                      textShadowColor:'#424242',
                                      fontSize:ancho('4.5%'),
                                      fontWeight:'900'}}> APRENDE CON LOS MEJORES  </Text>
                  </View>  
                

           <Carousel/>
            <View style={{padding: 5,justifyContent:'center',alignItems:'center'}}>
                                  <Text style={{ color:"#424242",
                                      textShadowColor:'#424242',
                                      fontSize:ancho('4.4%'),
                                      fontWeight:'900'}}>¡Bienvenido {firebase.auth().currentUser.displayName}!   </Text>
            </View>
            </View>
            <View style={{paddingLeft:40,paddingRight:40,paddingTop:10,paddingBottom:20,height:alto('40%'),width:ancho("100%"),justifyContent:'center',flexDirection:"row",flexWrap:"wrap",padding:5}}>  
            
                   
                            

                    <TouchableOpacity  style={styles.header3} onPress={()=>this.props.navigation.navigate('UserView')} >
                        <View  style={styles.row}>
                            <Image source={require('../assets/03.png')} style={styles.iconhome}  />
                        
                        </View>
                      </TouchableOpacity>

                        
                        <TouchableOpacity style={styles.header5} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                        <View  style={styles.row}>
                            <Image source={require('../assets/02.png')} style={styles.iconhome}   />
                         
                        </View>
                        </TouchableOpacity>



                
            
                              

                              <TouchableOpacity  style={styles.header4} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                                  <View  style={styles.row}>
                                      <Image source={require('../assets/04.png')} style={styles.iconhome}   />
                                  </View>
                                </TouchableOpacity>
                  
                                  
                                  <TouchableOpacity style={styles.header6} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                                  <View  style={styles.row}>
                                      <Image source={require('../assets/01.png')}style={styles.iconhome}   />

                                  </View>
                                  </TouchableOpacity>
                       

          </View>



</View>




        );
    }
}

