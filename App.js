import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import Entypo from "react-native-vector-icons/Entypo";

const db = SQLite.openDatabase("notes.db")

function NotesScreen({ navigation }) {
 useEffect(() => {
   navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={addNote}>
        <Entypo 
        name="new-message"
        size={24}
        color="black"
        style={{marginRight: 20}}
        />
        </TouchableOpacity>
   ),
 });
});

function addNote() {
  console.log("Add Note");
}
return <View style={styles.container}></View>;
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name="Notes"
         component={NotesScreen}
         options={{
           headerTitle: "Notes App",
           headerTitleStyle: {
             fontWeight: "bold",
             fontSize: 30,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "yellow",
             borderBottomColor: "#ccc",
             borderBottomWidth: 1,
           },
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
}



const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});


