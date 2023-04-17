import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const { height, width } = Dimensions.get("window");
const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color:'black'}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color:'black'}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, color:'black'}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            
          backgroundColor: '#1F51FF',
           image: <Image source={require('../assets/UI1.png')} resizeMode='cover'style={{height:300,width:width}}></Image>,
                       title: 'Bulletin24*7',
            subtitle: 'Text here',
          },
          {
            backgroundColor: '#1F51FF',
            image: <Image source={require('../assets/UI2.png')} resizeMode='cover'style={{height:300,width:width}}></Image>,
            title: 'Bulletin',
            subtitle: '  ',
          },
          {
            backgroundColor: '#1F51FF',
            image: <Image source={require('../assets/UI33.png')} resizeMode='cover'style={{height:500,width:width}}></Image>,
            title: 'Bulletin',
            subtitle: "Text here",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});





