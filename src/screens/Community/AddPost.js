import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Card, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {postData} from '../NetworkRequest';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Videos from './components/Videos';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AddPost = () => {
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const token = useSelector(state => state?.auth?.token);

  const {setOptions, navigate} = navigation;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addImage = () => {
    launchImageLibrary(
      {
        // maxHeight: 200,
        // maxWidth: 200,
        mediaType: 'photo',
        // includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setImage(response?.assets[0]);
        }
      },
    );
  };

  const addVideo = () => {
    launchImageLibrary(
      {
        maxHeight: 200,
        maxWidth: 200,
        mediaType: 'video',
        // includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setVideo(response?.assets[0]?.uri);
        }
      },
    );
  };

  const sendPost = async () => {
    let formData = new FormData();

    image === null
      ? null
      : formData.append('file', {
          name: image?.fileName,
          type: image?.type,
          uri:
            Platform.OS === 'ios'
              ? image?.uri.replace('file://', '')
              : image?.uri,
        });

    video === null
      ? null
      : formData.append('file', {
          name: 'Post video',
          type: 'video/mp4',
          uri: Platform.OS === 'ios' ? video.replace('file://', '') : video,
        });
    formData.append('title', '');
    formData.append('description', description);
    formData.append('tags', '');
    formData.append(
      'type',
      image === null && video === null
        ? null
        : image === null
        ? 'video'
        : 'image',
    );

    try {
      const res = await postData(token, 'posts/', formData);

      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    }
  };

  useLayoutEffect(() => {
    setOptions({
      headerShown: true,

      headerRight: () => {
        return (
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles?.plusButton}
              colors={['#41B87F', '#86B841']}>
              <TouchableOpacity
                onPress={() =>
                  description === '' && image === null && video === null
                    ? null
                    : sendPost()
                }>
                <Text style={styles?.plusText}>Post</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        );
      },
    });
  });

  return (
    <ScrollView style={{backgroundColor: '#41b87e'}}>
      <Card style={styles.cardConatiener}>
        <TextInput
          style={styles.inputTextCon}
          placeholder="write something here"
          multiline
          onChangeText={text => setDescription(text)}
          value={description}
        />
        {image === null ? null : (
          <Image
            resizeMode="stretch"
            style={{width: 200, height: 200}}
            width={width}
            height={200}
            source={{uri: image?.uri}}
          />
        )}
        {video === null ? null : <Videos data={video} />}
        <View style={styles.iconContainer}>
          <IconButton onPress={addImage} color="gray" icon="image" />
          <IconButton onPress={addVideo} color="gray" icon="video" />
        </View>
      </Card>
    </ScrollView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    position: 'absolute',
    bottom: 0,
  },
  plusButton: {
    width: 60,
    height: 35,
    padding: 5,
    borderRadius: 10,
  },
  plusText: {
    fontSize: 20,
    fontWeight: '500',
    // marginTop: -5,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputTextCon: {
    // height: height - 40,
    // lineHeight: height - 40,
    padding: 30,
    marginVertical: 20,
  },
  cardConatiener: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20,
    justifyContent: 'space-between',
    height: height - 180,
    paddingBottom: 20,
  },
});
