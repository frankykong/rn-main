import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // https://reactnative.dev/movies.json
  // http://127.0.0.1:8000/api/courses
  // http://web.art-cloud.com/assets/movies.json
  // http://web.art-cloud.com/api/courses
  const getMovies = async () => {
     try {
      const response = await fetch('http://web.art-cloud.com/api/courses', {
        headers: 
        {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const json = await response.json();

      console.log(json);

      setData(json.rows);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.title}</Text>
          )}
        />
      )}
    </View>
  );
};