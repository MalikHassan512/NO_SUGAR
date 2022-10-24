import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
} from 'react-native';
import {IconButton, ProgressBar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MusicSvg from '../../../../assets/new/snackpack.svg';
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
                    Munch on a No Sugar Substitute!
                  </Text>
                  <IconButton
                    icon="check-circle-outline"
                    color="#86B841"
                    size={40}
                    style={styles.closeButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('SnacksTimer');
                    }}
                  />
                </View>
                <Text style={styles.modalText}>
                  Ensure that your snacks are set to individual portions to
                  avoid the temptation of overeating. If you’re leaving home,
                  make sure that you also have some of these snacks in your
                  purse or car. Think unsweetened popcorn, nuts, seeds, nut
                  butters, cheese, pre-cut fresh fruit or vegetables, and dips
                  like hummus. You can check out our Products section for some
                  good No Sugar snack suggestions. Eat your no sugar snack
                  mindfully by sitting down and wait for 5 minutes!
                </Text>
              </View>
            </View>
          </Modal>

          <View>
            <ProgressBar style={{height: 15}} color="white" progress={0.75} />
            <IconButton
              //   style={{alignSelf: 'flex-start'}}
              onPress={() => navigation.navigate('CrushStat')}
              icon="arrow-left"
              color="white"
              size={30}
            />
            <View style={styles.stepStyle}>
              <Text style={styles.stepText}>STEP 3</Text>
              <StepSvg />
            </View>
            <Text style={styles.mainText}>
              No problem – you got this! Let's Munch on a No Sugar Substitute!
            </Text>
            <View style={styles.imageContainer}>
              <MusicSvg width={300} height={300} />
            </View>
          </View>

          <IconButton
            onPress={() => setModalVisible(true)}
            size={40}
            style={styles.buttonContainer}
            icon="arrow-right"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductScreen')}>
            <Text style={styles.textStyle}>Order Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: -20,
    marginRight: -20,
    borderColor: '#86B841',
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
  },
  buttonContainer: {
    backgroundColor: '#C0e7D1',
    alignSelf: 'center',
    marginBottom: 20,
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
    minHeight: height,
    paddingVertical: 10,
    // justifyContent: 'space-between',
  },
});

export default GeneralScreen;
