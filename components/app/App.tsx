import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Formation from "../pages/formation/Formation";
import {MyTeam} from "../pages/my-team/MyTeam";
import {Home} from "../pages/Home";

const Drawer = createDrawerNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="MyTeam" component={MyTeam} />
                <Drawer.Screen name="Formations" component={Formation} />

            </Drawer.Navigator>
        </NavigationContainer>
  );
}