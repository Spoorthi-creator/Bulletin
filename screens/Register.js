import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input } from 'react-native-elements';
import {
  signInWithEmailAndPassword,
  auth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from '../Firebase';
import firebase from 'firebase';
import db from '../Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Register({ navigation }) {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  //const [confirmPassword, setConfirmPassword] = useState(null);

  async function createAccount() {
    email === '' || password === '' ? alert('required filled missing') : 

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {

        db.collection("users").add({
    name: name,
    email: email,
    uid: firebase.auth().currentUser.uid
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

        alert('Welcome to Bulletin24*7');
        navigation.navigate('All');
        setEmail(null);
        setName(null);
        setPassword(null);
        //setConfirmPassword(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.page}>
      <SafeAreaView>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            //height:30,
            margin: 10,
            marginTop: 230,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginLeft: 15,
              marginTop: 20,
              color: '#A9D4FD',
              alignSelf: 'center',
            }}>
            CREATE ACCOUNT
          </Text>

          <Input
            containerStyle={{
              margin: 10,
            }}
            placeholder="Name"
            placeholderTextColor={'black'}
            value={name}
            onChangeText={(text) => setName(text)}
            leftIcon={
              <Ionicons name="person-outline" size={16} color="black" />
            }
          />

          <Input
            containerStyle={{
              margin: 10,
            }}
            placeholder="Email"
            placeholderTextColor={'black'}
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon={
              <MaterialCommunityIcons
                name="email-outline"
                size={16}
                color="black"
              />
            }
          />

          <Input
            containerStyle={{
              margin: 10,
            }}
            placeholder="Password"
            placeholderTextColor={'black'}
            value={password}
            onChangeText={(value) => setPassword(value)}
            leftIcon={<Icon name="key" size={16} color="black" />}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={createAccount}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
        
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={{ alignContent: 'center', alignSelf: 'center', marginTop:4 }}>
          <Text style={{ fontSize: 16, color:'white' }}>Already have an account? Sign in!</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    height: 50,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(20),
    fontSize: RFValue(30),
  },
  page: {
    backgroundColor: '#6185AA',
    height: '100%',
  },
});
