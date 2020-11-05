import * as axios from "axios";
import RNFetchBlob from 'rn-fetch-blob'

const OK = 200;
const CREATED = 201;

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

const fetchMultiForm = (method, url, form, file) => {
    const header = {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
    };

    const data = [];
    if(form) {
        data.push({ name : form.name, type: 'application/json', data : JSON.stringify(form.data)});
    }

    if(file) {
        data.push({ name : 'file', filename : file.filename, type:file.type, data: RNFetchBlob.wrap(file.uri)});
    }

    return RNFetchBlob.fetch(method, apiConfig.baseUrl + url , header, data);
}

const postMultiForm = (url, form, file, onSuccess, onError) => {
    fetchMultiForm('POST', url, form, file).then((response) => {
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

const putMultiForm = (url, form, file, onSuccess, onError) => {
    fetchMultiForm('PUT', url, form, file).then((response) => {
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
    , putMultiForm
    , apiConfig
};