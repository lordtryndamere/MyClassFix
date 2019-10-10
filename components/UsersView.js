import React, { Component,PureComponent } from 'react';
import firebase from 'firebase';
import styles from './styles'
import {ListItem,Card,Header,Tooltip,SearchBar} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import {DrawerActions} from 'react-navigation-drawer'
import _  from 'lodash'


import {
  
  Text,
  View,
  FlatList,
  ActivityIndicator,
  VirtualizedList,
  TouchableOpacity,
  Image,
  TextInput


  
  
} from 'react-native';


const initialData = [123]; 
const ITEMS_PER_PAGE = 8; 

export default class UserView extends PureComponent {

state={
  timepassed:false, 
 
  nuevo:[],
  items:[],
  teachersAproveds:[],
  render:'',
  idiomasAcentos:["Alemán", "Árabe", "Chino", "Español", "Francés", "Holandés", "Inglés", "Irlandés", "Italiano", "Japonés", "Latín", "Portugués", "Ruso"],
  page:1,
  data:[9],
  fullData  :[],
  query:"",
  habil:''
  


}

showContainer = (index) => {
  console.log(index.name); 
}

eliminarDiacriticos= (texto)=>{
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


componentWillMount(){
  
  // firebase.database().ref(`/approveds`).limitToLast(20).on('value',(snapshot)=>{
  //   const teachers = snapshot.val();

  firebase.database().ref(`/approveds`).limitToLast(20).on('value', data => {

      const teachers = data.val();
      for (const key in teachers) {

        var name = ""

        var surname = ""

        var ranking = ""

        var country = ""

        var photo = ""

        var myCalendar = []

        var mobj = [{ idiomas: [] }, { musica: [] }, { tecnologia: [] }, { universidad: [] }, { secundaria: [] }, { primaria: [] }, { otros: [] }]

        var tags = []

        var skill = []

        var type = []

        var skl = []

 

        firebase.database().ref('teachers/' + key + '/personalData/name').once('value', value => {

          name = value.val()

        }).then(() => {

          firebase.database().ref('teachers/' + key + '/personalData/surname').once('value', value => {

            surname = value.val()

          }).then(() => {

            firebase.database().ref('teachers/' + key + '/personalData/ranking').once('value', value => {

              ranking = value.val()

            }).then(() => {

              firebase.database().ref('teachers/' + key + '/personalData/country').once('value', value => {

                country = value.val()

              }).then(() => {

                firebase.database().ref('teachers/' + key + '/personalData/linkPhoto').once('value', value => {

                  photo = value.val()

                }).then(() => {

                  firebase.database().ref('teachers/' + key + '/newCalendar/week').once('value', value => {

                    myCalendar = value.val()

                  }).then(() => {

                    firebase.database().ref('teachers/' + key + '/personalData/tags').once('value', value => {

                      const snapshot = value.val()

                      for (const i in snapshot) {

                        for (const j in snapshot[i]) {

                          for (const k in snapshot[i][j]) {

                            tags.push(this.eliminarDiacriticos(snapshot[i][j][k].value))

                          }

                        }

                      }

                    }).then(() => {

                      firebase.database().ref('teachers/' + key + '/newSkill').once('value', value => {

                        const snapshot = value.val()

                        for (const i in snapshot) {

                          type.push(this.eliminarDiacriticos(i))

                          for (const j in snapshot[i]) {

                            for (const k in snapshot[i][j]) {

                              // skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

 

                              if (i == 'Idiomas') {

                                this.state.idiomasAcentos.forEach(val => {

                                  if (this.eliminarDiacriticos(val) == j) {

                                    mobj[0]['idiomas'].push(val);

                                    skill.push(this.eliminarDiacriticos(val))

                                    skl.push(val)

                                  }

                                })

                              } else if (i == 'Musica') {

                                mobj[1]['musica'].push(snapshot[i][j][k].skill)

                                skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                                skl.push(snapshot[i][j][k].skill)

                              } else if (i == 'Tecnologia') {

                                mobj[2]['tecnologia'].push(snapshot[i][j][k].skill)

                                skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                                skl.push(snapshot[i][j][k].skill)

                              } else if (i == 'Universidad') {

                                mobj[3]['universidad'].push(snapshot[i][j][k].skill)

                                skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                                skl.push(snapshot[i][j][k].skill)

                              } else if (i == 'Secundaria') {

                                mobj[4]['secundaria'].push(snapshot[i][j][k].skill)

                                skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                                skl.push(snapshot[i][j][k].skill)

                              } else if (i == 'Primaria') {

                                mobj[5]['primaria'].push(snapshot[i][j][k].skill)

                                skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                                skl.push(snapshot[i][j][k].skill)

                              } else if (i == 'Otros') {

                                mobj[6]['otros'].push(snapshot[i][j][k].skill)

                                skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

                                skl.push(snapshot[i][j][k].skill)

                              }

                            }

                          }

                        }

                        mobj[0]['idiomas'] = mobj[0]['idiomas'];
             

                      }).then(() => {

                        var obj = {

                          id: key,

                          name: name.trim(),

                          surname: surname.trim(),

                          ranking: ranking,

                          country: country.trim(),

                          photo: photo,

                          progress: true,

                          approved: true,

                          myCalendar: myCalendar,

                          tags: tags,

                          skill: skill,

                          type: type,

                          sk: mobj,

                          acentSkill: skl

                        }

                        

                        var renderizar  = obj
                         this.setState({fullData:renderizar})
                       this.state.fullData.sk.forEach(pro=>{
                          // for (let index = 0; index < pro.primaria; index++) {
                          //   const element = pro.primaria[index];
                          //   console.log(element)
                            
                          // }
                        this.setState({habil:pro.primaria})
                       })
                         

                      })

                    })

                  })

                })

              })

            })

          })

        })

      }

    })

    // for (var key in teachers) {
    //     firebase.database().ref(`/teachers/${key}/personalData`).on('value',snapshot=>{
    //         this.state.teacher = snapshot.val()
    //         this.state.teacher.uid = key
    //         this.state.teachersAproveds.push(this.state.teacher)
    //         var renderizar = Object.values(this.state.teachersAproveds)
    //         // console.log(this.state.render) 
    //         return this.setState({render:renderizar})
           

    //     })
    // }                
  
                   
    // this.setState({items:teachers})
  // } )
}




renderItem = ({ item,index }) => (
<Card containerStyle={{padding: 0,borderRadius:20,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,}}>
  
  <ListItem
  containerStyle={{borderRadius:20,shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 11,
  },
  shadowOpacity: 0.55,
  shadowRadius: 14.78,
  
  elevation: 22,
  height:105,
  elevation: 10,}}
  key={item.id}
  Component={TouchableScale}
  friction={90} 
  tension={100} 
  activeScale={0.95} 
  linearGradientProps={{
    colors: ['#f1f4ff', '#f1f4ff'],
    start: [1, 0],
    end: [0.2, 0],
  }}

  // key={this.state.render[item].key}
  title={this.state.fullData.name}
  titleStyle={{ color: 'black', fontWeight: 'bold' }}
  subtitle={this.state.habil[index]}
  subtitleStyle={{ color: '#bdbdbd' }}
  leftAvatar={{ size:60, source: { uri:this.state.fullData.photo} }}
  chevron={<Tooltip popover={<Text>Info here</Text>}>
          <Image source={require('../assets/additem.png') }style={{height:40,width:40,borderRadius:100}}  />
        </Tooltip>

}
  bottomDivider
  onPress={() => {this.props.navigation.navigate('ProfileView')}}
   
  />
  </Card> 
)
loadMore() {

  const page = this.state.page
  const data = this.state.data
  const start = page*ITEMS_PER_PAGE;
  const end = (page+1)*ITEMS_PER_PAGE-1;

  const newData = initialData.slice(start, end); 
  this.setState({data: [...data, ...newData]}); 
}

HadleSearch = (text)=>{
  const formatQuery = text.toLowerCase();
  const data = _.filter(this.state.render, user=>{
    return contains(user,formatQuery);
  });
  this.setState({query:formatQuery,data})
}


