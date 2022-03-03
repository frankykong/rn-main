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
// import VideoPlayer from 'react-native-video-player';

export default function Course({navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
  
    // `http://web.art-cloud.com/api/courses?page=${page}&length=10`
    const url = `http://web.art-cloud.com/api/lesson/2160`;
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
        setData(json.data);
  
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);

  return(

    <View style={{flex: 1, padding: 24}}>
    {isLoading ? (
      <Text>Loading...</Text>

    ) : (
      <>
        {/* <Video source={{uri: data.video.path}}   // Can be a URL or a local file.
            ref={(ref) => {
                this.player = ref
            }}                                      // Store reference
            style={styles.backgroundVideo} 

            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
        /> */}

        {/* //https://www.npmjs.com/package/react-native-video-player */}
        {/* <VideoPlayer
            video={{ uri: data.video.path }}
            videoWidth={600}
            videoHeight={300}
            thumbnail={{ uri: 'http://web.art-cloud.com/files/course/2017/04-26/61d4fc348c8db_L.jpg' }}
        /> */}

        <View>
          <Text>{data.title}</Text>
          <Text>{data.summary}</Text>
          <Text>时长：{ data.lenth ?? '--' }</Text>
          <Text>{Moment(data.createdTime).format('Y/m/d')}</Text>
        </View>
      </>
    )}
  </View>

  )
};


// Later on in your styles..
var styles = StyleSheet.create({
    backgroundVideo: {
        width: 350,
        height:200,
    },
  });