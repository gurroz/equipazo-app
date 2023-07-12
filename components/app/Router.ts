import {DrawerScreenProps} from "@react-navigation/drawer";

type RootDrawerProps = {
    Home: undefined;
    MyTeam: { teamId: string, contactsImported?: number};
    Formations: { teamId: string};
    ImportContacts: { teamId: string};
};

type HomeProps = DrawerScreenProps<RootDrawerProps, 'Home'>;
type MyTeamProps = DrawerScreenProps<RootDrawerProps, 'MyTeam'>;
type ImportContactsProps = DrawerScreenProps<RootDrawerProps, 'ImportContacts'>;
type FormationsProps = DrawerScreenProps<RootDrawerProps, 'Formations'>;


export type {
    HomeProps
    , MyTeamProps
    , FormationsProps
    , ImportContactsProps
};
