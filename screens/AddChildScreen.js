import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Button} from "react-native-elements";


export default class AddChildScreen extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        image: null,
    };

    componentDidMount() {
        this.getPermissionAsync().then();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({image: result.uri});
            }
        } catch (E) {
            console.log(E);
        }
    };

    saveImage = () => {
        alert("Image saved!")
    }

    render() {
        let {image} = this.state;
        return (
            <View style={styles.container}>
                <View style={{alignItems: "center", height: 200, justifyContent: "center"}}>
                    <Image source={require("../assets/images/addChild.png")} resizeMode='cover'/>
                </View>
                <ScrollView style={styles.container} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
                    <Button title=" Pick Image " onPress={this._pickImage} style={{padding: 20}}/>
                    {image && <Image source={{uri: image}} style={{width: 300, height: 300}}/>}
                    {image && <Button title=" Save Image " onPress={this.saveImage} style={{padding: 20}}/>}

                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
