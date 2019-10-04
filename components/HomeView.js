import React,{PureComponent,Component} from 'react'
import {View,Image,TouchableOpacity,Text, ScrollView ,Linking } from 'react-native'
import firebase from 'firebase'
import { Card, ListItem, Button, Icon,Header } from 'react-native-elements'
import {DrawerActions} from 'react-navigation-drawer'
import styles from './styles'




export default class HomeView extends PureComponent{

    showDrawer=()=>{
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }





    render(){
        return(

  <View>  




                    <View>   
                    <Header
                      leftComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())} >
                      <View  style={styles.row}>
                          <Image source={require('../assets/menu2.png')} style={styles.headerImage2}  />
                      </View>
                      </TouchableOpacity> }
                      centerComponent={{ text: 'M Y C L A S S F L I X', style: { color: '#00BEB1', fontSize:20} }}
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
                                      fontSize:18,
                                      fontWeight:'900'}}> APRENDE CON LOS MEJORES  </Text>
                  </View>  
                
            <ScrollView   horizontal={true}  showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={true} >
              <Card
              title='MYCLASSFLIX RECURSOS'
              image={require('../assets/ImageBack.png')}
              containerStyle={{borderRadius:30}}>
              <Text style={{marginBottom: 10}}>
                Bienvenido a MYCLASSFLIX , aqui encontraras todo lo que quieras aprender
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                onPress={()=> Linking.openURL('https://www.myclassflix.com/resources')}
                buttonStyle={{borderRadius: 30, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VER AHORA' />
            </Card>

            <Card
              title='MYCLASSFLIX PROFESORES'
              image={require('../assets/ImageBack.png')}
              containerStyle={{borderRadius:30,}}>
              <Text style={{marginBottom: 10}}>
                Bienvenido a MYCLASSFLIX , aqui encontraras todo lo que quieras aprender
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                onPress={()=> Linking.openURL('https://www.myclassflix.com/teachers')}
                buttonStyle={{borderRadius: 30, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VER AHORA' />
            </Card>
            <Card
              title='MYCLASSFLIX PLANES'
              image={require('../assets/ImageBack.png')}
              containerStyle={{borderRadius:30}}>
              <Text style={{marginBottom: 10}}>
                Bienvenido a MYCLASSFLIX , aqui encontraras todo lo que quieras aprender
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                onPress={()=>Linking.openURL('https://www.myclassflix.com/prices')}
                buttonStyle={{borderRadius: 30, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VER AHORA' />
            </Card>
            </ScrollView>
          
            <View style={{padding: 5,justifyContent:'center',alignItems:'center'}}>
                                  <Text style={{ color:"#424242",
                                      textShadowColor:'#424242',
                                      fontSize:18,
                                      fontWeight:'900'}}> Bienvenido {firebase.auth().currentUser.email}  </Text>
            </View>

            <View style={{width:'100%'}}  >  
            
                    <View style={{width: '100%', ustifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',display:'flex'}} >
                            

                    <TouchableOpacity  style={styles.header3} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                        <View  style={styles.row}>
                            <Image source={require('../assets/reservadas.png')} style={styles.headerImage2}  />
                            <Text style={styles.text} >INICIO</Text>
                        </View>
                      </TouchableOpacity>

                        
                        <TouchableOpacity style={styles.header5} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                        <View  style={styles.row}>
                            <Image source={require('../assets/classlive.png')} style={styles.headerImage2}  />
                            <Text style={styles.text} >INICIO</Text>
                        </View>
                        </TouchableOpacity>



                    </View>
                      <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',display:'flex',width:'100%'}} >
                              

                              <TouchableOpacity  style={styles.header4} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                                  <View  style={styles.row}>
                                      <Image source={require('../assets/reservadas.png')} style={styles.headerImage2}  />
                                      <Text style={styles.text} >INICIO</Text>
                                  </View>
                                </TouchableOpacity>
                  
                                  
                                  <TouchableOpacity style={styles.header6} onPress={()=>this.props.navigation.navigate('HomeScreen')} >
                                  <View  style={styles.row}>
                                      <Image source={require('../assets/classlive.png')} style={styles.headerImage2}  />
                                      <Text style={styles.text} >INICIO</Text>
                                  </View>
                                  </TouchableOpacity>
                        </View>

          </View>




</View>




        );
    }
}

