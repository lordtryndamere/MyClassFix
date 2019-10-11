import React, { Component, PureComponent } from 'react';
import firebase from 'firebase';
import styles from './styles'
import { ListItem, Card, Header, Tooltip, SearchBar } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import { DrawerActions } from 'react-navigation-drawer'
import _ from 'lodash'


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
    habil: ''



  }

  showContainer = (index) => {
    console.log(index.name);
  }

  eliminarDiacriticos = (texto) => {
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }


  componentWillMount() {

    // firebase.database().ref(`/approveds`).limitToLast(20).on('value',(snapshot)=>{
    //   const teachers = snapshot.val();

    firebase.database().ref(`/approveds`).limitToLast(20).on('value', data => {
      let fullData = []
      const teachers = data.val();
      for (const key in teachers) {
        firebase.database().ref(`/teachers/${key}/personalData`).on('value', snapshot => {

          var OBJETO = snapshot.val()
          var uid= key
          var nombre = OBJETO.name
          var surname = OBJETO.surname
          var ranking = OBJETO.ranking
          var country = OBJETO.country
          var photo = OBJETO.linkPhoto
          var tags = OBJETO.tags


          var ojc = {
            key:uid,
            name: nombre,
            lastname: surname,
            rank: ranking,
            pais: country,
            foto: photo,
            tag: tags
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
      this.setState({fullTeachers:fullData})
      // console.log(this.state.fullTeachers)
      // this.setState({ items: teachers })
    });
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
        // key={item.key}
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
        title={item[index]}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        subtitle={item[index]}
        subtitleStyle={{ color: '#bdbdbd' }}
        leftAvatar={{ size: 60, source: { uri: this.state.fullTeachers.foto} }}
        chevron={<Tooltip popover={<Text>Info here</Text>}>
          <Image source={require('../assets/additem.png')} style={{ height: 40, width: 40, borderRadius: 100 }} />
        </Tooltip>

        }
        bottomDivider
        onPress={() => { this.props.navigation.navigate('ProfileView') }}

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

  HadleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    const data = _.filter(this.state.render, user => {
      return contains(user, formatQuery);
    });
    this.setState({ query: formatQuery, data })
  }


  render() {

    return (

      <View >
        <Header
          rightComponent={<TouchableOpacity underlayColor={'rgba(0,0,0,0.2)'} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
            <View style={styles.row}>
              <Image source={require('../assets/ajustes.png')} style={styles.headerImage3} />
            </View>
          </TouchableOpacity>}
          centerComponent={
            <View style={styles.inputContainer2}>

              <TextInput style={styles.inputs2}
                placeholder="¿Que quieres aprender?"
                underlineColorAndroid='transparent'
                onChangeText={this.HadleSearch} />
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
        { console.log(this.state.fullTeachers),
          this.state.fullTeachers.length < 5
            
            ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', width: '100%' }}>
              <ActivityIndicator size="large" color="blue" />
              <Text style={styles.textload}>Cargando profesores ....</Text>
            </View>
            : <FlatList
              keyExtractor={(item, index) => 'key' + index}
              initialNumToRender={8}
              maxToRenderPerBatch={2}
              data={this.state.fullTeachers}
              renderItem={this.renderItem}
              //  onEndReached={this.loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={<ActivityIndicator size="large" color="blue" />}
              
         
             
              
            />
        
        }


      </View>

    );
  }
}
