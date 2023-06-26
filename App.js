import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tarefa from "./src/pages/Tarefa";
import NovaTarefa from "./src/pages/NovaTarefa";
import Detalhes from "./src/pages/Detalhes";
import Login from "./src/pages/Login";
import NewUser from "./src/pages/NewUser";


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}/>
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{
            headerShown: false,
          }}/>          
        <Stack.Screen
          name="Tarefa"
          component={Tarefa}
          options={{
            headerTintColor:"#f92e6a",
            headerLeft: null,
          }}/>
        <Stack.Screen
          name="Nova Tarefa"
          component={NovaTarefa}
          options={{
            headerTintColor:"#f92e6a"
          }}/>
        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{
            headerTintColor:"#f92e6a"
          }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


