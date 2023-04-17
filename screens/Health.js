import React,{useState,useEffect} from 'react';
import { View,Text,Alert,StyleSheet } from "react-native";
import {services} from '../services/service';
import {NativeBaseProvider,FlatList,ScrollView,Divider,Image,Spinner} from 'native-base';
import { RFValue } from "react-native-responsive-fontsize";
import moment from 'moment';

export default function All() {
    const [newsData,setNewsData] = useState([]);
    useEffect(()=>{
      services('health').then(data=>{
        setNewsData(data)
      })
      .catch(error=>{
        alert(error);
      })  
    },[])
    return(
    <NativeBaseProvider>
    <ScrollView height={850}>
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
    </ScrollView>
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