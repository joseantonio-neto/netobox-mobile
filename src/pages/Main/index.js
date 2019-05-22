import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import styles from "./styles";

import logo from "../../asset/logo.png";

export default class Main extends Component {
  state = {
    newBox: ""
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem("@NetoBox:box");

    if (box) {
      this.props.navigation.navigate("Box");
    }
  }

  handleSignIn = async () => {
    const response = await api.post("boxes", {
      title: this.state.newBox
    });

    await AsyncStorage.setItem("@NetoBox:box", response.data._id);

    this.props.navigation.navigate("Box");
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />

        <TextInput
          style={styles.input}
          placeholder="Crie uma box"
          placeholderTextColor="#888"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={this.state.newBox}
          onChangeText={text => this.setState({ newBox: text })}
        />

        <TouchableOpacity onPress={this.handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
