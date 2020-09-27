import {DrawerScreenProps} from "@react-navigation/drawer";

type RootDrawerProps = {
    Home: undefined;
    MyTeam: { teamId: number };
    Formations: { teamId: number};
};

type HomeProps = DrawerScreenProps<RootDrawerProps, 'Home'>;
type MyTeamProps = DrawerScreenProps<RootDrawerProps, 'MyTeam'>;


export type {
    HomeProps
    , MyTeamProps
};
