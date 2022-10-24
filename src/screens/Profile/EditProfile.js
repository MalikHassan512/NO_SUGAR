import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/core';
import {updateData} from '../NetworkRequest';

const EditProfile = () => {
  const navigation = useNavigation();

  const {params} = useRoute();
  const {profileData} = params;
  const [gender, setGender] = useState('M');
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state?.auth?.token);

  const updateProfile = async values => {
    setIsLoading(true);
    try {
      await updateData(token, 'change-user-profile/', values);
      // getProfileData();
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setIsMessageVisible(true);
      setMessage(error?.response.data.message);
    }
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <Formik
        initialValues={{
          name: profileData?.name || '',
          phone_number: profileData?.phone_number || '',
          gender: profileData?.gender || '',
          age: profileData?.age || '',
          weight: profileData?.weight || '',
          height: profileData?.height || '',
          email: profileData?.email || '',
        }}
        onSubmit={values => updateProfile({...values, gender: gender})}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Name *</Text>

              <TextInput
                // placeholder="Email"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.inputText}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Gender *</Text>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => setGender('M')}>
                  <Image
                    source={require('../../../assets/male.png')}
                    style={[styles.imageStyle, {backgroundColor: '#66cc33'}]}
                  />
                  {gender === 'M' ? (
                    <Icon
                      style={styles.iconsStyle}
                      size={25}
                      name="check-circle-outline"
                      color="white"
                    />
                  ) : null}
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGender('F')}>
                  <Image
                    source={require('../../../assets/female.png')}
                    style={styles.imageStyle}
                  />
                  {gender === 'F' ? (
                    <Icon
                      style={styles.iconsStyle}
                      size={25}
                      name="check-circle-outline"
                      color="white"
                    />
                  ) : null}

                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Phone Number</Text>

              <TextInput
                onChangeText={handleChange('phone_number')}
                onBlur={handleBlur('phone_number')}
                value={values.phone_number}
                // placeholder="Password"
                keyboardType="numeric"
                style={styles.inputText}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Email *</Text>

              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                // placeholder="Password"

                style={styles.inputText}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Age (In Years)*</Text>

              <TextInput
                onChangeText={handleChange('age')}
                onBlur={handleBlur('age')}
                value={values.age}
                // placeholder="Password"
                keyboardType="numeric"
                style={styles.inputText}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Weight (In Kg)</Text>

              <TextInput
                onChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                value={values.weight}
                // placeholder="Password"
                keyboardType="numeric"
                style={styles.inputText}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Height (In Cm)</Text>

              <TextInput
                onChangeText={handleChange('height')}
                onBlur={handleBlur('height')}
                value={values.height}
                // placeholder="Password"
                keyboardType="numeric"
                style={styles.inputText}
              />
            </View>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.profileButton}
              colors={['#41B87F', '#86B841']}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  {isLoading ? <ActivityIndicator color="white" /> : null}
                  <Text style={styles.profileTouch}>Save</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </Formik>
      <Snackbar
        visible={isMessageVisible}
        style={{borderRadius: 30}}
        onDismiss={() => setIsMessageVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setIsMessageVisible(false);
          },
        }}>
        {message}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileTouch: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 10,
  },
  labelText: {
    marginHorizontal: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  iconsStyle: {
    alignSelf: 'center',
    marginTop: -25,
    backgroundColor: '#66cc33',
    borderRadius: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageStyle: {
    backgroundColor: '#f2ad05',
    borderRadius: 50,
    height: 100,
  },
  genderText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  mainContainer: {
    // marginBottom: 60,
    backgroundColor: 'white',
    padding: 20,
  },

  profileButton: {
    marginVertical: 40,

    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: 5,
  },

  inputText: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#e5e5e5',
    color: 'gray',
    paddingHorizontal: 15,
    fontSize: 13,
    fontWeight: '600',
    height: 40,
  },
});
export {EditProfile};
