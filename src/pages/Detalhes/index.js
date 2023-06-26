import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native"

import firebase from "../../config/firebaseconfig.js"
import styles from "./style"


export default function Detalhes({navigation, route}){
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const idTarefa = route.params.id
    const database = firebase.firestore()

    function editTarefa(description, id){
        database.collection(route.params.idUser).doc(id).update({description: description, 
        })
        navigation.navigate("Tarefa", { idUser: user.uid})
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.input}
            placeholder="Ex: Estudar react native"
            onChangeText={setDescriptionEdit}
            value={descriptionEdit}
            />
            <TouchableOpacity 
            style={styles.novaTarefa}
            onPress={()=>{
                editTarefa(descriptionEdit, idTarefa)
            }}
            >
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}