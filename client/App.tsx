import React, { Component } from "react";
import { Text, View } from 'react-native';
import StyleSheet_App from './styles/StyleSheet_App';

import KeypressRegistryModule from './lib/modules/KeypressRegistryModule';

const Styles = StyleSheet_App();
const KeypressRegistry = new KeypressRegistryModule();

class App extends Component {
  render() {
    return  (
      <View style={Styles.container}>
        <Text style={Styles.text}>{ "up" }</Text>
      </View>
    );
  }
}

export default App;
