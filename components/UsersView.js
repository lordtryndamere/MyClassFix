import React, { Component,PureComponent } from 'react';
import {} from 'native-base';
import firebase from 'firebase';
import styles from './styles'
import {ListItem,Avatar,Card,Header,SearchBar,Icon} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import {DrawerActions} from 'react-navigation-drawer'

import {
  
  Text,
  View,
  FlatList,
  ActivityIndicator,

  
  
} from 'react-native';


const initialData = [123]; 
const ITEMS_PER_PAGE = 8; 

export default class UserView extends PureComponent {

state={
  timepassed:false, 
  search:'',
  nuevo:[],
  items:[],
  teachersAproveds:[],
  render:'',
  idiomasAcentos:["Alemán", "Árabe", "Chino", "Español", "Francés", "Holandés", "Inglés", "Irlandés", "Italiano", "Japonés", "Latín", "Portugués", "Ruso"],
  page:1,
  data:[9]


}
updateSearch = search => {
  this.setState({ search });
};
showContainer = (index) => {
  console.log(index.name); 
}

eliminarDiacriticos= (texto)=>{
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


componentWillMount(){
  
  firebase.database().ref(`/approveds`).on('value',(snapshot)=>{
    const teachers = snapshot.val();
    // for (const key in teachers){
      
    //   var name = ""
    //   var surname = ""
    //   var ranking = ""
    //   var country = ""
    //   var foto = ""
    //   var myCalendar = []
    //   var mobj = [{ idiomas: [] }, { musica: [] }, { tecnologia: [] }, { universidad: [] }, { secundaria: [] }, { primaria: [] }, { otros: [] }]
    //   var tags = []
    //   var skill = []
    //   var type = []
    //   var skl = []

    //   firebase.database().ref('teachers/'+key+'/personalData/name').once('value',value=>{
    //     name=value.val()
    //   }).then(()=>{
    //     firebase.database().ref('teachers/'+key+'/personalData/surname').once('value',value=>{
    //       surname=value.val()
    
    //     })

    //   }).then(()=>{
    //     firebase.database().ref('teachers/'+key+'/personalData/ranking').once('value',value=>{
    //       ranking=value.val()
    //     })
    //   }).then(()=>{
    //     firebase.database().ref('teachers/'+key+'/personalData/country').once('value',value=>{
    //       country=value.val()
    //     })
    //   }).then(()=>{
    //     firebase.database().ref('teachers/'+key+'/personalData/linkPhoto').once('value',value=>{
    //       foto = value.val()
    //     })
    //   }).then(()=>{
    //     firebase.database().ref('teachers'+key+'/newCalendar/week').once('value',value=>{
    //       myCalendar=value.val()
    //     })
    //   }).then(()=>{
    //     firebase.database().ref('teachers'+key+'/personalData/tags').once('value',value=>{
    //       const snapshot= value.val()
    //       for (const i in snapshot) {

    //         for (const j in snapshot[i]) {

    //           for (const k in snapshot[i][j]) {

    //             tags.push(this.eliminarDiacriticos(snapshot[i][j][k].value))

    //           }

    //         }

    //       }


    //     })
    //   }).then(()=>{
    //     firebase.database().ref('teachers/'+key+'/newSkill').once('value',value=>{
    //       const snapshot = value.val()
    //       for (const i in snapshot) {

    //         type.push(this.eliminarDiacriticos(i))

    //         for (const j in snapshot[i]) {

    //           for (const k in snapshot[i][j]) {

    //             // skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))



    //             if (i == 'Idiomas') {

    //               this.state.idiomasAcentos.forEach(val => {

    //                 if (this.eliminarDiacriticos(val) == j) {

    //                   mobj[0]['idiomas'].push(val);

    //                   skill.push(this.eliminarDiacriticos(val))

    //                   skl.push(val)

    //                 }

    //               })

    //             } else if (i == 'Musica') {

    //               mobj[1]['musica'].push(snapshot[i][j][k].skill)

    //               skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

    //               skl.push(snapshot[i][j][k].skill)

    //             } else if (i == 'Tecnologia') {

    //               mobj[2]['tecnologia'].push(snapshot[i][j][k].skill)

    //               skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

    //               skl.push(snapshot[i][j][k].skill)

    //             } else if (i == 'Universidad') {

    //               mobj[3]['universidad'].push(snapshot[i][j][k].skill)

    //               skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

    //               skl.push(snapshot[i][j][k].skill)

    //             } else if (i == 'Secundaria') {

    //               mobj[4]['secundaria'].push(snapshot[i][j][k].skill)

    //               skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

    //               skl.push(snapshot[i][j][k].skill)

    //             } else if (i == 'Primaria') {

    //               mobj[5]['primaria'].push(snapshot[i][j][k].skill)

    //               skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

    //               skl.push(snapshot[i][j][k].skill)

    //             } else if (i == 'Otros') {

    //               mobj[6]['otros'].push(snapshot[i][j][k].skill)

    //               skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))

    //               skl.push(snapshot[i][j][k].skill)

    //             }

    //           }

    //         }

    //       }

    //       mobj[0]['idiomas'] = mobj[0]['idiomas'];
          

    //     })
    //   }).then(()=>{
    //     var obj = {

    //       id: key,

    //       name: name,

    //       surname: surname,

    //       ranking: ranking,

    //       country: country,

    //       photo: foto,

    //       progress: true,

    //       approved: true,

    //       myCalendar: myCalendar,

    //       tags: tags,

    //       skill: skill,

    //       type: type,

    //       sk: mobj,

    //       acentSkill: skl

    //     }
    //     var renderizado= obj
    //     this.setState({nuevo:Object.values(renderizado)})

    //   })
     
    // }
    
    
    
    
    // MI FORMA DE HACERLO 

    // var approveds = snapshot.val()

    // var Items = Object.values(data)
    for (var key in teachers) {
        firebase.database().ref(`/teachers/${key}/personalData`).on('value',snapshot=>{
            this.state.teacher = snapshot.val()
            this.state.teacher.uid = key
            this.state.teachersAproveds.push(this.state.teacher)
            var renderizar = Object.values(this.state.teachersAproveds)
            // console.log(this.state.render) 
            return this.setState({render:renderizar})
           

        })
    }                
  
                   
    this.setState({items:teachers})
  } )
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
  key={item.uid}
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
  title={item.name}
  titleStyle={{ color: 'black', fontWeight: 'bold' }}
  subtitle={item.surname}
  subtitleStyle={{ color: '#bdbdbd' }}
  leftAvatar={{ size:60, source: { uri:item.linkPhoto} }}
  chevron={{ color: 'black',icon:'add_circle_outline' } }
  bottomDivider
  onPress={() => {this.showContainer(index)}}
   
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

  render() {
    const { search } = this.state;
    return (

      <View >
  <Header
  leftComponent={<Icon name="menu"  onPress ={ ()=> this.props.navigation.dispatch(DrawerActions.openDrawer())} />}
  // centerComponent={{ text: 'M Y C L A S S F L I X', style: { color: '#26a69a', fontSize:20} }}
  centerComponent={ <SearchBar
    placeholder="¿Que quieres aprender?"
    onChangeText={this.updateSearch}
    value={search}
    containerStyle={{ borderRadius: 30,
    
      borderColor: '#fff',
      backgroundColor:'#F5F5F5',
      borderWidth:0,
      width:290,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      marginRight:10,
      shadowColor: "#000",

    
          }}
    inputContainerStyle={{
      backgroundColor:'#F5F5F5',
      borderRadius: 30,
      borderWidth: 0,
      borderColor: '#fff',
      width:290,
      height:45,
      flexDirection: 'row',
      alignItems:'center',  
      
    }}
  />}
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
<View style={{padding: 50,justifyContent:'center',alignItems:'center'}}>
  <Text style={{ color:"#424242",
      textShadowColor:'#424242',
      fontSize:18,
      fontWeight:'900'}}> APRENDE CON LOS MEJORES  </Text>
</View>
        {   console.log(this.state.nuevo),
            this.state.render.length<20
            
            ?<View  style={{  flex:1,justifyContent:'center',alignItems:'center',alignContent:'center',height:'100%',width:'100%'}}>
            <ActivityIndicator size="large"  color="blue"    />
          <Text style={styles.textload}>Cargando profesores ....</Text>
            </View>
         :<FlatList
         keyExtractor={(item, index) => 'key'+index}
         data={this.state.render}
         renderItem={this.renderItem}
         onEndReached={this.loadMore}
         />   
        }       
      </View>
          
    );
  }
}

