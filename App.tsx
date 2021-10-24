import React from 'react';
import {Provider} from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import MovieList from './MovieList';
import {store} from './store/store';
import MovieDetail from './MovieDetail';

const App: React.FC = () => {
  const isDarkMode = useColorScheme();

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor="transparent"
        />
        <MovieList />
        {/* <MovieDetail /> */}
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
