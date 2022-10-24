import React, {useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Post from './components/Post';
import {getPaginationData} from '../NetworkRequest';
import {usePaginatorParams} from '../../custom_hooks/pagination_params_hook';
import EmptyComponent from '../Components/EmptyComponent';
import PlaceholderImage from '../../../assets/emptyProduct.svg';
import WelcomeScreen from '../../screens/Community/components/WelcomeScreen';

const height = Dimensions.get('screen').height;

const Community = () => {
  const navigation = useNavigation();
  const guest = useSelector(state => state?.auth?.guest);
  const register = useSelector(state => state?.auth?.register);
  const [isLoading, isRefreshing, posts, loadMore, refreshPosts] =
    usePaginatorParams(getPaginationData, 'posts/', {page: 1});
  const {setOptions, navigate} = navigation;

  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    setOptions({
      headerShown: true,

      headerRight: () => {
        return guest ? null : <View></View>;
      },
    });
  }, [guest, navigate, navigation, setOptions]);

  useEffect(() => {
    refreshPosts();
  }, [isFocused]);
  return isLoading && posts?.length === 0 ? (
    <View style={styles.indicatorContainerStyle}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : register ? (
    <WelcomeScreen />
  ) : (
    <View>
      <FlatList
        data={posts}
        refreshing={isRefreshing}
        onRefresh={refreshPosts}
        onEndReached={loadMore}
        renderItem={({item}) => {
          return <Post data={item} />;
        }}
        keyExtractor={(_, index) => `${index}`}
        ListFooterComponent={() => (
          <FooterLoadingComponent
            loading={isLoading}
            resultLength={posts.length}
          />
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            isRefreshing ? null : (
              <View style={styles.indicatorContainer}>
                <ActivityIndicator color="#66cc33" />
              </View>
            )
          ) : (
            <EmptyComponent
              Svg={PlaceholderImage}
              message={'No post available yet from your circle '}
              messageTitle={'No Post'}
            />
          )
        }
      />
      {/* <Post /> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles?.plusButton}
        colors={['#41B87F', '#86B841']}>
        <TouchableOpacity onPress={() => navigate('AddPost')}>
          <Text style={styles?.plusText}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
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

const styles = StyleSheet.create({
  indicatorContainerStyle: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    // width: 40,
    // height: 40,
    // // marginBottom: 10,
    // borderRadius: 20,
    // // alignSelf: 'center',
    // // position: 'absolute',
    // // bottom: 10,
    // // right: 10,
    // alignItems: 'center',
    // justifyContent: 'center',

    width: 60,
    height: 60,
    padding: 3,
    borderRadius: 30,
    // alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 35,
    fontWeight: '700',
    marginTop: -5,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default Community;
