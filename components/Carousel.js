import React,{Component} from 'react';
import {Linking} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';


export default class Carousel extends Component {
    constructor(props) {
    super(props);
    this.state = {
    images: [

    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://firebasestorage.googleapis.com/v0/b/myclassflix-prod.appspot.com/o/AVATAR.png?alt=media&token=addb518d-64fb-495c-969d-6c21df32a495 '
    ]
    };
    }
    render(){
        return(
            <SliderBox
            images={this.state.images}
            sliderBoxHeight={200}
            onCurrentImagePressed={()=> Linking.openURL('https://www.myclassflix.com/resources')
            }
            dotColor="#00BEB1"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            circleLoop
            />
        )
    }
    }



// CARUSEL PARA SOLO IMAGENES





    // import React,{Component} from 'react';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
// import { Dimensions, StyleSheet,Platform ,View,Text} from 'react-native';
// const { width: screenWidth } = Dimensions.get('window')

// export default class Carrusel extends Component {
//     constructor(props) {
//     super(props);
//     this.state = {
//     images: [

//     'https://source.unsplash.com/1024x768/?water',
//     'https://source.unsplash.com/1024x768/?girl',
//     'https://firebasestorage.googleapis.com/v0/b/myclassflix-prod.appspot.com/o/AVATAR.png?alt=media&token=addb518d-64fb-495c-969d-6c21df32a495 '
//     ]
//     };
//     }



//     _renderItem ({item, index}, parallaxProps) {
//         return (
//             <View style={styles.item}>
//                 <ParallaxImage
//                     source={{ uri: item }}
//                     containerStyle={styles.imageContainer}
//                     style={styles.image}
//                     parallaxFactor={0.4}
//                     {...parallaxProps}
//                 />
//                 <Text style={styles.title} numberOfLines={2}>
//                     { item.title }
//                 </Text>
//             </View>
//         );
//     }
//     render(){
//         return(
//             <Carousel
//             sliderWidth={screenWidth}
//             sliderHeight={screenWidth}
//             itemWidth={screenWidth - 60}
//             data={this.state.images}
//             renderItem={this._renderItem}
//             hasParallaxImages={true}
//         />
//         )
//     }
//     }

//     const styles = StyleSheet.create({
//         item: {
//           width: screenWidth - 60,
//           height: screenWidth - 60,
//         },
//         imageContainer: {
//           flex: 1,
//           marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
//           backgroundColor: 'white',
//           borderRadius: 8,
//         },
//         image: {
//           ...StyleSheet.absoluteFillObject,
//           resizeMode: 'cover',
//         },
//       })