import AlertComponent from "../components/common/AlertComponent";
import { Team } from "../domain/Team";
import { apiConfig, restApiClient } from "./api";
import { apiSaveTeam } from "./TeamApi";
import { TeamDTO } from "./TeamDTO";
import { TeamMemberDTO } from "./TeamMemberDTO";
import TeamRepositoryInterface from "./TeamRepositoryInterface";

const baseURl = '/rest/teams/';
export default class TeamRepositoryRemote implements TeamRepositoryInterface {

    constructor() { }

    getTeam = (teamId: Number) => {
        let team: Team = new Team(null, null, null);
        restApiClient.get(`${baseURl}${teamId}`).then((resp: { data: any; }) => {
            if (resp.data) {
                const teamDTO = resp.data;
                let response = new TeamDTO(teamDTO.id, teamDTO.name, apiConfig.baseUrl + teamDTO.emblemURL);
                response.coaches = teamDTO.coaches.map((coach: { name: string; picture: string; mobile: string; id: number | undefined; }) => {
                    let member = new TeamMemberDTO(coach.name, apiConfig.baseUrl + coach.picture, coach.mobile);
                    member.id = coach.id;
                    return member;
                });

                response.players = teamDTO.players.map((player: { picture: string; name: string; mobile: string; id: number | undefined; }) => {
                    const picture = player.picture ? apiConfig.baseUrl + player.picture : null;
                    let member = new TeamMemberDTO(player.name, picture, player.mobile);
                    member.id = player.id;
                    return member;
                });

                team = response.toTeam();
            }
        }).catch((error: any) => {
            console.error("getTeam", error)
        });

        return team;
    }

    saveTeam = (team: Team) => {
        const teamDTO = new TeamDTO(team.id, team.name, "");

        apiSaveTeam(teamDTO, team.emblem, (response: any) => {
            AlertComponent({ title: "Saved Successful", message: "Saved Team Successfully" });
            console.log("Response apiSaveTeam is", response);
        },
            (error: any) => {
                AlertComponent({ title: "Error", message: "Error saving Team" });
                if (error.response)
                    console.log(error.response.data);

                if (error.request)
                    console.log(error.request);

                console.log('Error', error.message);
            });
    }

    //     apiCreateTeam = (body, emblem, onSuccess, onError) => {
    //         let img = null;
    //         if(emblem) {
    //             img = {
    //                 name: 'file'
    //                 , filename: emblem.fileName
    //                 , type: emblem.type
    //                 , uri: Platform.OS === "android" ? emblem.uri : emblem.uri.replace("file://", "")
    //             };
    //         }

    //         let payload = {
    //             name: 'data'
    //             , data: body
    //         }

    //         postMultiForm(baseURl, payload, img, onSuccess, onError);
    //     }

    //  apiSaveTeam = (body, emblem, onSuccess, onError) => {
    //         let img = null;
    //         if(emblem) {
    //             img = {
    //                 name: 'file'
    //                 , filename: emblem.fileName
    //                 , type: emblem.type
    //                 , uri: Platform.OS === "android" ? emblem.uri : emblem.uri.replace("file://", "")
    //             };
    //         }
    //         console.log("apiSaveTeam: ", body);
    //         let payload = {
    //             name: 'data'
    //             , data: body
    //         }

    //         putMultiForm(`${baseURl}${body.id}`, payload, img, onSuccess, onError);
    //     }

    //     apiSaveTeamMember = (id, body, picture, onSuccess, onError) => {
    //         let img = null;
    //         if(picture) {
    //             img = {
    //                 name: 'file'
    //                 , filename: picture.fileName
    //                 , type: picture.type
    //                 , uri: Platform.OS === "android" ? picture.uri : picture.uri.replace("file://", "")
    //             };
    //         }

    //         let payload = {
    //             name: 'data'
    //             , data: body
    //         }
    //         console.log("apiSaveTeamMember ", payload);

    //         putMultiForm(`${baseURl}${id}/team-member`, payload, img, onSuccess, onError);
    //     }

    //      apiAllGetTeams = (onSuccess, onError) => {
    //         restApiClient.get(baseURl).then(resp => {
    //             if(resp.data) {
    //                 console.log("apiAllGetTeams resp:", resp.DATA);
    //                 const adaptedTeam = resp.data.map( team => {
    //                     console.log("apiAllGetTeams resp 2:", team);
    //                     return new TeamDTO(team.id, team.name,apiConfig.baseUrl + team.emblemURL);
    //                 })
    //                 onSuccess(adaptedTeam);
    //             }
    //         }).catch(err => {onError(err)});
    //     }

    // setTeamMemberRemote = (teamId: Number, teamMember: TeamMember,  type: string) => {
    //     let teamMemberDTO =  TeamMemberDTO.fromTeamMember(teamMember);
    //     teamMemberDTO.type  = type;

    //     if(teamMemberDTO.isValid()) {
    //         apiSaveTeamMember(teamId, teamMemberDTO, teamMember.picture, (response: any) => {
    //                 AlertComponent({title: "Saved Successful", message: "Saved Member Successfully"});
    //                 console.log("Response apiSaveTeam is", response);

    //                 // Transform response data to TeamMeber
    //                 // this.addMemberToTeam(response.data);
    //                 // this.getTeam();
    //             },
    //             (error: any) => {
    //                 AlertComponent({title: "Error", message: "Error saving Team"});
    //                 if (error.response)
    //                     console.log(error.response.data);

    //                 if (error.request)
    //                     console.log(error.request);

    //                 console.log('Error', error.message);
    //             });
    //     }
    // };

}