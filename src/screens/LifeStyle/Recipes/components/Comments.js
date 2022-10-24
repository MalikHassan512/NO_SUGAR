import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Card} from 'react-native-paper';
import SingleComment from '../../../Community/AllCommnets/Comnent';
import ButtonSvg from '../../../../../assets/sendButton.svg';
import {postData, getData} from '../../../NetworkRequest';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/core';

const Comments = ({data}) => {
  const [comment, setComment] = useState();
  const [commentData, setCommentData] = useState([]);
  const {params} = useRoute();
  const token = useSelector(state => state?.auth?.token);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const clickHandler = async () => {
    try {
      await postData(token, 'recipe-comment/', {
        comment: comment,
        recipe_uuid: params?.uuid,
      });
      // console.log(comment);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = text => {
    setComment(text);
  };

  const getComment = async () => {
    try {
      const data = await getData(token, 'recipe-comment/', {
        recipe_uuid: params?.uuid,
        limit: '3',
      });
      setCommentData(data?.results);
      // console.log(data?.results)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  const arr = [
    {
      url: '../../../../../assets/general/profile.png',
    },
    {url: '../../../../../assets/general/recipes.png'},
    {url: '../../../../../assets/general/thumnail.png'},
  ];

  return (
    <View>
      <View style={styles.commentsContainer}>
        <Text style={styles.textMain}>Comments</Text>
        <View style={styles.iconContainer}>
          <Icons size={24} name="comment-outline" />
          <Text style={styles.noofComments}>{data?.total_comments}</Text>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{flexDirection: 'row'}}>
            <Icons size={24} name="chevron-down" />
          </TouchableOpacity>
        </View>
      </View>
      {visible ? (
        <>
          {commentData &&
            commentData.map((item, index) => (
              <SingleComment key={index} data={item} />
            ))}

          {data?.total_comments ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('All Comments', {
                  uuid: params?.uuid,
                  recipe: true,
                })
              }>
              <Text style={styles.viewAllButton}>View all</Text>
            </TouchableOpacity>
          ) : null}

          {/* <TextInput 
        mode="flat"
        label=""
        style={{borderRadius: 40}}
        placeholder="Type something"
      /> */}
          <Card style={{padding: 10, borderRadius: 20}}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={onChangeHandler}
                value={comment}
                placeholder="Add a comment..."
                multiline
                style={{width: '80%', paddingBottom: 10, paddingHorizontal: 10}}
              />

              <TouchableOpacity onPress={clickHandler}>
                <ButtonSvg width={35} height={35} />
              </TouchableOpacity>
            </View>
          </Card>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  commentsbutContainer: {
    padding: 5,

    width: Dimensions.get('window').width - 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: 2,
    marginHorizontal: 10,
  },

  inputContainer: {
    borderColor: 'gray',
    borderRadius: 20,
    //   borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-end',
  },

  viewAllButton: {
    color: '#66CC33',
    fontWeight: '600',
    fontSize: 14,
    margin: 20,
    textAlign: 'center',
  },
  noofComments: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 5,
    marginRight: 20,
  },
  textMain: {
    fontSize: 24,
    fontWeight: '400',
  },
  commentsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
  },
});

export default Comments;
