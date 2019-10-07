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