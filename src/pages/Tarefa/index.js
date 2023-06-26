import React, {useState,useEffect } from "react";
import { 

    View,
    Text,
    TouchableOpacity,
    FlatList
} from "react-native"

import firebase from "../../config/firebaseconfig.js"
import {FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons"
import styles from "./style";

export default function Tarefa({navigation, route }){
const [tarefa, setTarefa] = useState([])
const database = firebase.firestore()
    function logout(){
        firebase.auth().signOut().then(() => {
           navigation.navigate('Login')
          }).catch((error) => {
            
          });
    }

    function deletarTarefa(id){
        database.collection(route.params.idUser).doc(id).delete()
    }

    useEffect(()=>{
        database.collection(route.params.idUser).onSnapshot((query)=>{
            const list = []
            query.forEach((doc)=>{
                list.push({...doc.data(), id: doc.id})
            })
            setTarefa(list)
        })
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tarefa}
                renderItem={( item)=>{
                        return(
                    <View style={styles.Tarefas}>
                        <TouchableOpacity
                            style={styles.deletarTarefa}
                            onPress={() => {
                                deletarTarefa(item.id)
                            }}>
                        <FontAwesome
                            name="star"
                            size={23}
                            color="#F92e6A"
                            >
                        </FontAwesome>    
                        </TouchableOpacity>
                        <Text
                        style={styles.descricaoTarefa}
                        onPress={()=>{
                            navigation.navigate("Detalhes",{
                            id: item.id,
                            description: item.description,
                            idUser: route.params.idUser
                        })
                            }}
                        >
                        {item.description}

                        </Text>
                    </View>
                        )
                }}
                
            />
            <TouchableOpacity
                style={styles.buttonNovaTarefa}
                onPress={() => navigation.navigate("Nova Tarefa", { idUser: route.params.idUser})}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonLogout}
                onPress={()=>{ logout()}}
            >
                <Text style={styles.iconButtonLogout}>
                    <MaterialCommunityIcons
                    name= 'location-exit'
                    size={23}
                    color='#F92E6A'
                    />
                </Text>
            </TouchableOpacity>
        </View>
    )
}