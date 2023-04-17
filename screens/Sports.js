import React,{useState,useEffect} from 'react';
import { View,Text,Alert,StyleSheet,Pressable } from "react-native";
import {services} from '../services/service';
import {NativeBaseProvider,FlatList,ScrollView,Divider,Image,Spinner} from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import moment from 'moment';
import { db} from "../Firebase"
import firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
export default function Sports() {
    const [newsData,setNewsData] = useState([]);
    const [favourite,setFavourite]=useState('hearto')
    const[saveFav,setSaveFav]=useState(false)
    const favouriteVisibility = () => {
      if (favourite === 'heart') {
        setFavourite('hearto');
       
        setSaveFav(!saveFav);
        saveData(saveFav);
     
      } else if (favourite === 'hearto') {
        setFavourite('heart');
       
        setSaveFav(!saveFav);
        saveData(saveFav);
       
      }
    };

    async function getFavData(){
      var docRef = db.collection("favourites").doc(firebase.auth().currentUser.uid);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
    }
    useEffect(()=>{
      services('sports').then(data=>{
        setNewsData(data)
      })
      .catch(error=>{
        alert(error);
      }) 
    //  saveData () 
    },[])

    async function saveData(saveFav){
      db.collection("favourites").doc(firebase.auth().currentUser.uid).set({
        favouriteSports:saveFav ,
        userId: firebase.auth().currentUser.uid,
       
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    }

    
    return(
    <NativeBaseProvider>
   
    <Pressable onPress={favouriteVisibility}>
    <AntDesign name={favourite} size={24} color="red" />
        </Pressable>
    {newsData.length > 1?(
    <View style={styles.newsCard}>
    <FlatList
    data={newsData}
    renderItem={({item})=>(
      <View style={styles.cardContainer}>
      <Image
      width={null}
      height={400}
      resizeMode={"cover"}
      source={{
        uri:item.urlToImage,
      }}
      alt="Alternate Text"
      />
      <View>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.date}>{moment(item.publishedAt).format('LLLL')}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <Divider my={5} bg="#000"/>
      </View>
    )}
    keyExtractor={(item)=>item.id}
    />
    </View>
    ):(
      <View style={styles.spinner}>
      <Spinner color="danger.400"/>
      </View>
    )}
   
    </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
  titleText:{
    fontWeight:"bold",
    fontSize:RFValue(13)
  },
  date:{
    color:"#076da1",
    fontSize:RFValue(11)
  },
  descriptionText:{
    //marginBottom:10
    fontSize:RFValue(12)
  },
  cardContainer: {
    flex: 0.85,
    margin: RFValue(10),
    borderRadius: RFValue(5),
    //borderWidth:2,
    padding:10,
    backgroundColor:"#ECECEA"
  },
  newsCard:{
    backgroundColor:"#076da1"
  },
  spinner:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:600
  }
})