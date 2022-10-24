import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {IconButton, ProgressBar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import WaterSVg from '../../../../assets/drinking-water.svg';
import StepSvg from '../../../../assets/step.svg';
import {useNavigation} from '@react-navigation/native';

const height = Dimensions.get('window').height;

const GeneralScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          style={styles.gradientContainer}
          colors={['#86B841', '#41B87F', '#41B87F']}>
          <View style={styles.mainContainer}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.modalHeading}>
                      Drink a glass of water!
                    </Text>

                    <IconButton
                      icon="check-circle-outline"
                      color="#86B841"
                      size={40}
                      style={styles.closeButton}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        navigation.navigate('TimerScreen');
                      }}
                    />
                  </View>
                  <Text style={styles.modalText}>
                    Sometimes mindless eating is actually driven by thirst, so
                    water is always a great place to start. Drink slowly and
                    ensure you wait for full 5 minutes.
                  </Text>
                </View>
              </View>
            </Modal>

            <View>
              <ProgressBar style={{height: 10}} color="white" progress={0.25} />
              <IconButton
                //   style={{alignSelf: 'flex-start'}}
                onPress={() => navigation?.goBack()}
                icon="arrow-left"
                color="white"
                size={20}
              />
              <View style={styles.stepStyle}>
                <Text style={styles.stepText}>STEP 1</Text>
                <StepSvg />
              </View>
              <Text style={styles.mainText}>Drink a glass of water!</Text>
              <View style={styles.imageContainer}>
                <WaterSVg />
              </View>
            </View>

            <IconButton
              onPress={() => setModalVisible(true)}
              size={40}
              style={styles.buttonContainer}
              icon="arrow-right"
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    marginTop: -20,
    marginRight: -20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    // textAlign: 'center',
    color: 'gray',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: '700',
    width: '70%',
  },
  buttonContainer: {
    backgroundColor: '#C0e7D1',
    alignSelf: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  mainText: {
    fontSize: 30,
    marginVertical: 20,
    marginHorizontal: 20,
    fontWeight: '700',
    width: '50%',
    color: 'white',
  },
  stepText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
  stepStyle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
  },
  gradientContainer: {
    width: '100%',
    minHeight: height,
    paddingVertical: 10,
    // justifyContent: 'space-between',
  },
});

export default GeneralScreen;
