import * as axios from "axios";
import RNFetchBlob from 'rn-fetch-blob'

const OK = 200;
const CREATED = 200;

const apiConfig = {
    baseUrl: 'http://10.0.0.4:8080'
};

const restApiClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Access-Control-Allow-Origin': '*'
        , Accept: 'application/json'
    }
});

const postMultiForm = (url, body, image, onSuccess, onError) => {
    console.log(image);

    const header = {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
    };

    const data = [
        { name : 'teamData', type: 'application/json', data : JSON.stringify(body.data)}
        , { name : 'file', filename : image.filename, type:image.type, data: RNFetchBlob.wrap(image.uri)}
    ]

    RNFetchBlob.fetch('POST', apiConfig.baseUrl + url , header, data).then((response) => {
        console.log("RESP:", response);
        if(response
            && response.respInfo
            && (response.respInfo.status === OK
                || response.respInfo.status === CREATED)) {
            onSuccess(response);
        } else {
            throw response;
        }
    }).catch(onError);
};

export {
    restApiClient
    , postMultiForm
    , apiConfig
};