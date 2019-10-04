import React,{PureComponent,Component} from 'react'
import {View,Image,TouchableOpacity,Text, ScrollView  } from 'react-native'

import { Card, ListItem, Button, Icon,Header } from 'react-native-elements'
import {DrawerActions} from 'react-navigation-drawer'
import styles from './styles'



export default class HomeView extends Component{

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

                                <View style={{padding: 10,justifyContent:'center',alignItems:'center'}}>
                                  <Text style={{ color:"#424242",
                                      textShadowColor:'#424242',
                                      fontSize:18,
                                      fontWeight:'900'}}> APRENDE CON LOS MEJORES  </Text>
                  </View>  
                
            <ScrollView   horizontal={true} pagingEnabled showsHorizontalScrollIndicator={false} >
              <Card
              title='MYCLASSFLIX RECURSOS'
              image={require('../assets/ImageBack.png')}
              containerStyle={{borderRadius:30}}>
              <Text style={{marginBottom: 10}}>
                Bienvenido a MYCLASSFLIX , aqui encontraras todo lo que quieras aprender
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VER AHORA' />
            </Card>

            <Card
              title='MYCLASSFLIX RECURSOS 2'
              image={require('../assets/ImageBack.png')}
              containerStyle={{borderRadius:30}}>
              <Text style={{marginBottom: 10}}>
                Bienvenido a MYCLASSFLIX , aqui encontraras todo lo que quieras aprender
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VER AHORA' />
            </Card>
            <Card
              title='MYCLASSFLIX RECURSOS 3'
              image={require('../assets/ImageBack.png')}
              containerStyle={{borderRadius:30}}>
              <Text style={{marginBottom: 10}}>
                Bienvenido a MYCLASSFLIX , aqui encontraras todo lo que quieras aprender
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VER AHORA' />
            </Card>
            </ScrollView>




</View>




        );
    }
}

