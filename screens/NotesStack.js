import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";

const InnerStack = createStackNavigator();

export default function NotesStack() {
    return (
        <InnerStack.Navigator>
          <InnerStack.Screen
            name="Notes"
            component={NotesScreen}
            options={{
              headerTitle: "Todo list",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerStyle: {
                height: 120,
                backgroundColor: "purple",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              },
            }}
          />
        </InnerStack.Navigator>
      );
     }