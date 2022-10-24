import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import ModalAuth from '../../components/ModalAuth';
import Logo from '../../../assets/No sugar logo';

const CrushMyCraving = () => {
  const navigation = useNavigation();
  const guest = useSelector(state => state?.auth?.guest);
  const [authVisible, setAuthVisible] = useState(false);
  return (
    <>
      {authVisible && (
        <ModalAuth
          isVisible={authVisible}
          onClose={() => setAuthVisible(false)}
        />
      )}
      <ScrollView style={styles.mainContainer}>
        <Logo  style={styles.logoImage} height={100} width={150}/>
        {/* <Image
          resizeMode="cover"
          height={100}
          width={100}
          style={styles.logoImage}
          source={require('../../../assets/Logo.png')}
        /> */}
        <Image
          style={styles.mainImage}
          source={require('../../../assets/craving.png')}
        />
        <Text style={styles.textStyle}>
          So you're feeling a little snacky and really want that sugary treat.
          No problem -we got you!
        </Text>
        <Text style={styles.textStyle}>
          Follow these 5 simple steps and you've got an 80% chance of crushing
          that craving. Make sure you dedicate 5 minutes for each step.
        </Text>
        <Text style={styles.textStyle}>
          Click Start button below to move to Step 1.
        </Text>
        <TouchableOpacity
          onPress={() =>
            guest ? setAuthVisible(true) : navigation.navigate('GeneralScreen')
          }
          style={styles.touchStyle}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    // margin: 16,
    right: 0,
    bottom: 0,
  },
  touchStyle: {
    marginVertical: 30,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#60B862',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#60B862',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 20,
    color: 'gray',
  },
  mainImage: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  mainContainer: {
    padding: 20,
    // paddingTop: 60,
    backgroundColor: 'white',
    flex: 1,
  },
  logoImage: {
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    width: 200,

    height: 100,
  },
});

export default CrushMyCraving;
