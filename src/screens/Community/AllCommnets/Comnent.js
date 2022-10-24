import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import moment from 'moment';

const SingleComment = ({data}) => {
  return (
    <View>
      <View style={styles.commentsContainer}>
        <Avatar.Image
          size={40}
          source={
            data?.comment_by?.profile_pic === null
              ? require('../../../../assets/general/profile.png')
              : {uri: data?.comment_by?.profile_pic}
          }
        />
        <View style={{marginHorizontal: 10, width: '85%'}}>
          <Text style={styles.nameMain}>{data?.comment_by?.name}</Text>
          <Text style={styles.textComment}>{data?.comment}</Text>
          <View style={styles.replyContainer}>
            <Text style={styles.textReply}>
              {moment(Date.now()).diff(moment(data?.created_at), 'days') < 1
                ? `${moment(Date.now()).diff(
                    moment(data?.created_at),
                    'hours',
                  )} hour ago`
                : moment(Date.now()).diff(moment(data?.created_at), 'days') > 7
                ? `${moment(Date.now()).diff(
                    moment(data?.created_at),
                    'week',
                  )} week`
                : `${moment(Date.now()).diff(
                    moment(data?.created_at),
                    'days',
                  )} day ago`}
            </Text>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  replyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },

  textComment: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  textReply: {
    fontSize: 14,
    fontWeight: '500',
    color: 'gray',
  },
  nameMain: {
    fontSize: 14,
    fontWeight: '700',
  },
  commentsContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    margin: 10,
  },
  iconContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SingleComment;
