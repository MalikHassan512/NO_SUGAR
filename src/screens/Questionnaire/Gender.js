import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/core';

let height = Dimensions.get('screen').height;
const age = () => {
  const arr = [];
  for (let index = 0; index < 100; index = index + 5) {
    arr.push({first: index, second: index + 5});
  }
  return arr;
};
const ageArray = age();

const Gender = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = useRoute();
  console.log('login ans', params?.ans);
  const [gender, setGender] = useState('M');
  const [item, setItem] = useState(11);
  // const [ansArr,setAnsArr] =useS

  return (
    <View style={styles.mainContainer}>
      <View>
        <ProgressBar
          style={styles.progressBarStyle}
          // indeterminate
          progress={0.889}
          color={'#66cc33'}
        />
        <View style={styles.container}>
          <Text style={styles.textSkip}> 8 out of 9 </Text>

          <TouchableOpacity
            onPress={() => {
              // setOptions(1);
              navigation.navigate('HeightScreen', {
                tokenData: params?.tokenData,
                ans: [
                  ...params?.ans,
                  {
                    q_uuid: '1aa61345-f2b3-4f91-8a44-e909d8aa31b7',
                    answer: gender,
                  },
                  {
                    q_uuid: '61480daa-ac8e-4af1-b328-f1a53a9dd146',
                    answer: `${item} - ${item + 5}`,
                  },
                ],
              });
            }}>
            <Text style={[styles.textSkip, {color: 'gray'}]}> Skip </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Select Gender</Text>
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
          <TouchableOpacity
            style={{marginRight: -15}}
            onPress={() => setGender('F')}>
            <Image
              source={require('../../../assets/female.png')}
              style={styles.imageStyle}
            />
            {gender === 'F' ? (
              <Icon
                style={styles.iconsStyle}
                size={25}
                name="check-circle"
                color="white"
              />
            ) : null}

            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Not')}>
            <Image
              height={40}
              width={40}
              source={require('../../../assets/general/nosay.png')}
              style={[
                styles.imageStyle,
                {alignSelf: 'center', backgroundColor: 'grey'},
              ]}
            />
            {gender === 'Not' ? (
              <Icon
                style={styles.iconsStyle}
                size={25}
                name="check-circle-outline"
                color="white"
              />
            ) : null}

            <Text style={styles.genderText}>Prefer not to say</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>How old are you?</Text>

        {/* <TextInput
          // placeholder="Password"
          keyboardType="numeric"
          style={styles.inputText}
        /> */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginVertical: 10,
          }}>
          {ageArray.map((num, index) => (
            <TouchableOpacity onPress={() => setItem(num.first)} key={index}>
              <Text
                style={[
                  styles.ageNumber,
                  num.first === item ? {borderWidth: 1} : {borderWidth: 0},
                ]}>
                {num?.first + '-' + num?.second}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.nextButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HeightScreen', {
                tokenData: params?.tokenData,

                ans: [
                  ...params?.ans,
                  {
                    q_uuid: '1aa61345-f2b3-4f91-8a44-e909d8aa31b7',
                    answer: gender,
                  },
                  {
                    q_uuid: '61480daa-ac8e-4af1-b328-f1a53a9dd146',
                    answer: `${item} - ${item + 5}`,
                  },
                ],
              })
            }>
            <Text style={styles.nextTouch}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* <View style={styles.nextButton}> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('EmailScreen')}>
          <Text style={styles.backTouch}>Back</Text>
        </TouchableOpacity> */}
        {/* </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.06,
  },
  progressBarStyle: {
    height: 20,
    borderRadius: 10,
    marginTop: height * 0.03,
    marginBottom: 20,
  },
  textSkip: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -3,
  },
  ageNumber: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '700',

    marginHorizontal: 25,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: 'center',
    paddingTop: 18,
    textAlign: 'center',
    borderColor: '#66cc33',
  },
  nextTouch: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
  backTouch: {color: 'black', fontWeight: 'bold', textAlign: 'center'},
  labelText: {
    marginHorizontal: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconsStyle: {
    alignSelf: 'center',
    marginTop: -25,
    backgroundColor: '#66cc33',
    borderRadius: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    backgroundColor: '#f2ad05',
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  genderText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  mainContainer: {
    // marginBottom: 60,
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    // paddingTop: 60,
  },

  nextButton: {
    marginVertical: 10,

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
export default Gender;
