import {unwrapResult} from '@reduxjs/toolkit';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Movie} from './api/types/movie';
import {useAppDispatch, useAppSelector} from './hooks';
import MovieDetail from './MovieDetail';
import {
  loadUpcomingMovies,
  selectAllMovies,
  selectLoadingMoviesError,
  setSelectedMovie,
  getSelectedMovie,
} from './store/movies';

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAllMovies);
  const error = useAppSelector(selectLoadingMoviesError);
  const [page, setPage] = useState(1);
  const [isToggled, setIsToggled] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const selectedMovie = useAppSelector(getSelectedMovie);

  useEffect(() => {
    loadMore();
  }, []);

  const setSelectedMovieId = (movie: Movie) => {
    dispatch(setSelectedMovie(movie.id));
  };

  const loadMore = useCallback(() => {
    dispatch(loadUpcomingMovies(page))
      .then(unwrapResult)
      .then(result => {
        if (result.length > 1 && selectedMovie === undefined) {
          setSelectedMovieId(result[0]);
        }
        setPage(page + 1);
      });
  }, [dispatch, page, selectedMovie]);

  const renderItem = ({item}: {item: Movie}) => {
    return (
      <MovieItem
        movie={item}
        onPress={movie => {
          setSelectedMovieId(movie);
        }}
      />
    );
  };

  const toggle = useCallback(() => {
    Animated.timing(translateY, {
      useNativeDriver: true,
      toValue: isToggled ? 0 : -(Dimensions.get('screen').height * 0.7),
      duration: 500,
      easing: Easing.cubic,
    }).start();

    setIsToggled(!isToggled);
  }, [isToggled]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: translateY,
            },
          ],
        }}>
        {selectedMovie && (
          <Image
            resizeMode="cover"
            style={styles.imageBackground}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`,
            }}
          />
        )}
        {!!error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            style={styles.horizontalList}
            contentContainerStyle={styles.horizontalListContent}
            horizontal
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={MovieSeparator}
            onEndReachedThreshold={0.2}
            onEndReached={item => {
              loadMore();
            }}
          />
        )}
        <TouchableOpacity onPress={toggle}>
          <Text style={{textAlign: 'center', padding: 8, fontSize: 16}}>
            Details
          </Text>
        </TouchableOpacity>
        <MovieDetail />
      </Animated.View>
    </View>
  );
};

type MovieItemProps = {
  movie: Movie;
  onPress?: (item: Movie) => void;
};

const MovieItem: React.FC<MovieItemProps> = ({movie, onPress}) => {
  return (
    <View style={styles.shadowContainer}>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            if (onPress) onPress(movie);
          }}>
          <Image
            style={{width: 64, height: 96}}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MovieSeparator: React.FC = () => {
  return <View style={{width: 20}}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowContainer: {
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    borderRadius: 8,
  },
  itemContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  horizontalList: {
    flex: 2,
    flexGrow: 0,
    bottom: 36,
    position: 'absolute',
  },
  horizontalListContent: {
    padding: 20,
  },
});

export default MovieList;
