import React, {Component, Fragment} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Profile extends Component
{
    render()
    {
        return(
            <Fragment>
                <ImageBackground source={require('../img/cafe.jpg')} style={style.container}>
                    <View style={{ position: "absolute", marginTop: 15, marginLeft: 15 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack()}}>
                            <Icon name="arrowleft" style={{ color: "#fff", fontSize: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <Image source={{ uri: 'https://st4.depositphotos.com/5934840/20525/v/600/depositphotos_205253058-stock-video-young-man-cartoon-hd-animation.jpg'}} style={style.imageProfile} />
                    <View style={style.userProfile}>
                        <Text style={style.userName}>This Profile</Text>
                        <TouchableOpacity>
                            <Icon name="edit" style={style.ico} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={style.profileContainer}>
                    <View style={style.profileItem}>
                        <Icon name="idcard" style={style.profileIcon} />
                        <Text style={style.profileName}>Username</Text>
                    </View>
                    <View style={style.profileItem}>
                        <Icon name="mail" style={style.profileIcon} />
                        <Text style={style.profileName}>e-mail</Text>
                    </View>
                    <View style={style.profileItem}>
                        <Icon name="phone" style={style.profileIcon} />
                        <Text style={style.profileName}>Phone Number</Text>
                    </View>
                </View>
                <View style={style.logout}>
                    <TouchableOpacity onPress={() => {alert('Logout')}}>
                        <Icon name="poweroff" style={style.powerIco} />
                    </TouchableOpacity>
                </View>
            </Fragment>
        )
    }
}

const style = StyleSheet.create({
    container:{
        display: "flex",
        width: "100%",
        height: "70%"
    },
    imageProfile:{
        marginTop: 50,
        width: 150,
        height: 150,
        borderRadius: 150,
        alignSelf: "center",
        marginBottom: 30
    },
    userName:{
        fontSize: 30,
        color: "#fff"
    },
    userProfile:{
        alignSelf: "center",
        flexDirection: "row"
    },
    ico:{
        marginLeft: 15,
        color: "#fff",
        fontSize: 25,
        // marginRight: 20
    },
    profileContainer:{
        display: "flex",
        // justifyContent: "flex-start",
        marginTop: -100,
        alignSelf: "center"
    },
    profileItem:{
        flexDirection: "row",
        marginTop: 25
    },
    profileIcon:{
        fontSize: 20,
        marginRight: "20%"
    },
    profileName:{
        fontSize: 20
    },
    logout:{
        marginTop: 50,
        alignSelf: "center",
        
    },
    powerIco:{
        fontSize: 30
    }
});