import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

type Movie = {id: number; name: string};

const MovieList: React.FC = () => {
  const movies: Movie[] = [
    {
      id: 1,
      name: 'aaa',
    },
    {
      id: 2,
      name: 'bbb',
    },
  ];

  const renderItem = ({item}: {item: Movie}) => {
    return <MovieItem movie={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

type MovieItemProps = {movie: Movie};

const MovieItem: React.FC<MovieItemProps> = ({movie}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{movie.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default MovieList;
