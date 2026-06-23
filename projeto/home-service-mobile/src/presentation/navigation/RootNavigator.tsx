import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "../screens/DashboardScreen";
import { NewRequestScreen } from "../screens/NewRequestScreen";
import { RequestDetailsScreen } from "../screens/RequestDetailsScreen";
import { RequestsListScreen } from "../screens/RequestsListScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#f4f7f8"
        }
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="RequestsList" component={RequestsListScreen} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
      <Stack.Screen name="NewRequest" component={NewRequestScreen} />
    </Stack.Navigator>
  );
}
