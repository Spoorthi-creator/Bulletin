import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
//import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "./screens/OnboardingScreen";
import Sports from './screens/Sports';
import Business from './screens/Business';
import Tech from './screens/Tech';
import Entertainment from './screens/Entertainment';
import All from './screens/All';
import Login from "./screens/Login";
import Register from "./screens/Register";
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
 "EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`."
]);
const Stack = createStackNavigator();
const StackNav = () => {
  return(
  <Stack.Navigator initialRouteName="OnboardingScreen"  useLegacyImplementation={true}   screenOptions={{
    headerShown: false,
    gestureEnabled: false
  }}>
    
     <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="Register" component={Register}  options={{headerShown:false}}/>
     <Stack.Screen name="Login" component={Login}  options={{headerShown:false}}/> 
    <Stack.Screen name="All" component={All}  options={{headerShown:false}}/>
    <Stack.Screen name="Sports" component={Sports} options={{headerShown:true}}/>
    <Stack.Screen name="Business" component={Business} options={{headerShown:true}}/>
    <Stack.Screen name="Tech" component={Tech} options={{headerShown:true}}/>
    <Stack.Screen name="Entertainment" component={Entertainment}options={{headerShown:true}} />
   
  </Stack.Navigator>)
}


export default function App() {
  return (
    <NavigationContainer>
    <StackNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

























// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import {Icon} from 'react-native-elements';
// import All from './screens/All';
// import Business from './screens/Business';
// import Health from './screens/Health';
// import Sports from './screens/Sports';
// import Tech from './screens/Tech';
// import Entertainment from './screens/Entertainment';

// const Tab = createBottomTabNavigator();

// export default function App(){
//   return(
//     <NavigationContainer>
//       <All/>
//     {/* <Tab.Navigator>
//     <Tab.Screen name="All" component={All}
//     options={{tabBarIcon:(props)=>(
//       <Icon type='ionicon' name='globe-outline' color={props.color}/> 
//     ), headerShown:false}}
//     />
//     <Tab.Screen name="Business" component={Business}
//     options= {{tabBarIcon:(props)=>(
//       <Icon type='ionicon' name='bar-chart-outline' color={props.color}/>
//     ), headerShown:false}}
//     />
//     <Tab.Screen name="Health" component={Health}
//     options={{tabBarIcon:(props)=>(
//       <Icon type='ionicon' name='fitness-outline' color={props.color}    />
//     )}}
//     />
//     <Tab.Screen name="Sports" component={Sports}
//     options={{tabBarIcon:(props)=>(
//       <Icon type='ionicon' name='tennisball-outline' color={props.color}/>
//     )}}
//     />
//     <Tab.Screen name="Entertainment" component={Entertainment}
//     options={{tabBarIcon:(props)=>(
//       <Icon type='ionicon' name='film-outline' color={props.color}/>
//     )}}
//     />
//     <Tab.Screen name="Tech" component={Tech}
//     options={{tabBarIcon:(props)=>(
//       <Icon type='ionicon' name='game-controller-outline' color={props.color}/>
//     )}}
//     />
//     </Tab.Navigator> */}
//     </NavigationContainer>
//   )
// }
