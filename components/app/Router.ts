import {DrawerScreenProps} from "@react-navigation/drawer";

type RootDrawerProps = {
    MyTeams: undefined;
    TeamProfile: { teamId: string, contactsImported?: number};
    TeamMemberProfile: { teamId: string, teamMemberId?: string};
    Formations: { teamId: string};
    ImportContacts: { teamId: string};
};

type MyTeamsProps = DrawerScreenProps<RootDrawerProps, 'MyTeams'>;
type TeamProfileProps = DrawerScreenProps<RootDrawerProps, 'TeamProfile'>;
type ImportContactsProps = DrawerScreenProps<RootDrawerProps, 'ImportContacts'>;
type FormationsProps = DrawerScreenProps<RootDrawerProps, 'Formations'>;
type TeamMemberProfileProps = DrawerScreenProps<RootDrawerProps, 'TeamMemberProfile'>;


export type {
    MyTeamsProps
    , TeamProfileProps
    , FormationsProps
    , ImportContactsProps
    , TeamMemberProfileProps
};
