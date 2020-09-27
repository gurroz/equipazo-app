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
import {Colors} from "react-native/Libraries/NewAppScreen";
import {apiGetTeams, apiSaveTeam} from "./my-team/MyTeamApi";
import {TeamDTO} from "./my-team/TeamDTO";
import AlertComponent from "../common/AlertComponent";
import {HomeProps} from "../app/Router";
import ImagePickerComponent from "../common/ImagePickerComponent";


type HomeState = {
    imgFile: any
    , name: string
    , teams: any
}

const DEFAULT_NAME = "My Team";

export class Home extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        this.state = {
            imgFile: null
            , name: DEFAULT_NAME
            , teams: []
        };
    }

    componentDidMount = () => {
        this.getTeams();
    }

    saveTeam = () => {
        const teamDTO = new TeamDTO(this.state.name);
        apiSaveTeam(teamDTO, this.state.imgFile, (response: any) => {
                AlertComponent({title: "Saved Successful", message:"Saved Team Successfully"});
                console.log("Response apiSaveTeam is", response);
                this.getTeams();
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
                console.log("Response getTeams is", response);
                this.setState({teams: response, imgFile: null, name: DEFAULT_NAME})
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

    teamDetail = (teamId: number) => {
        this.props.navigation.navigate('MyTeam', {teamId})
    }

    updateImage= (img: any) => {
        this.setState({imgFile: img});
    };

    render() {
        const imgSrc = this.state.imgFile ? this.state.imgFile.uri : '';
        return (
                <SafeAreaView>
                    <View style={styles.body}>
                        <Text style={styles.h1}>My Teams</Text>
                        <View style={styles.imageSections}>
                            <View style={styles.teamBlock}>
                                <ImagePickerComponent
                                    imgURI={imgSrc}
                                    onSelectImg={this.updateImage}
                                />
                                <TextInput
                                    style={styles.newTeamInput}
                                    onChangeText={text => this.setState({name: text})}
                                    value={this.state.name}
                                />
                                <TouchableOpacity onPress={this.saveTeam} >
                                    <Text style={styles.btnText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.teams && this.state.teams.map( (team: any, i: number) =>
                                <TouchableHighlight  key={i} onPress={() => this.teamDetail(team.id)}>
                                    <View style={styles.teamBlock}>
                                        <Image
                                            source={{ uri: team.emblemURL }}
                                            style={styles.images}
                                            resizeMode={"cover"}
                                        />
                                        <Text style={styles.btnText}>{team.name}</Text>
                                    </View>
                                </TouchableHighlight>
                                )}
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
    imageSections: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        paddingHorizontal: 1,
        paddingVertical: 1,
    },
    teamBlock: {
        flex: 1,
        flexBasis: Dimensions.get('window').width / 2 - 5,
        flexGrow: 0,
        paddingTop:2
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
