import {useNavigation} from '@react-navigation/core';
import {launchImageLibrary} from 'react-native-image-picker';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalFlag from '../../components/ModalFlag';

import {updateData} from '../NetworkRequest';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../redux/actions/profileActions';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ProfileScreen = () => {
  const navigation = useNavigation();
  // const [profileData, setProfileData] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const guest = useSelector(state => state?.auth?.guest);
  const token = useSelector(state => state?.auth?.token);
  const profileData = useSelector(state => state?.profile?.profile_data);
  const dispatch = useDispatch();
  const isFoucused = useIsFocused();

  const _changePicture = async img => {
    setLoadingImage(true);
    try {
      await updateData(token, 'profile-pic/', {image: img});

      setLoadingImage(false);
      dispatch(getProfile(token));
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  };

  // const getProfileData = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getData(token, 'user-profile/');

  //     setProfileData(data);
  //     // console.log(data);
  //     setLoading(false);
  //   } catch (error) {
  //     // console.log(error.response);
  //   }
  // };
  const updateDisplayPicture = () => {
    launchImageLibrary(
      {
        maxHeight: 100,
        maxWidth: 100,
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          _changePicture(
            `image":"data:image/jpeg;base64,${response?.assets[0]?.base64}`,
          );
        }
      },
    );
  };
  useEffect(() => {
    dispatch(getProfile(token));
  }, [isFoucused]);

  return (
    <>
      {visible && (
        <ModalFlag
          modalVisible={visible}
          onRequestClose={() => setVisible(false)}
        />
      )}
      <LinearGradient
        style={{width: '100%', height: '100%'}}
        colors={['#86B841', '#41B87F', '#41B87F']}>
        <View>
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              {loadingImage || loading ? (
                <View style={styles.activityIndicatorContainer}>
                  <ActivityIndicator color="#86B841" size={50} />
                </View>
              ) : (
                <Image
                  // size={150}
                  style={{
                    backgroundColor: 'white',
                    height: 150,
                    width: 150,
                  }}
                  source={
                    profileData?.image
                      ? {uri: profileData?.image}
                      : require('../../../assets/male.png')
                  }
                />
              )}
              <TouchableOpacity
                onPress={updateDisplayPicture}
                style={styles.icon2Container}>
                <View style={{backgroundColor: '#86B841', borderRadius: 15}}>
                  <Icon
                    // style={{backgroundColor: '#86B841'}}
                    size={30}
                    color="white"
                    name="circle-edit-outline"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.nameContainer}>{profileData?.name}</Text>
            <Text numberOfLines={2} style={styles.addressContainer}>
              {guest ? 'Guest User' : profileData?.email}
            </Text>
          </View>
          <Card style={styles.cardContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.addressEditContainer}
                onPress={() => {
                  navigation.navigate('Manage Address');
                }}>
                <Icon
                  color="#86B841"
                  style={styles.iconContainer}
                  size={40}
                  name="map-marker-outline"
                />

                <View style={styles.addressGroup}>
                  <Text style={styles.editAddressText}>Address</Text>
                  <Text style={styles.editAddressDesc}>
                    Edit or delete your address.
                  </Text>
                </View>
                <View
                  // onPress={() => navigation.navigate('Register')}
                  style={styles.iconContainer}>
                  <Icon color="gray" size={35} name="pencil-outline" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    profileData: profileData,
                  })
                }
                style={styles.addressEditContainer}>
                <Icon
                  color="#86B841"
                  size={40}
                  name="card-account-details-outline"
                />

                <View style={styles.addressGroup}>
                  <Text style={styles.editAddressText}>Basic Info</Text>
                  <Text style={styles.editAddressDesc}>
                    Manage your basic info.
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon color="gray" size={35} name="pencil-outline" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('FavFoods')}
                style={styles.addressEditContainer}>
                <Icon color="#86B841" size={40} name="heart" />

                <View style={styles.addressGroup}>
                  <Text style={styles.editAddressText}>Favorite</Text>
                  <Text style={styles.editAddressDesc}>
                    Your favorite food you added manually
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon
                    color="white"
                    size={35}
                    name="arrow-right-bold-outline"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Rewards')}
                style={styles.addressEditContainer}>
                <Icon color="#86B841" size={40} name="gift" />

                <View style={styles.addressGroup}>
                  <Text style={styles.editAddressText}>Rewards</Text>
                  <Text style={styles.editAddressDesc}>
                    Your rewards details.
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon
                    color="white"
                    size={35}
                    name="arrow-right-bold-outline"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('OrdersList')}
                style={styles.addressEditContainer}>
                <Icon color="#86B841" size={40} name="clipboard-list-outline" />

                <View style={styles.addressGroup2}>
                  <Text style={styles.editAddressText}>Orders</Text>
                  <Text style={styles.editAddressDesc}>
                    Your orders history.
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Icon
                    color="white"
                    size={35}
                    name="arrow-right-bold-outline"
                  />
                </View>
              </TouchableOpacity>

              {/* <View>
                <Text>Hello</Text>
              </View> */}

              {/* <TouchableOpacity
            onPress={async () => {
              dispatch(logOut());

              await storage.clear();
            }}>
            <View style={styles.addressEditContainer}>
              <Icon color="#86B841" size={40} name="logout" />

              <View style={styles.addressGroup}>
                <Text style={[styles.editAddressText, {marginTop: 5}]}>
                  Logout
                </Text>
              </View>
              <TouchableOpacity style={styles.iconContainer}>
                <Icon color="white" size={35} name="pencil-outline" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity> */}
            </ScrollView>
          </Card>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    width: 150,
    height: 150,
    borderRadius: 80,
    // borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressGroup: {
    width: width * 0.5,
  },
  addressGroup2: {
    width: width * 0.5,
    marginBottom: 20,
  },
  editAddressDesc: {
    color: 'gray',
    // fontSize:1
    fontWeight: '700',
  },
  editAddressText: {
    fontWeight: '700',
    fontSize: 18,
  },
  addressEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  nameContainer: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 20,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'flex-end',
  },
  icon2Container: {
    justifyContent: 'flex-end',
    marginLeft: -40,
  },
  addressContainer: {
    color: 'white',
    marginHorizontal: 20,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  cardContainer: {
    // backgroundColor: 'red',
    // flex: 1,
    height: height / 2,
    width: width,
    borderTopRightRadius: 50,
    marginTop: 20,
    padding: height * 0.04,
    borderTopLeftRadius: 50,
  },
});
export default ProfileScreen;
