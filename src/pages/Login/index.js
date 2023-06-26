import React, {useState, useEffect} from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import firebase from "../../config/firebaseconfig";
import styles from "./style";
import { MaterialCommunityIcons} from "@expo/vector-icons"


export default function Login({ navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        let user = userCredential.user;
        navigation.navigate("Tarefa", { idUser: user.uid})
    })
    .catch((error) => {
        setErrorLogin(true)
        let errorCode = error.code;
        let errorMessage = error.message;
    });
        }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                navigation.navigate("Tarefa", { idUser: user.uid})

            }
          });
    }, []);

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>Tarefas</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira o seu e-mail"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Insira a sua senha"
                type="text"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            {errorLogin === true
            ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>E-mail ou senha invalidos</Text>
                </View>
            :
                <View/>
            }
                {email === "" || password === "" 
                ?
                    <TouchableOpacity 
                        disabled={true}
                        style={styles.buttonLogin}
                    >
                        <Text style={styles.textButtonLogin}>Login</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        style={styles.buttonLogin}
                        onPress={loginFirebase}
                    >
                        <Text style={styles.textButtonLogin}>Login</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.registration}>
                    Não têm um cadastro? 
                    <Text style={styles.linkSubscribe}
                    onPress={()=> navigation.navigate("NewUser")}>
                        Cadastre-se agora...
                    </Text>
                </Text>
                <View style={{height:100}}/>
        </KeyboardAvoidingView>
    );
}