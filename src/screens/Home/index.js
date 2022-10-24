import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import {SliderBox} from 'react-native-image-slider-box';
import MyCravings from './components/MyCravings';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import {getData} from '../NetworkRequest';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {getActivityValue} from '../../redux/actions/homeStatActions';
import {useDispatch} from 'react-redux';
import ModalAuth from '../../components/ModalAuth';
import ProgressModal from '../Home/components/ProgressModal';
import HomeIcon from '../../../assets/general/carbscalculator';
import RecommendedProducts from '../Products/components/NewProduct';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Home = () => {
  const {navigate} = useNavigation();
  const activityValue = useSelector(state => state?.activityValue?.activity);
  const [loading, setLoading] = useState(true);
  const currentOrder = useSelector(state => state?.craving?.order);
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();
  const [authVisible, setAuthVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const guest = useSelector(state => state?.auth?.guest);
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);
  const getActivityData = async () => {
    try {
      await dispatch(getActivityValue(token));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    try {
      const data = await getData(token, 'RecentProduct/', {
        country: 'CA',
      });
      // setProducts(data);
      setProducts(data);
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };
  useEffect(() => {
    getActivityData();
    getProducts();
  }, [isFocused]);
  return loading ? (
    <View style={styles.activityContainer}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <>
      {authVisible && (
        <ModalAuth
          isVisible={authVisible}
          onClose={() => setAuthVisible(false)}
        />
      )}
      {modalVisible && (
        <ProgressModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      )}
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.sliderContainer}>
          <SliderBox
            ImageComponent={FastImage}
            imageLoadingColor="#66CC33"
            images={[
              require('../../../assets/general/poster1.png'),
              require('../../../assets/new/posterqoutes1.png'),
              require('../../../assets/new/posterqoutes2.png'),
              require('../../../assets/general/poster2.png'),
              require('../../../assets/general/poster4.png'),
              require('../../../assets/general/poster3.png'),
              require('../../../assets/general/poster5.png'),
              require('../../../assets/general/poster7.png'),
            ]}
            sliderBoxHeight={260}
            dotColor="#66CC33"
            inactiveDotColor="#90A4AE"
            onCurrentImagePressed={i =>
              i === 2
                ? guest
                  ? setAuthVisible(true)
                  : navigate('ProductScreen')
                : i === 3
                ? guest
                  ? setAuthVisible(true)
                  : navigate('CarbsCalculator')
                : i === 4
                ? navigate('CrushMyCraving')
                : i === 5
                ? guest
                  ? setAuthVisible(true)
                  : navigate('DailyIntakeScreen')
                : i === 6
                ? guest
                  ? setAuthVisible(true)
                  : navigate('Community')
                : i === 7
                ? guest
                  ? setAuthVisible(true)
                  : navigate('LifeStyleScreen')
                : null
            }
            // paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMethod={'resize'}
            resizeMode="contain"
            ImageComponentStyle={styles.imageComponent}
            paginationBoxStyle={{
              // marginBottom: -40,
              display: 'none',
            }}
          />
        </View>

        <View>
          <View style={styles.videoContainer}>
            <Text style={styles.videoTextContainer}>
              {guest ? 'Track Your Activity' : 'Track Your Activity'}{' '}
            </Text>
            <Button
              onPress={() =>
                guest
                  ? setAuthVisible(true)
                  : guest
                  ? setAuthVisible(true)
                  : navigate('DailyIntakeScreen')
              }
              color="#66cc33"
              style={styles.buttonView}
              uppercase={false}>
              View Stats
            </Button>
          </View>
          {/* <CravingCardSvg /> */}
          <View style={{marginTop: -15}}>
            <MyCravings home={true} data={activityValue} />
          </View>
        </View>
        <View>
          <View style={{marginHorizontal: 20}}>
            {/* <Text style={styles.videoTextContainer}>Set Your Goal </Text> */}
          </View>
        </View>
        <View>
          <View style={[styles.videoContainer, {marginTop: 40}]}>
            <Text style={styles.videoTextContainer}>
              Crush Your Sugar Cravings
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigate(
                currentOrder === '2'
                  ? 'Music'
                  : currentOrder === '3'
                  ? 'Snacks'
                  : currentOrder === '4'
                  ? 'Exercise'
                  : 'CrushMyCraving',
              )
            }
            style={{marginHorizontal: 5, marginVertical: 0}}>
            <Image
              width={width - 40}
              resizeMode="contain"
              style={{width: width - 20}}
              source={require('../../../assets/cravingcard2.png')}
            />
          </TouchableOpacity>
        </View>
        {/* <View>
          <View style={styles.videoContainer}>
            <Text style={styles.videoTextContainer}>Recommended Products</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginVertical: 10,
            }}>
            {products?.map(item => (
              <RecommendedProducts home={true} key={item?.uuid} data={item} />
            ))}
          </ScrollView>
        </View> */}
        <View>
          <View style={styles.videoContainer}>
            <Text style={styles.videoTextContainer}>Exercise </Text>
            <Button
              onPress={() => navigate('VideosListScreen')}
              color="#66cc33"
              style={styles.buttonView}
              uppercase={false}>
              View all
            </Button>
          </View>

          <TouchableOpacity
            onPress={() => navigate('VideosListScreen')}
            style={{marginHorizontal: 5, marginVertical: 0}}>
            <Image
              width={width - 40}
              resizeMode="contain"
              style={{width: width - 20}}
              source={require('../../../assets/new/posterHomeVideo.jpg')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        // start={{x: 0, y: 0}}
        // end={{x: 1, y: 0}}
        // colors={['#41B87F', '#86B841']}
        style={styles.plusButton}>
        <TouchableOpacity
          onPress={() =>
            guest ? setAuthVisible(true) : navigate('CarbsCalculator')
          }>
          <HomeIcon height={50} width={50} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    // backgroundColor: '#66cc33',

    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  activityContainer: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  imageComponent: {
    width: width - 10,
    // marginRight: 20,

    // marginTop: 80,
  },
  sliderContainer: {
    justifyContent: 'center',

    // marginBottom: 50,
    borderRadius: 50,
  },
  videoContainer: {
    marginLeft: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoTextContainer: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 5,
    marginBottom: 5,
    // marginTop: 20,
  },
  buttonView: {
    fontSize: 22,
  },
});

export default Home;
