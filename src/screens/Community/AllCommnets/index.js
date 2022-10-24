import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {postData, getPaginationData} from '../../NetworkRequest';
import {usePaginatorParams} from '../../../custom_hooks/pagination_params_hook';
import SingleComment from '../../Community/AllCommnets/Comnent';
import ButtonSvg from '../../../../assets/sendButton.svg';
import {useSelector} from 'react-redux';

const AllComments = () => {
  const {params} = useRoute();
  const [comment, setComment] = useState('');
  const guest = useSelector(state => state?.auth?.guest);
  const token = useSelector(state => state?.auth?.token);
  const [isLoading, isRefreshing, comments, loadMore, refreshComments] =
    usePaginatorParams(getPaginationData, 'post-comment/', {
      page: 1,
      post_uuid: params?.uuid,
    });
  console.log(comments);
  const createComment = async () => {
    try {
      await postData(token, 'post-comment/', {
        post_uuid: params?.uuid,
        comment: comment,
      });

      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={comments}
        refreshing={isRefreshing}
        onRefresh={refreshComments}
        onEndReached={loadMore}
        style={{
          marginBottom: 80,
        }}
        renderItem={({item}) => {
          return <SingleComment data={item} />;
        }}
        keyExtractor={(_, index) => `${index}`}
        ListFooterComponent={() => (
          <FooterLoadingComponent
            loading={isLoading}
            resultLength={comments.length}
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View style={styles.indicatorContainer}>
              <ActivityIndicator color="#66cc33" />
            </View>
          );
        }}
      />
      {/* <Post /> */}
      {guest ? null : (
        <Card style={styles.commentsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add a comment..."
              multiline
              onChangeText={text => setComment(text)}
              value={comment}
              style={{width: '80%', paddingBottom: 10, paddingHorizontal: 10}}
            />
            <TouchableOpacity onPress={() => createComment()}>
              <ButtonSvg width={35} height={35} />
            </TouchableOpacity>
          </View>
        </Card>
      )}
    </View>
  );
};
const FooterLoadingComponent = ({loading, resultLength}) => {
  if (loading && resultLength > 0) {
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator color={'#66cc3'} />
      </View>
    );
  } else {
    return null;
  }
};
export default AllComments;
const styles = StyleSheet.create({
  commentsContainer: {
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
});
