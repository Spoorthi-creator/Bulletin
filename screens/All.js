import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Platform,Dimensions } from 'react-native';
import { services } from '../services/service';
import { NativeBaseProvider, FlatList, Image, Spinner, Pressable } from 'native-base';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';
import  db from "../Firebase"
import firebase from 'firebase';
const { height, width } = Dimensions.get("window");
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  await Notifications.scheduleNotificationAsync({
        content: {
          title: "Bulletin24*7",
          body: 'Did you check whats happening today!',
          data: {  },
        },
        trigger: { hour: 9,minute:0,repeats:true },
      });
  alert('You have successfully subscribed for notifications')
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


export default function All({ navigation }) {
  const [newsData, setNewsData] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const[name,setName]=useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    services('general')
      .then((data) => {
        setNewsData(data);
        console.log(data)
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const getName=()=>{
    db.collection('users')
    .where('uid', '==',firebase.auth().currentUser.uid )
    .onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        setName(doc.data().name);
      //  this.setState({ name: doc.data().name });
      });
    });
  }
  useEffect(()=>{
  getName ();
  },[])
  return (
    <NativeBaseProvider>
      <ScrollView>
        {newsData.length > 1 ? (
          <View style={styles.newsCard} >
            <View
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor: 'white',
                //marginTop:10,
                padding: 5,
                borderTopRightRadius: RFValue(20),
                borderTopLeftRadius: RFValue(20),
              }}>
              <Text
                style={{
                  alignSelf:'center',
                 // alignSelf:'flex-start',
                  fontSize: 25,
                  color: 'black',
                  fontWeight: 'bold',
                  margin: 10,
                  marginTop: 15,
                  padding: 3,
                }}>
                Hello {name}!!
              </Text>
              <TouchableOpacity onPress={async () => {
              await sendPushNotification(expoPushToken);}} style={{alignSelf:'flex-end',margin:15,}}>
              <FontAwesome name="bell-o" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                margin: 15,
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Headlines
            </Text>
            <FlatList

              horizontal
              data={newsData}
              renderItem={({ item }) => (
                <Pressable
                onPress={()=>WebBrowser.openBrowserAsync(item.url)}>
                <View style={styles.cardContainer} >
                  <Image
                    width={300}
                    height={200}
                    resizeMode={'cover'}
                    source={{
                      uri: item.urlToImage,
                    }}
                    alt="Alternate Text"
                  />
                  <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.date}>
                      {moment(item.publishedAt).format('LLLL')}
                    </Text>
                    <Text style={styles.descriptionText}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
            />

            <Text
              style={{
                margin: 15,
                fontSize: 25,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Explore
            </Text>

            <View style={styles.iconsContainer}>
              <ScrollView horizontal>
                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('International')}>
                  <Image
                    source={require('../assets/sports.png')}
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center', marginLeft: 5 }}>
                    International
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Sports')}>
                  <Image
                    source={require('../assets/sports.png')}
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Sports</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Business')}>
                  <Image
                    source={require('../assets/business.png')}
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Business</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Tech')}>
                  <Image
                    source={require('../assets/tech.jpg')}
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Technology</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Health')}>
                  <Image
                    source={require('../assets/icon.png')}
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Health</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Science')}>
                  <Image
                    source={require('../assets/icon.png')}
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center' }}>Science</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  stye={{
                    margin: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Entertainment')}>
                  <Image
                    source={require('../assets/entertainment.jpg')}
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      padding: 10,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                    alt="Alternate Text"></Image>
                  <Text style={{ alignSelf: 'center', marginRight: 5 }}>
                    Entertainment
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.spinner}>
            <Spinner color="danger.400" />
          </View>
        )}
     </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: RFValue(13),
  },
  date: {
    color: '#076da1',
    fontSize: RFValue(11),
  },
  descriptionText: {
    //marginBottom:10
    fontSize: RFValue(12),
  },
  cardContainer: {
    // flex: 0.85,
    //margin: 20,
    width: 300,
    height: height/1.7,
    //borderRadius: 30,
    margin: RFValue(5),
    borderRadius: RFValue(5),
    //borderWidth:2,
    padding: 10,
    backgroundColor: '#ECECEA',
  },
  newsCard: {
    backgroundColor: '#6185AA',
    // borderRadius:10,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },
  iconsContainer: {
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    backgroundColor: 'white',
  },
});
