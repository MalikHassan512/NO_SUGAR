import React from 'react';
import {
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import Food from '../../../../assets/new/foood2.svg';
import Breakfast from '../../../../assets/FoodModalIcons/Breakfast.svg';
import Lunch from '../../../../assets/FoodModalIcons/Lunch.svg';
import Snack from '../../../../assets/FoodModalIcons/Snacks.svg';
import {useNavigation} from '@react-navigation/core';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FoodModal = ({visible, onRequestClose}) => {
  const navigation = useNavigation();
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="fade"
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
            Choose
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('DailyIntakeScreen', {
                screen: 'Ingredients',
                initial: false,
                params: {p_code: 'br'},
              });
              onRequestClose();
            }}
            style={styles?.rowProgress}>
            <Text style={styles?.textFood}>Breakfast</Text>
            <Breakfast />
          </TouchableOpacity>
          <Divider />

          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('DailyIntakeScreen', {
                screen: 'Ingredients',
                initial: false,
                params: {p_code: 'ln'},
              });
              onRequestClose();
            }}
            style={styles?.rowProgress}>
            <Text style={styles?.textFood}>Lunch</Text>
            <View>
              <Lunch />
            </View>
          </TouchableOpacity>
          <Divider />

          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('DailyIntakeScreen', {
                screen: 'Ingredients',
                initial: false,
                params: {p_code: 'dn'},
              });
              onRequestClose();
            }}
            style={styles?.rowProgress}>
            <Text style={styles?.textFood}>Dinner</Text>
            <Food />
          </TouchableOpacity>
          <Divider />

          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('DailyIntakeScreen', {
                screen: 'Ingredients',
                initial: false,
                params: {p_code: 'sn'},
              });
              onRequestClose();
            }}
            style={styles?.rowProgress}>
            <Text style={styles?.textFood}>Snack</Text>
            <Snack />
          </TouchableOpacity>
          <Divider />
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  textFood: {
    fontSize: 20,
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
    height: height * 0.55,
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

export default FoodModal;
