import {apiConfig, postMultiForm, restApiClient} from "../../app/api";

const apiSaveTeam = (body, emblem, onSuccess, onError) => {
    let img = {
        name: 'file'
        , filename: emblem.fileName
        , type: emblem.type
        , uri: Platform.OS === "android" ? emblem.uri : emblem.uri.replace("file://", "")
    };

    let payload = {
        name: 'teamData'
        , data: body
    }

    postMultiForm('/rest/teams/', payload, img, onSuccess, onError);
}

 const apiGetTeams = (onSuccess, onError) => {
    restApiClient.get('/rest/teams/').then(resp => {
        if(resp.data) {
            const adaptedTeam = resp.data.map( team => {
                return {
                    id: team.id
                    , name: team.name
                    , emblemURL: apiConfig.baseUrl + team.emblemURL
                }
            })
            onSuccess(adaptedTeam);
        }
    }).catch(err => {onError(err)});
}

const apiGetTeam = (teamId, onSuccess, onError) => {
    restApiClient.get(`/rest/teams/${teamId}`).then(resp => {
        if(resp.data) {
            const adaptedTeam = {
                id: resp.data.id
                , name: resp.data.name
                , emblemURL: apiConfig.baseUrl + resp.data.emblemURL
            }

            onSuccess(adaptedTeam);
        }
    }).catch(err => {onError(err)});
}

export {
    apiGetTeams
    , apiSaveTeam
    , apiGetTeam
}