import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Moment from 'moment';

export default function Course({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  // `http://web.art-cloud.com/api/courses?page=${page}&length=10`
  const url = `http://web.art-cloud.com/api/course/271`;
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
      // console.log(json);
      setData(json.course);


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
    // <View>
    //     {/* <Text>{data.about}</Text> */}
    //     <Text>test</Text>
    // </View>

    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <Text>Loading...</Text>

      ) : (
        <>
          <View>
            <Image style={styles.image} source={{uri: data.largePicture}} />
            <Text>{data.title}</Text>
            <Text>——{data.subtitle}</Text>
            <Text>简介：{data.about}</Text>
            <Text>点击：{data.hitNum}</Text>
            <Text>{Moment(data.createdTime).format('Y/m/d')}</Text>
          </View>
          <View>
            <Image
              style={styles.avatar}
              source={{uri: data.user.largeAvatar}}
            />
            <View>
              <Text>{data.user.nickname}</Text>
              <Text>{data.user.title}</Text>
            </View>
          </View>
          <View>

            {data.lessons.map((r) => (
              <TouchableOpacity
                key={r.id}
                onPress={() => {
                  navigation.navigate('Lesson');
                }}
              >
                <Text>{r.title}</Text>
              </TouchableOpacity> 

            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 144,
    height: 81,
    marginRight: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    margin: 2,
  },
});
