import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import React, {Component} from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {MyTeamProps} from "../../app/Router";
import ImagePickerComponent from "../../common/ImagePickerComponent";
import {apiGetTeam} from "./MyTeamApi";
import AlertComponent from "../../common/AlertComponent";

type MyClubState = {
    imgFile: any
    , imgSrc: string
    , name: string
    , id: number
    , coaches: any
    , players: any
    , modalImage: any
    , modalName: string
    , modalVisible: boolean
    , modalType : string
}

type Member = {
    name: string
    , image: string
}
export class MyTeam extends Component<MyTeamProps, MyClubState> {
    constructor(props: MyTeamProps) {
        super(props);

        this.state = {
            id: props.route.params.teamId
            , imgFile: null
            , imgSrc: ''
            , name: ''
            , coaches: []
            , players: []
            , modalImage: null
            , modalName: ''
            , modalVisible: false
            , modalType: ''
    };
    }

    componentDidMount = () => {
        this.getTeam();
    }

    getTeam = () => {
        console.log("Calling getTeam");
        apiGetTeam(this.state.id, (response: any) => {
                console.log("Response getTeam is", response);
                this.setState({imgSrc:response.emblemURL, name: response.name})
            },
            (error: any) => {
                AlertComponent({title: "Error", message:"Error getting Team"});
                if(error.response)
                    console.log(error.response.data);

                if(error.request)
                    console.log(error.request);

                console.log('Error', error.message);
            });
    }

    updateImage= (img: any) => {
        this.setState({imgFile: img});
    };

    updateModalImage= (img: any) => {
        this.setState({modalImage: img});
    };

    addCoach = () => {
        this.setState({modalVisible: true, modalType: 'coaches'});
    }
    addPlayer = () => {
        this.setState({modalVisible: true, modalType: 'players'});
    }

    saveMember = () => {
        const listType = this.state.modalType ? this.state.modalType : 'coaches';
        console.log("Type is", listType);
        const currentList = this.state[listType as keyof MyClubState];
        let currentMembers = Object.assign([], currentList);
        const newMember = {
            name: this.state.modalName,
            image: this.state.modalImage.uri
        }

        currentMembers.push(newMember);

        if(listType === 'coaches') {
            this.setState({coaches: currentMembers, modalVisible: false, modalImage: null, modalName: ''});
        } else {
            this.setState({players: currentMembers, modalVisible: false, modalImage: null, modalName: ''});
        }
    };

    renderListItem = (item: Member, index: number) => {
        return <View key={index}>
            <Image
                style={styles.tinyLogo}
                source={{ uri: item.image}}
            />
            <Text style={styles.listItem}>{item.name}</Text>
        </View>
    }
    render() {
        const imgSrc = this.state.imgFile ? this.state.imgFile.uri : this.state.imgSrc;
        return (
            <SafeAreaView>
                <View style={styles.body}>
                    <Text style={styles.h1}>My Team</Text>
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
                        </View>
                    </View>

                    <View>
                        <Text style={styles.h2}>Coaches</Text>
                        <Button title="Add Coach" onPress={this.addCoach}/>
                    </View>

                    <View style={styles.lists}>
                        <FlatList
                            data={this.state.coaches}
                            renderItem={({item, index}) => this.renderListItem(item, index)}
                        />
                    </View>

                    <View>
                        <Text style={styles.h2}>Players</Text>
                        <Button title="Add Coach" onPress={this.addPlayer}/>
                    </View>
                    <View style={styles.lists}>
                        <FlatList
                            data={this.state.players}
                            renderItem={({item, index}) => this.renderListItem(item, index)}
                        />
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.teamBlock}>
                                <ImagePickerComponent
                                    imgURI={this.state.modalImage ? this.state.modalImage.uri : ''}
                                    onSelectImg={this.updateModalImage}
                                />

                                <TextInput
                                    style={styles.newPlayerInput}
                                    onChangeText={text => this.setState({modalName: text})}
                                    value={this.state.modalName}
                                />
                                <Button title="Save" onPress={this.saveMember}/>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    h2: {
        color: 'white',
        textAlign:'left',
        fontSize:18,
        marginTop:8
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
    lists: {
        flex: 1,
        backgroundColor: "white",
    },
    listItem: {
        color: 'black',
        padding: 10,
        fontSize: 18,
        height: 44,
    }
    , centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
    , modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    newPlayerInput : {
        height: 40,
        marginTop:2,
        borderWidth: 0,
        color: Colors.black
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});