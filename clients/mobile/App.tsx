import React, { Component } from "react";
import { AppState,
  Button,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import StyleSheet_App from './styles/StyleSheet_App';

import GameModule from './lib/modules/GameModule';

const Styles = StyleSheet_App();
const Game = new GameModule();
Game.initialize();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      last_cmd: '--'
    }
  }

  _registerCommand(cmd) {
    Game.player.commands.register(cmd);
    this.state.last_cmd = cmd;
    this.setState(this.state);
  }

  _unregisterCommand(cmd) {
    Game.player.commands.unregister(cmd);
    this.state.last_cmd = '...';
    this.setState(this.state);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState);
    if (typeof this.state.appState !== undefined) {
      if (nextAppState === 'active') {
        Game.player.create();
      } else {
        Game.destroy();
      }
    }
    this.setState({appState: nextAppState});
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  render() {
    return  (
      <View style={Styles.container}>
        <TouchableWithoutFeedback
          onPressIn={ () => this._registerCommand('move/up') }
          onPressOut={ () => this._unregisterCommand('move/up') }>
          <View style={ Styles.button }>
            <Text style={ Styles.touchable }>Up</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={ () => this._registerCommand('move/right') }
          onPressOut={ () => this._unregisterCommand('move/right') }>
          <View style={ Styles.button }>
            <Text style={ Styles.touchable }>Right</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={ () => this._registerCommand('move/down') }
          onPressOut={ () => this._unregisterCommand('move/down') }>
          <View style={ Styles.button }>
            <Text style={ Styles.touchable }>Down</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={ () => this._registerCommand('move/left') }
          onPressOut={ () => this._unregisterCommand('move/left') }>
          <View style={ Styles.button }>
            <Text style={ Styles.touchable }>Left</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={Styles.text}>{ this.state.last_cmd }</Text>
      </View>
    );
  }
}

export default App;
