import {apiConfig, postMultiForm, putMultiForm, restApiClient} from "../../app/api";
import {TeamDTO} from "./TeamDTO";
import {TeamMemberDTO} from "./TeamMemberDTO";

const baseURl = '/rest/teams/';
const apiCreateTeam = (body, emblem, onSuccess, onError) => {
    let img = null;
    if(emblem) {
        img = {
            name: 'file'
            , filename: emblem.fileName
            , type: emblem.type
            , uri: Platform.OS === "android" ? emblem.uri : emblem.uri.replace("file://", "")
        };
    }

    let payload = {
        name: 'data'
        , data: body
    }

    postMultiForm(baseURl, payload, img, onSuccess, onError);
}

const apiSaveTeam = (body, emblem, onSuccess, onError) => {
    let img = null;
    if(emblem) {
        img = {
            name: 'file'
            , filename: emblem.fileName
            , type: emblem.type
            , uri: Platform.OS === "android" ? emblem.uri : emblem.uri.replace("file://", "")
        };
    }
    console.log("apiSaveTeam: ", body);
    let payload = {
        name: 'data'
        , data: body
    }

    putMultiForm(`${baseURl}${body.id}`, payload, img, onSuccess, onError);
}

const apiSaveTeamMember = (id, body, picture, onSuccess, onError) => {
    let img = null;
    if(picture) {
        img = {
            name: 'file'
            , filename: picture.fileName
            , type: picture.type
            , uri: Platform.OS === "android" ? picture.uri : picture.uri.replace("file://", "")
        };
    }

    let payload = {
        name: 'data'
        , data: body
    }
    console.log("apiSaveTeamMember ", payload);

    putMultiForm(`${baseURl}${id}/team-member`, payload, img, onSuccess, onError);
}

 const apiAllGetTeams = (onSuccess, onError) => {
    restApiClient.get(baseURl).then(resp => {
        if(resp.data) {
            console.log("apiAllGetTeams resp:", resp.DATA);
            const adaptedTeam = resp.data.map( team => {
                console.log("apiAllGetTeams resp 2:", team);
                return new TeamDTO(team.id, team.name,apiConfig.baseUrl + team.emblemURL);
            })
            onSuccess(adaptedTeam);
        }
    }).catch(err => {onError(err)});
}

const apiGetTeam = (teamId, onSuccess, onError) => {
    restApiClient.get(`${baseURl}${teamId}`).then(resp => {
        if(resp.data) {
            const team = resp.data;
            let response = new TeamDTO(team.id, team.name,apiConfig.baseUrl + team.emblemURL);
            response.coaches = team.coaches.map( coach => {
                let member = new TeamMemberDTO(coach.name, apiConfig.baseUrl + coach.picture, coach.mobile);
                member.id = coach.id;
                return member;
            });

            response.players = team.players.map( player => {
                const picture = player.picture ? apiConfig.baseUrl + player.picture: null;
                let member = new TeamMemberDTO(player.name, picture, player.mobile);
                member.id = player.id;
                return member;
            });
            onSuccess(response);
        }
    }).catch(err => {onError(err)});
}

export {
    apiAllGetTeams
    , apiCreateTeam
    , apiSaveTeam
    , apiGetTeam
    , apiSaveTeamMember
}