  render() {
    
    return (

      <View >
  <Header
  rightComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())} >
  <View  style={styles.row}>
      <Image source={require('../assets/ajustes.png')} style={styles.headerImage3}  />
  </View>
  </TouchableOpacity>}
  centerComponent={       
<View style={styles.inputContainer2}>

<TextInput style={styles.inputs2}
    placeholder="¿Que quieres aprender?"
    underlineColorAndroid='transparent'
    onChangeText={this.HadleSearch}/>
</View>
}
  leftComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())} >
  <View  >
      <Image source={require('../assets/menu2.png')} style={styles.headerImage3}  />
  </View>
  </TouchableOpacity> }
  // centerComponent={{ text: 'M Y C L A S S F L I X', style: { color: '#26a69a', fontSize:20} }}
  // centerComponent={ }
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
<View style={{padding: 30,justifyContent:'center',alignItems:'center'}}>
  <Text style={{ color:"#424242",
      textShadowColor:'#424242',
      fontSize:18,
      fontWeight:'900'}}> APRENDE CON LOS MEJORES  </Text>
</View>
        {   console.log(this.state.fullData),
            this.state.fullData.length<5
            
            ?<View  style={{  flex:1,justifyContent:'center',alignItems:'center',alignContent:'center',height:'100%',width:'100%'}}>
            <ActivityIndicator size="large"  color="blue"    />
          <Text style={styles.textload}>Cargando profesores ....</Text>
            </View>
         :<FlatList
         keyExtractor={(item, index) => 'key'+index}
         initialNumToRender={8}
         maxToRenderPerBatch={2}

         data={Object.keys (this.state.fullData)}
         renderItem={this.renderItem}
        //  onEndReached={this.loadMore}
         onEndReachedThreshold={0.5}
         ListFooterComponent={<ActivityIndicator size="large"color="blue" />}
        
         />   
        }       
      </View>
          
    );
  }
}
