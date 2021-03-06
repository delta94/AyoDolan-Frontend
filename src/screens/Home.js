import React, { Component } from "react";
import { Text, View, AsyncStorage, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.bootstrapAsync();
  }

  exit = async () => {
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
    this.props.navigation.navigate("Login");
  };

  bootstrapAsync = async () => {
    let id = await AsyncStorage.getItem("id");
    let token = await AsyncStorage.getItem("Token");
    this.setState({
      id: id,
      token: token,
      loading: false
    });
    this.props.dispatch(getUser(id))    
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, Home!</Text>

        <TouchableOpacity onPress={this.exit}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Text>{this.state.id}</Text>
        <Text>{this.state.token}</Text>
      </View>
    );
  }
}
