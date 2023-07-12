import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {Formation} from "../pages/formation/Formation";
import {MyTeam} from "../pages/my-team/MyTeam";
import {Home} from "../pages/Home";
import { PaperProvider } from 'react-native-paper';
import { ImportContact } from '../pages/ImportContact';

const Stack = createStackNavigator();
export default function App() {
    return (
        <PaperProvider>

        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
                <Stack.Screen name="MyTeam" component={MyTeam} options={{ title: 'My Team' }}/>
                <Stack.Screen name="Formations" component={Formation} options={{ title: 'Formations' }}/>
                <Stack.Screen name="ImportContacts" component={ImportContact} options={{ title: 'Import Contacts' }}/>

            </Stack.Navigator>
        </NavigationContainer>    
        </PaperProvider>

  );
}
