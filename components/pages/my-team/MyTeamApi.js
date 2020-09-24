import {postMultiForm, restApiClient} from "../../app/api";

const apiSaveTeam = (body, emblem, onSuccess, onError) => {

    // payload.append("teamData", JSON.stringify(body));

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

    postMultiForm('/teams/', payload, img, onSuccess, onError);
}

 const apiGetTeams = (onSuccess, onError) => {
    restApiClient.get('/teams/').then(resp => {onSuccess(resp)}).catch(err => {onError(err)});
}

export {apiGetTeams, apiSaveTeam}