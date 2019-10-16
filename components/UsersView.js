import React, { Component, PureComponent } from 'react';
import PopoverTooltip from  'react-native-popover-tooltip'
import firebase from 'firebase';
import styles from './styles'
import { ListItem, Card, Header,SearchBar } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import { DrawerActions } from 'react-navigation-drawer'
import _ from 'lodash'


import {

  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput




} from 'react-native';


const initialData = [123];
const ITEMS_PER_PAGE = 8;
var fullData = [];

export default class UserView extends PureComponent {
  constructor(props){
    super(props)
  }
  state = {
    timepassed: false,
    fullTeachers: '',
    nuevo: [],
    items: [],
    teachersAproveds: [],
    render: '',
    idiomasAcentos: ["Alemán", "Árabe", "Chino", "Español", "Francés", "Holandés", "Inglés", "Irlandés", "Italiano", "Japonés", "Latín", "Portugués", "Ruso"],
    page: 1,
    data: [9],
    query: "",
    habil: '',
    toolTipVisible:false
  }

  showContainer = (index) => {
    console.log(index.name);
  }

  componentWillMount() {

    this.loadTeachers()
  }

  loadTeachers() {
    var DataFull;
    var skl=[];
    var teachers;
    var OBJETO;
    firebase.database().ref(`/approveds`).once('value', (snapshot) => {
      teachers = snapshot.val();
    })
      .then(() => {
        fullData = [];   // QUEDAMOS AQUI TOCABA REFRESCARLO
        for (const key in teachers) {
          skl=[];
          firebase.database().ref(`/teachers/${key}/personalData`).once('value', snapshot => {
            OBJETO = snapshot.val()
          }).then(()=>{
            firebase.database().ref(`/teachers/${key}/newSkill`).once('value',data=>{

              DataFull = data.val()
            
              for (const i in DataFull) {

                for (const j in DataFull[i]) {

                  for (const k in DataFull[i][j]) {

                    skl.push(DataFull[i][j][k].skill)

                  }

                }

              }

       
              console.log(DataFull)
            })


          })
            .then(() => {
              var uid = key
              var nombre = OBJETO.name
              var surname = OBJETO.surname
              var ranking = OBJETO.ranking
              var country = OBJETO.country
              var photo = OBJETO.linkPhoto
              var tags = OBJETO.tags

              var ojc = {
                key: uid,
                name: nombre,
                lastname: surname,
                rank: ranking,
                pais: country,
                foto: photo,
                tag: tags,
                skl:skl
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
        subtitle={item.skl[0]}
        subtitleStyle={{ color: '#bdbdbd' }}
        leftAvatar={{  renderPlaceholderContent:<Image  style={{height:50,width:50}} source={require('../assets/logo.png')}/>, size: 60,     source: { uri: item.foto   } }}
        chevron={  <PopoverTooltip
          ref='tooltip1'
          buttonComponent={

          <Image source={require('../assets/additem.png')} style={{ height: 40, width: 40, borderRadius: 100 }} />
        
          }
          items={[
            {
              label: item.name,
              onPress: () => {}
            },
            {
              label: 'Item 2',
              onPress: () => {}
            }
          ]}
          animationType='spring' // spring-damper animation
          springConfig={{tension: 100, friction: 3}}
          />

        }
        bottomDivider
        //onPress={() => { this.props.navigation.navigate('ProfileView') }}
        onPress={()=>this.ClickView(item)}
      />
    </Card>

  )
  loadMore() {

    const page = this.state.page
    const data = this.state.data
    const start = page * ITEMS_PER_PAGE;
    const end = (page + 1) * ITEMS_PER_PAGE - 1;

    const newData = initialData.slice(start, end);
    this.setState({ data: [...data, ...newData] });
  }

  ClickView(Profile){
    this.props.navigation.navigate('Perfil',{Profile})
    console.log(Profile)
    
  }
  HadleSearch=                     value=>{
    const filteredTeachers= this.state.fullTeachers.filter(teacher=>{
      var teacherLowerCase = (
        teacher.name+
        ' ' +
        teacher.lastname
      ).toLowerCase();

        var searchTermLowerCase = value.toLowerCase();
        return teacherLowerCase.indexOf(searchTermLowerCase) > -1;
    });
    this.setState({fullTeachers:filteredTeachers})
  }


  render() {

    return (

      <View >
        <Header
          rightComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.navigate('AjustesView')} >
            <View style={styles.row}>
              <Image source={require('../assets/ajustes.png')} style={styles.headerImage3} />
            </View>
          </TouchableOpacity>}
          centerComponent={
            <View style={styles.inputContainer2}>

              <TextInput style={styles.inputs2}
                placeholder="¿Que quieres aprender?"
                underlineColorAndroid='transparent'
                onChangeText={value=>this.HadleSearch(value)} />
            </View>
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
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,


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
            ? <View style={{ paddingTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', width: '100%' }}>
              <ActivityIndicator size="large" color="#00BEB1" />
              <Text style={styles.textload}>Cargando profesores ....</Text>
            </View>
            : <FlatList
              keyExtractor={(item, index) => 'key' + index}
              initialNumToRender={8}
              // maxToRenderPerBatch={2}
              data={this.state.fullTeachers}
              renderItem={this.renderItem}
              //  onEndReached={this.loadMore}
              // onEndReachedThreshold={0.5}





            />

        }


      </View>

    );
  }
}
