import React, {useCallback, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Card, Avatar, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {postData} from '../../NetworkRequest';
import Videos from '../components/Videos';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const width = Dimensions.get('screen').width;

const Post = ({data}) => {
  const [liked, setLiked] = useState(data?.like_check);
  const [likesCount, setLikesCount] = useState(parseInt(data?.likes));
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  const guest = useSelector(state => state?.auth?.guest);
  const token = useSelector(state => state?.auth?.token);
  const image = useSelector(state => state?.profile?.image);
  const [authVisible, setAuthVisible] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  const likePost = async () => {
    try {
      await postData(token, 'post-like/', {post_uuid: data?.uuid});
    } catch (error) {
      console.log(error.response);
    }
  };

  const createComment = async () => {
    setLoading(true);
    try {
      await postData(token, 'post-comment/', {
        post_uuid: data?.uuid,
        comment: comment,
      });

      setComment('');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Card style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <Avatar.Image
            style={{backgroundColor: 'gray'}}
            size={40}
            source={
              data?.user?.profile_pic
                ? {uri: data?.user?.profile_pic}
                : require('../../../../assets/female.png')
            }
          />
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{data?.user?.name}</Text>
          </View>
        </View>
        <Text
          style={[styles.viewAllButton, {lineHeight: 21}]}
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 4}>
          {data?.description}
        </Text>
        {lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{lineHeight: 21, marginTop: 10}}>
            {textShown ? 'Read less...' : 'Read more...'}
          </Text>
        ) : null}
        {data?.type === 'image' && data?.file ? (
          <Image
            resizeMode="cover"
            style={styles.imageContainer}
            source={{uri: data?.file}}
          />
        ) : null}
        {data?.type === 'video' && data?.file ? (
          <View style={styles.imageContainer}>
            <Videos data={data?.file} />
          </View>
        ) : null}
        {guest ? null : (
          <View style={styles.iconContainer}>
            <View style={styles.iconsContainer}>
              {/* <Icons size={30} name="comment-outline" />
              <Icons size={30} name="share-outline" /> */}
              <Text style={styles.viewAllButton}>{likesCount} likes</Text>
            </View>
            {/* <View>
              <Icons size={30} name="bookmark-outline" />
            </View> */}
            {liked ? (
              <Icons
                size={30}
                name="heart"
                onPress={() => {
                  setLiked(!liked);
                  setLikesCount(likesCount - likesCount);
                  likePost();
                }}
                color="#66cc33"
              />
            ) : (
              <Icons
                size={30}
                onPress={() => {
                  setLiked(!liked);
                  setLikesCount(likesCount + 1);
                  likePost();
                }}
                name="heart-outline"
              />
            )}
          </View>
        )}
        <View style={styles.iconContainer}>
          {data?.comments === '0' ? (
            <Text style={styles.viewAllButton}>No comment yet</Text>
          ) : (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllComments', {
                    uuid: data?.uuid,
                    name: data?.user?.name,
                  })
                }>
                <Text style={styles.viewAllButton}>View all comments</Text>
              </TouchableOpacity>
            </>
          )}
          <Text style={styles.viewAllButton}>
            {moment(data?.created_at).format('DD MMM YYYY')}
          </Text>
        </View>
      </Card>

      {guest ? null : (
        <View style={styles.commentProfile}>
          <Avatar.Image
            style={{backgroundColor: 'gray'}}
            size={40}
            source={
              image ? {uri: image} : require('../../../../assets/female.png')
            }
          />
          <TextInput
            placeholder="Add a comment..."
            multiline
            onChangeText={text => setComment(text)}
            value={comment}
            style={styles.commentBotton}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.postButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={comment === '' ? null : () => createComment()}>
              <View style={styles.postContainer}>
                {loading ? <ActivityIndicator size={10} color="white" /> : null}
                <Text style={styles.postTouch}>Post</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}

      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    width: 60,
    height: 60,
    padding: 3,
    borderRadius: 30,
    // alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  commentBotton: {
    borderRadius: 10,
    width: '65%',
    padding: 10,
    marginHorizontal: 10,
  },

  commentProfile: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 5,
    alignItems: 'flex-end',
  },
  postContainer: {flexDirection: 'row', alignSelf: 'center'},
  postTouch: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  postButton: {
    // marginVertical: height * 0.02,
    width: 70,
    borderRadius: 10,
    marginRight: 20,
    height: 30,
    justifyContent: 'center',
    marginBottom: 5,
  },
  viewAllButton: {
    fontSize: 14,
    color: 'gray',
    paddingTop: 10,
  },
  commentText: {
    // paddingHorizontal: 10,
    fontSize: 14,
    color: 'gray',
  },
  likesText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  imageContainer: {
    width: width - 40,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '700',
  },
  timeText: {
    fontWeight: '400',
    fontSize: 12,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  profileContainer: {
    flexDirection: 'row',
  },
  mainContainer: {
    padding: 20,
  },
  nameContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
export default Post;
