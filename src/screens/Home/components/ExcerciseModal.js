import React, {useState} from 'react';
import {
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, IconButton, Portal} from 'react-native-paper';
import Exercise from '../../../../assets/new/exercise2.svg';
import Walk from '../../../../assets/new/walk.svg';
import {useNavigation} from '@react-navigation/core';
import FoodModal from './FoodModel';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ExerciseModal = ({visible, onRequestClose}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <Portal style={styles.centeredView}>
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
                position: 'absolute',
                marginTop: -5,
              }}
            />
            <Text style={{fontWeight: '700', marginBottom: 15, fontSize: 24}}>
              Log Activities
            </Text>
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
          </View>
        </View>
      </Modal>
    </Portal>
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
    borderTopColor: 'grey',
    width: width,
    height: height * 0.42,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
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

export default ExerciseModal;
