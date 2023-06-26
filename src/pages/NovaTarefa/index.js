import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native"
import firebase from "../../config/firebaseconfig.js"
import styles from "./style.js"

export default function NovaTarefa({navigation, route}){
    const [description, setDescricao] = useState(null)
    const database = firebase.firestore()   
    function addTarefa(){
        database.collection(route.params.idUser).add({
            description: description,
            status: false
        })
        navigation.navigate("Tarefa", route.params.idUser)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.input}
            placeholder="Ex: Estudar react native"
            onChangeText={setDescricao}
            value={description}/>
            <TouchableOpacity 
            style={styles.novaTarefa}
            onPress={()=>{
                addTarefa()
            }}
            >
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}