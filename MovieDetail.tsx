import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from './hooks';
import {getSelectedMovie} from './store/movies';

const MovieDetail: React.FC = () => {
  const movie = useAppSelector(getSelectedMovie);

  return movie ? (
    <View style={styles.container}>
      <Text style={styles.titleText}>{movie.title}</Text>
      <View style={styles.content}>
        <Text style={styles.overviewText}>{movie.overview}</Text>
        <Text style={styles.smallText}>Rating: {movie.vote_average}</Text>
        <Text style={styles.smallText}>Release date: {movie.release_date}</Text>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: Dimensions.get('screen').height - 70,
    height: Dimensions.get('screen').height * 0.8,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    backgroundColor: '#343434',
    marginTop: 20,
    padding: 16,
  },
  content: {
    marginTop: 16,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  overviewText: {
    color: 'white',
    fontSize: 15,
  },
  smallText: {
    marginTop: 12,
    color: 'white',
  },
});

export default MovieDetail;
