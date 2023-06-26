import React,{useState}  from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import firebase from "../../config/firebaseconfig"
import styles from "./style"
import { MaterialCommunityIcons} from "@expo/vector-icons"


export default function NewUser({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState("");

    const register = ()=> {
        firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
         let user = userCredential.user;
         navigation.navigate('Tarefa',{})
    })
    .catch((error) => {
        setErrorRegistered(true);
        let errorCode = error.code;
        let errorMessage = error.message;
        
    });
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>Crie uma conta no app Tarefas</Text>
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

            {errorRegister === true
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
                        style={styles.buttonRegister}
                    >
                        <Text style={styles.textButtonRegister}>Criar</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        style={styles.buttonRegister}
                        onPress={register}
                    >
                        <Text style={styles.textButtonRegister}>Criar</Text>
                    </TouchableOpacity>
                }
                        <Text style={styles.login}>
                    Ja têm uma conta? 
                    <Text style={styles.linkLogin}
                    onPress={()=> navigation.navigate("Login")}>
                        Login...
                    </Text>
                </Text>
                <View style={{height:100}}/>    
        </KeyboardAvoidingView>
    );
}