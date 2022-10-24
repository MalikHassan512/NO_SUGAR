import React, {useState} from 'react';
import {
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import Water from '../../../../assets/new/water2.svg';
import Food from '../../../../assets/new/foood2.svg';
import Exercise from '../../../../assets/new/exercise2.svg';
import Sleep from '../../../../assets/new/sleep2.svg';
import Walk from '../../../../assets/new/walk.svg';
import Mood from '../../../../assets/new/Mood.svg';
import {useNavigation} from '@react-navigation/core';
import FoodModal from './FoodModel';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ProgressModal = ({visible, onRequestClose}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.centeredView}>
      {modalVisible ? (
        <FoodModal visible={modalVisible} onRequestClose={onRequestClose} />
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onRequestClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <IconButton
                size={30}
                onPress={onRequestClose}
                icon="close"
                style={{
                  right: 0,
                  // paddingTop: 30,
                  position: 'absolute',
                  marginTop: -5,
                }}
              />
              <Text style={{fontWeight: '700', marginBottom: 15, fontSize: 24}}>
                Log Activities
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  // onRequestClose();
                }}
                // onPress={() => {
                //   navigation?.navigate('Food Modal', {
                //     screen: 'Ingredients',
                //     initial: false,
                //   });
                //   onRequestClose();
                // }}
                style={styles?.rowProgress}>
                <Text style={styles?.textFood}>Food</Text>
                <Food />
              </TouchableOpacity>
              <Divider />

              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('WaterIntake');
                  onRequestClose();
                }}
                style={styles?.rowProgress}>
                <Text style={styles?.textFood}>Water</Text>
                <View style={{marginRight: 8}}>
                  <Water />
                </View>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('SleepIntake');
                  onRequestClose();
                }}
                style={styles?.rowProgress}>
                <Text style={styles?.textFood}>Sleep </Text>
                <Sleep />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('WalkIntake');
                  onRequestClose();
                }}
                style={styles?.rowProgress}>
                <Text style={styles?.textFood}>Walk</Text>
                <Walk />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('DailyIntakeScreen', {
                    screen: 'Add Exercise',
                    initial: false,
                    params: {type: 'exer'},
                  });
                  onRequestClose();
                }}
                style={styles?.rowProgress}>
                <Text style={styles?.textFood}>Move</Text>
                <Exercise />
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('DailyIntakeScreen', {
                    screen: 'Mood',
                    initial: false,
                  });
                  onRequestClose();
                }}
                style={styles?.rowProgress}>
                <Text style={styles?.textFood}>Mood </Text>
                <Mood />
              </TouchableOpacity>
              <Divider />
              {/* <TouchableOpacity
              onPress={() => {
                // navigation?.navigate('DailyIntakeScreen', {
                //   screen: 'SleepIntake',
                //   initial: false,
                // });
                onRequestClose();
              }}
              style={styles?.rowProgress}>
              <Text style={styles?.textFood}>Weigh In </Text>
              <WeighIn />
            </TouchableOpacity>
            <Divider /> */}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textFood: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  rowProgress: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 15,
    marginRight: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    borderTopColor: 'grey',
    // borderWidth: 1,
    width: width,
    height: height * 0.6,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default ProgressModal;
