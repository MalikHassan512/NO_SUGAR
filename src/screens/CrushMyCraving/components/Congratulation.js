import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Congratulations = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          style={styles.gradientContainer}
          colors={['#86B841', '#41B87F', '#41B87F']}>
          <View>
            <View>
              <Text style={styles.mainText}>Well done, </Text>
              <Text style={styles.mainText}>Congratulations!</Text>
            </View>
            <View style={styles.imageContainer}>
              {/* <CongratulationsSvg height={400} /> */}
              <FastImage
                style={{width: width, height: 400}}
                source={require('../../../../assets/fireworkss.gif')}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CrushStat')}
            style={styles.touchStyle}>
            <Text style={styles.buttonText}>View History</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchStyle: {
    marginVertical: 0,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  mainText: {
    fontSize: 30,

    marginHorizontal: 20,
    fontWeight: '700',
    textAlign: 'center',

    color: 'white',
  },

  mainContainer: {
    flex: 1,
  },
  gradientContainer: {
    width: '100%',
    height: height,
    paddingVertical: 60,
    justifyContent: 'space-evenly',
  },
});

export default Congratulations;
