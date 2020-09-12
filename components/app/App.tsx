import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Formation from "../pages/formation/Formation";
import MyClub from "../pages/my-club/MyClub";

const Drawer = createDrawerNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Formation} />
                <Drawer.Screen name="MyClub" component={MyClub} />
            </Drawer.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
