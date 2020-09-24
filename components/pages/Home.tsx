import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import React, {Component} from "react";
import ImagePicker from 'react-native-image-picker';
import {Colors} from "react-native/Libraries/NewAppScreen";
import {apiGetTeams, apiSaveTeam} from "./my-team/MyTeamApi";
import {TeamDTO} from "./my-team/TeamDTO";
import AlertComponent from "../common/AlertComponent";

interface IProps {
}

type HomeState = {
    imgFile: any
    , name: string
}

export class Home extends Component<IProps, HomeState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            imgFile: null
            , name: 'My Team'
        };
    }

    componentDidMount = () => {
        this.getTeams();
    }

    chooseImage = () => {
        let options = {
            title: 'Select Image',
            // customButtons: [
            //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // console.log('response', JSON.stringify(response));
                this.setState({imgFile: response});
            }
        });
    }

    renderFileUri() {
        if (this.state.imgFile) {
            return <Image
                source={{ uri: this.state.imgFile.uri }}
                style={styles.images}
            />
        } else {
            return <Image
                source={require('../../assets/images/myTeam-dummy.png')}
                style={styles.images}
            />
        }
    }
    saveTeam = () => {
        const teamDTO = new TeamDTO(this.state.name);
        apiSaveTeam(teamDTO, this.state.imgFile, (response: any) => {
                AlertComponent({title: "Saved Successful", message:"Saved Team Successfully"});
                console.log("Response apiSaveTeam is", response);
            },
            (error: any) => {
                AlertComponent({title: "Error", message:"Error saving Team"});
                if(error.response)
                    console.log(error.response.data);

                if(error.request)
                    console.log(error.request);

                console.log('Error', error.message);
            });
    }

    getTeams = () => {
        console.log("Calling getTeam");
        apiGetTeams((response: any) => {
                console.log("Response getTeams is", response.data);
            },
            (error: any) => {
                AlertComponent({title: "Error", message:"Error getting Teams"});
                if(error.response)
                    console.log(error.response.data);

                if(error.request)
                    console.log(error.request);

                console.log('Error', error.message);
            });
    }

    render() {
        return (
                <SafeAreaView>
                    <View style={styles.body}>
                        <Text style={styles.h1}>My Teams</Text>
                        <View style={styles.ImageSections}>
                            <View>
                                <TouchableHighlight onPress={this.chooseImage}>
                                    {this.renderFileUri()}
                                </TouchableHighlight>

                                <TextInput
                                    style={styles.newTeamInput}
                                    onChangeText={text => this.setState({name: text})}
                                    value={this.state.name}
                                />
                                <TouchableOpacity onPress={this.saveTeam} >
                                    <Text style={styles.btnText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.black,
        color: Colors.white,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
    },
    h1: {
        color: 'white',
        textAlign:'center',
        fontSize:20,
        paddingBottom:8
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 1,
        paddingVertical: 1,
    },
    newTeamInput : {
        height: 40,
        marginTop:2,
        borderWidth: 0,
        color: Colors.white
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop:10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight:'bold'
    }
});
