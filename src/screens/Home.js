import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home({navigation})
{
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  // https://reactnative.dev/movies.json
  // http://127.0.0.1:8000/api/courses
  // http://web.art-cloud.com/assets/movies.json
  // http://web.art-cloud.com/api/courses
  const getMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://web.art-cloud.com/api/courses?page=${page}&length=10`, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
      setData([...data, ...json.rows]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoader = () => {
    return (
      isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

  const loadMoreItem = () => {
    setPage(page + 1);
  };


  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <View style={{flex: 1, padding: 24}}>
        <FlatList
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0.5}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Course');
              }}
            >
              <View style={styles.container}>
                <Image 
                  style={styles.image}
                  source={{uri: item.image}} 
                />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
  },
  image: {
    width: 144,
    height: 81,
    marginRight: 10,
  },
  title: {
    height: 20,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});