import {StackScreenProps} from "@react-navigation/stack";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

type RootProps = {
    MyTeams: undefined;
    TeamProfile: { teamId: string, contactsImported?: number};
    TeamMemberProfile: { teamId: string, teamMemberId?: string};
    PitchFormation: { teamId: string};
    ImportContacts: { teamId: string};
    Members: {teamId: string}
};

type MyTeamsProps = StackScreenProps<RootProps, 'MyTeams'>;
type TeamProfileProps = BottomTabScreenProps<RootProps, 'TeamProfile'>;
type ImportContactsProps = BottomTabScreenProps<RootProps, 'ImportContacts'>;
type PitchFormationProps = BottomTabScreenProps<RootProps, 'PitchFormation'>;
type TeamMemberProfileProps = BottomTabScreenProps<RootProps, 'TeamMemberProfile'>;
type MembersProps = BottomTabScreenProps<RootProps, 'Members'>;


export type {
    MyTeamsProps
    , TeamProfileProps
    , PitchFormationProps
    , ImportContactsProps
    , TeamMemberProfileProps
    , MembersProps
};
