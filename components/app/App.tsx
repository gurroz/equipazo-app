import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
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

const Drawer = createDrawerNavigator();
export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="MyTeams">
                    <Drawer.Screen name="MyTeams" component={MyTeams} options={{ title: 'MyTeams' }} />
                    <Drawer.Screen name="TeamProfile" component={TeamProfile} options={{ title: 'My Team' }} />
                    <Drawer.Screen name="Formations" component={Formation} options={{ title: 'Formations' }} />
                    <Drawer.Screen name="ImportContacts" component={ImportContact} options={{ title: 'Import Contacts' }} />
                    <Drawer.Screen name="TeamMemberProfile" component={TeamMemberProfile} options={{ title: 'Team Member Profile' }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </PaperProvider>

    );
}
