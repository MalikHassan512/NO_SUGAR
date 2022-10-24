import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Modal,
  SafeAreaView,
} from 'react-native';
import {IconButton, ProgressBar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MusicSvg from '../../../../assets/general/music.svg';
import StepSvg from '../../../../assets/step.svg';
import {useNavigation} from '@react-navigation/native';

const height = Dimensions.get('screen').height;

const GeneralScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          style={styles.gradientContainer}
          colors={['#86B841', '#41B87F', '#41B87F']}>
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
                  <Text style={styles.modalHeading}>Get Busy!</Text>
                  <IconButton
                    icon="check-circle-outline"
                    color="#86B841"
                    size={40}
                    style={styles.closeButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('MusicTimer');
                    }}
                  />
                </View>
                <Text style={styles.modalText}>
                  Listen to your favorite song and dance. Think of something
                  simple that forces your mind off your craving. Send someone a
                  text to tell them how much they mean to you. Watch a funny
                  video. Read an article and learn something new. Note: We often
                  eat out of boredom, so finding an activity to distract our
                  focus can often redirect our attention and reduce our desire
                  to eat.
                </Text>
              </View>
            </View>
          </Modal>

          <View>
            <ProgressBar style={{height: 15}} color="white" progress={0.5} />
            <IconButton
              //   style={{alignSelf: 'flex-start'}}

              onPress={() => navigation.navigate('CrushStat')}
              icon="arrow-left"
              color="white"
              size={30}
            />
            <View style={styles.stepStyle}>
              <Text style={styles.stepText}>STEP 2</Text>
              <StepSvg />
            </View>
            <Text style={styles.mainText}>
              No problem – you got this! Let’s listen to your favorite song
            </Text>
            <View style={styles.imageContainer}>
              <MusicSvg />
            </View>
          </View>

          <IconButton
            onPress={() => setModalVisible(true)}
            size={40}
            style={styles.buttonContainer}
            icon="arrow-right"
          />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: -20,
    marginRight: -20,
    // borderColor: '#86B841',
    // borderWidth: 1,
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
    padding: 20,
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
    fontSize: 24,
    marginVertical: 20,
    marginHorizontal: 20,
    fontWeight: '700',
    width: '90%',
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
    height: height - 10,
    flex: 1,
    paddingVertical: 10,
    // justifyContent: 'space-evenly',
  },
});

export default GeneralScreen;
