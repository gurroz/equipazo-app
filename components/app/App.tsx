import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { ImportContact } from '../pages/ImportContact';
import { TeamMemberProfile } from "../pages/my-team/TeamMemberProfile";
import { TeamProfile } from "../pages/my-team/TeamProfile";
import { MyTeams } from "../pages/MyTeams";
import { Members } from '../pages/my-team/Members';
import { PitchFormation } from '../pages/formation/PitchFormation';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

const TeamNav = createMaterialBottomTabNavigator();
function Tabscreen() {
    return (
        <TeamNav.Navigator>
            <TeamNav.Screen name="MyTeams" component={MyTeams} options={{ title: 'Switch Teams', headerShown: false, tabBarIcon: 'home-group' }} />
            <TeamNav.Screen name="TeamProfile" component={TeamProfile} options={{ title: 'My Team', tabBarIcon: 'home-heart' }} />
            <TeamNav.Screen name="Members" component={Members} options={{ title: 'Members', tabBarIcon: 'account-multiple-plus-outline' }} />
            <TeamNav.Screen name="PitchFormation" component={PitchFormation} options={{ title: 'Formations', tabBarIcon: 'soccer-field' }} />
        </TeamNav.Navigator>
    );
}

const HomeNav = createStackNavigator();
function MyTeamsScreen() {
    return (
        <HomeNav.Navigator initialRouteName="MyTeams">
            <HomeNav.Screen name="MyTeams" component={MyTeams} options={{ title: 'My Teams', headerShown: false }} />
            <HomeNav.Screen name="TeamProfile" component={Tabscreen} />
            <HomeNav.Screen name="ImportContacts" component={ImportContact} options={{ title: 'Import Contacts' }} />
            <HomeNav.Screen name="TeamMemberProfile" component={TeamMemberProfile} options={{ title: 'Team Member Profile' }} />
        </HomeNav.Navigator>
    );
}

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                {MyTeamsScreen()}
            </NavigationContainer>
        </PaperProvider>

    );
}