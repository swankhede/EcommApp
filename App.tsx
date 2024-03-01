import 'react-native-gesture-handler';
import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import MainStack from './src/navigation/MainStack';



const App = () => {


  return (
    <View style={styles.root}>

      <MainStack />

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
