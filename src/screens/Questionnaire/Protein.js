import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import {Card} from 'react-native-paper';
import Sadantary from '../../../assets/general/pro1.svg';
import Light from '../../../assets/general/pro2.svg';
import Modrate from '../../../assets/general/pro3.svg';

const Protein = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState(0);
  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.goalText}>
        How much protein do you want to consume?
      </Text>
      <View>
        <Card
          onPress={() => setOptions(1)}
          style={[styles.cardContainer, {borderWidth: options === 1 ? 1 : 0}]}>
          <View style={{flexDirection: 'row'}}>
            <Sadantary />

            <Text style={styles.textOption}>
              If you're sedentary, we suggest between 0.6g and 0.8g protein.
            </Text>
          </View>
        </Card>
        <Card
          onPress={() => setOptions(2)}
          style={[styles.cardContainer, {borderWidth: options === 2 ? 1 : 0}]}>
          <View style={{flexDirection: 'row'}}>
            <Light />

            <Text style={styles.textOption}>
              If you're active, we suggest between 0.8g and 1.0g protein.
            </Text>
          </View>
        </Card>
        <Card
          onPress={() => setOptions(3)}
          style={[styles.cardContainer, {borderWidth: options === 3 ? 1 : 0}]}>
          <View style={{flexDirection: 'row'}}>
            <Modrate />

            <Text style={styles.textOption}>
              If you lift weights, we suggest between 1.0g and 1.2g protein.
            </Text>
          </View>
        </Card>
      </View>
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.nextButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity onPress={() => navigation.navigate('DietScreen')}>
            <Text style={styles.nextTouch}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity onPress={() => navigation.navigate('ActiveScreen')}>
          <Text style={styles.backTouch}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  nextTouch: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
  backTouch: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  textSelect: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  nextButton: {
    marginVertical: 10,

    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
  },
  cardContainer: {
    height: 100,
    margin: 5,
    borderRadius: 20,
    padding: 15,
    alignContent: 'center',
    flexDirection: 'row',
    borderColor: '#66cc33',
  },
  goalText: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 20,
  },
  textOption: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 20,
    alignSelf: 'center',
    width: '50%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    // justifyContent: 'space-between',
  },
});

export default Protein;
