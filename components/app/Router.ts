import {DrawerScreenProps} from "@react-navigation/drawer";

type RootDrawerProps = {
    Home: undefined;
    MyTeam: { teamId: string };
    Formations: { teamId: string};
};

type HomeProps = DrawerScreenProps<RootDrawerProps, 'Home'>;
type MyTeamProps = DrawerScreenProps<RootDrawerProps, 'MyTeam'>;
type FormationsProps = DrawerScreenProps<RootDrawerProps, 'Formations'>;


export type {
    HomeProps
    , MyTeamProps
    , FormationsProps
};
