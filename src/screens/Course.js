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


export default function Course({navigation})
{
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
  
    // `http://web.art-cloud.com/api/courses?page=${page}&length=10`
    const url = `http://web.art-cloud.com/api/course/271`
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const json = await response.json();
        console.log(json);
        setData(json.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
        getData();
        // fetch(url)
        // .then(response => response.json())
        // // 4. Setting *dogImage* to the image url that we received from the response above
        // .then(data => setDogImage(data.data))
    }, []);

    //console.log(dogImage);



    return (
        <View>
            <Text>{data.title}</Text>
        </View>
    );
};