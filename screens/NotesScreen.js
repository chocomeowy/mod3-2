import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 FlatList,
 TouchableOpacity,
 } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ route, navigation }) {
    const [notes, setNotes] = useState([]);

    function refreshNotes() {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM notes",
          null,
          (txobj, {rows: { _array }}) => setNotes(_array),
          (txobj, error) => console.log("error ", error)
        );
      });
    }

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS
          notes
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            done INT);`
        );
      },
      null,
      refreshNotes
      );
    },[]);
  
   useEffect(() => {
     navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Entypo 
          name="add-to-list"
          size={24}
          color="black"
          style={{marginRight: 20}}
          />
          </TouchableOpacity>
     ),
   });
  });
  
  useEffect(() => {
    if (route.params?.text) {

      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0,?)", [
          route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
      
    }
  }, [route.params?.text]);
 
 
  function addNote() {
    navigation.navigate("Add Note");
 }
  
 function deleteNote(id) {
  console.log("Deleting " + id);
  db.transaction(
    (tx) => {
      tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
    },
    null,
    refreshNotes
  );
}



  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
        <Entypo name="trash" size={16} color="#944" />
      </TouchableOpacity>
 
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
      />
    </View>
  );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ccccff",
      alignItems: "center",
      justifyContent: "center",
    },
   });
   
   
   



