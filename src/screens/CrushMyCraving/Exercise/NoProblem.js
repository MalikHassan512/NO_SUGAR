import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const height = Dimensions.get('window').height;

const Congratulations = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.mainContainer}>
      <LinearGradient
        style={styles.gradientContainer}
        colors={['#86B841', '#41B87F', '#41B87F']}>
        <View>
          <View>
            <Text style={styles.mainText}>No problem –</Text>
            <Text style={styles.mainText}>You will crush it next time!</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('CrushStat')}
          style={styles.touchStyle}>
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  touchStyle: {
    marginVertical: 30,
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
