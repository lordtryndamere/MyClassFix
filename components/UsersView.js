import React, { Component, PureComponent } from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import PopoverTooltip from  'react-native-popover-tooltip'
import * as firebase from 'firebase';

import styles from './styles'
import { ListItem, Card, Header, Tooltip } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';
import TouchableScale from 'react-native-touchable-scale';
import { DrawerActions } from 'react-navigation-drawer'




import _ from 'lodash'


import {

  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,





} from 'react-native';
import Perfil from './Perfil';



var fullData = [];

export default class UserView extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ...props,
      busquedaprofesores: null,
      Search: '',
      timepassed: false,
      skill:[],
      fullTeachers: '',
      nuevo: [],
      items: [],
      teachersAproveds: [],
      render: '',
      idiomasAcentos :

      ["Alemán", "Árabe", "Chino", "Español", "Francés", "Holandés", "Inglés", "Irlandés", "Italiano", "Japonés", "Latín", "Portugués", "Ruso"],
      page: 1,
      data: [9],
      query: "",
      habil: '',
      toolTipVisible: false
    }
  }
  showContainer = (index) => {
    console.log(index.name);
  }

  componentWillMount() {

    this.loadTeachers()
  }

  loadTeachers   =   () => {
    var snapshot;
    var skl=[];
    var teachers;
    var OBJETO;
    var skill = []
    var mobj = [{ idiomas: [] }, { musica: [] }, { tecnologia: [] }, { universidad: [] }, { secundaria: [] }, { primaria: [] }, { otros: [] }]
    var type = []

    firebase.database().ref(`/approveds`).once('value', (snapshot) => {
      teachers = snapshot.val();
    }).then( async () => {
        fullData = [];   // QUEDAMOS AQUI TOCABA REFRESCARLO
        for (const key in teachers) {
         
          await firebase.database().ref(`/teachers/${key}/personalData`).once('value', snapshot => {
            OBJETO = snapshot.val()
             
     
           
          })
            firebase.database().ref(`/teachers/${key}/newSkill`).once('value',data=>{
           
              mobj = [{ idiomas: [] }, { musica: [] }, { tecnologia: [] }, { universidad: [] }, { secundaria: [] }, { primaria: [] }, { otros: [] }]
              skl=[];
              skill = []
              type = []
              snapshot = data.val()
              
             
              for (const i in snapshot) {

                type.push(i)

                for (const j in snapshot[i]) {

                  for (const k in snapshot[i][j]) {

                    // skill.push(this.eliminarDiacriticos(snapshot[i][j][k].skill))



                    if (i == 'Idiomas') {

                      this.state.idiomasAcentos.forEach(val => {

                        if (val == j) {

                          mobj[0]['idiomas'].push(val);

                          skill.push(val)

                          skl.push(val)

                        }

                      })

                    } else if (i == 'Musica') {

                      mobj[1]['musica'].push(snapshot[i][j][k].skill)

                      skill.push(snapshot[i][j][k].skill)

                      skl.push(snapshot[i][j][k].skill)

                    } else if (i == 'Tecnologia') {

                      mobj[2]['tecnologia'].push(snapshot[i][j][k].skill)

                      skill.push(snapshot[i][j][k].skill)

                      skl.push(snapshot[i][j][k].skill)

                    } else if (i == 'Universidad') {

                      mobj[3]['universidad'].push(snapshot[i][j][k].skill)

                      skill.push(snapshot[i][j][k].skill)

                      skl.push(snapshot[i][j][k].skill)

                    } else if (i == 'Secundaria') {

                      mobj[4]['secundaria'].push(snapshot[i][j][k].skill)

                      skill.push(snapshot[i][j][k].skill)

                      skl.push(snapshot[i][j][k].skill)

                    } else if (i == 'Primaria') {

                      mobj[5]['primaria'].push(snapshot[i][j][k].skill)

                      skill.push(snapshot[i][j][k].skill)

                      skl.push(snapshot[i][j][k].skill)

                    } else if (i == 'Otros') {

                      mobj[6]['otros'].push(snapshot[i][j][k].skill)

                      skill.push(snapshot[i][j][k].skill)

                      skl.push(snapshot[i][j][k].skill)

                    }

                  }

                }

              }

              mobj[0]['idiomas'] = mobj[0]['idiomas']

            
             
     
              // this.setState({skill:skl})
        
            }) 
 
           

            .then( () => {
              
            var uid = key
            var nombre = OBJETO.name
            var surname = OBJETO.surname
            var ranking = OBJETO.ranking
            var country = OBJETO.country
            var photo = OBJETO.linkPhoto
            var tags = OBJETO.tags
            var description = OBJETO.resume
            var video = OBJETO.url

            var ojc = {
              key: uid,
              name: nombre,
              lastname: surname,
              rank: ranking,
              pais: country,
              foto: photo,
              tag: tags,
              acentSkill:skl,
              type:type,
              sk:mobj,
              desc:description,
              video:video
            }
            fullData.push(ojc)
            
            
            // var render = Object.values(ojc)  CON ESTO PUDE RENDERIZAR PERO PERDI CLAVES
            // this.setState({fullTeachers:render})
            //  this.state.teacher = snapshot.val()
            //  this.state.teacher.uid = key
            //  this.state.teachersAproveds.push(this.state.teacher)
            //  var renderizar = Object.values(this.state.teachersAproveds)
            //  // console.log(this.state.render) 
            //  return this.setState({render:renderizar})
          })


        }
        // console.log(fullData)
        // console.log(this.state.fullTeachers)
        // this.setState({ items: teachers })
      })
      
    setTimeout(() => {
      return this.setState({ fullTeachers: fullData })
    }, 10000);
  }

  
  renderItem = ({ item, index }) => (

    <Card containerStyle={{
      padding: 0, borderRadius: 20, shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    }}>

      <ListItem
        containerStyle={{
          borderRadius: 20, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.55,
          shadowRadius: 14.78,

          elevation: 22,
          height: 105,
          elevation: 10,
        }}
        key={item.key}
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
        subtitle={<View>

          <Text style={{ color: "#757575", fontSize: 13, fontWeight: "600" }} > {item.acentSkill[0]} </Text>
          <View style={styles.contentRating} >
            <Rating

              type={"custom"}
              ratingCount={item.rank}
              ratingColor={"#00BEB1"}
              fractions={item.rank}
              ratingImage={require("../assets/rating.png")}
              style={styles.rating}
              ratingBackgroundColor={"#00BEB1"}
              imageSize={13}

              startingValue={item.rank}
            />
          </View>
        </View>}
        subtitleStyle={{ color: '#bdbdbd' }}
        leftAvatar={{ renderPlaceholderContent: <Image style={{ height: 50, width: 50 }} source={require('../assets/logo.png')} />, size: 60, source: { uri: item.foto } }}
        chevron={<Tooltip popover={<Text>Info here</Text>} width={150} height={60}  >
          <Image source={require('../assets/additem.png')} style={{ height: 30, width: 30 }} />
        </Tooltip>

        }
        bottomDivider
        //onPress={() => { this.props.navigation.navigate('ProfileView') }}
        onPress={() => this.ClickView(item)}
      />
    </Card>

  )


  ClickView(Profile) {
    const element = <Perfil datacomple={Profile} />
    if (Profile.hasOwnProperty("key")) {

      this.props.navigation.navigate('Perfil', { Profile })
      return element;

    }
  }

  searchTeachers = (value) => {


    const filteredTeachers = this.state.fullTeachers.filter(teacher => {
      teacherLowerCase = (
        teacher.name + ''
      ).toLowerCase();
      var searchTermLowerCase = value.toLowerCase();
      return teacherLowerCase.indexOf(searchTermLowerCase)

    })
    this.setState({ Search: value })

    console.log(this.state.Search);



  }

  render() {
    const { Search } = this.state;
    return (

      <View >
        <Header
          rightComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.navigate('AjustesView')} >
            <View style={styles.row}>
              <Image source={require('../assets/ajustes.png')} style={styles.headerImage3} />
            </View>
          </TouchableOpacity>}
          centerComponent={
            <Searchbar
              style={{ width: "130%", height: 38, borderRadius: 30 }}
              placeholder="Buscar"
              onChangeText={this.searchTeachers}
              value={Search}
            />
          }
          leftComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
            <View  >
              <Image source={require('../assets/menu2.png')} style={styles.headerImage3} />
            </View>
          </TouchableOpacity>}
          // centerComponent={{ text: 'M Y C L A S S F L I X', style: { color: '#26a69a', fontSize:20} }}
          // centerComponent={ }
          containerStyle={{
            backgroundColor: '#fff',
            borderBottomColor: '#9E9E9E',
            borderBottomWidth: 2,
            shadowColor: "#000", shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,


          }}

        />
        <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            color: "#424242",
            textShadowColor: '#424242',
            fontSize: 18,
            fontWeight: '900'
          }}> APRENDE CON LOS MEJORES  </Text>
        </View>
        {console.log(this.state.fullTeachers),
          this.state.fullTeachers.length < 3
            ? <View style={{ paddingTop: 120, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
              <Image source={require('../assets/spinner.gif')} style={{ height: 200, width: 200 }} />
              <Text style={styles.textload}>Cargando profesores ....</Text>
            </View>
            : <FlatList
              keyExtractor={(item, index) => 'key' + index}
              initialNumToRender={15}
              data={this.state.fullTeachers}
              renderItem={this.renderItem}
              get

            />

        }


      </View>

    );
  }
}
