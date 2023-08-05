import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { MyTeams } from "../pages/MyTeams";
import { ImportContact } from '../pages/ImportContact';
import { Formation } from "../pages/formation/Formation";
import { TeamProfile } from "../pages/my-team/TeamProfile";
import { TeamMemberProfile } from "../pages/my-team/TeamMemberProfile";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

const Stack = createStackNavigator();
export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MyTeams">
                    <Stack.Screen name="MyTeams" component={MyTeams} options={{ title: 'MyTeams' }} />
                    <Stack.Screen name="TeamProfile" component={TeamProfile} options={{ title: 'My Team' }} />
                    <Stack.Screen name="Formations" component={Formation} options={{ title: 'Formations' }} />
                    <Stack.Screen name="ImportContacts" component={ImportContact} options={{ title: 'Import Contacts' }} />
                    <Stack.Screen name="TeamMemberProfile" component={TeamMemberProfile} options={{ title: 'Team Member Profile' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );
}
