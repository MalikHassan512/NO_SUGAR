import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setCountryCode} from '../redux/actions/countryAction';

const App = ({modalVisible, onRequestClose}) => {
  const dispatch = useDispatch();
  //   const selected = useSelector('');
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <IconButton
            size={30}
            onPress={onRequestClose}
            icon="close"
            style={styles.closeIcon}
          />
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('QrProduct', {code: 'fat'});
                onRequestClose();
              }}>
              <IconButton
                // style={{alignSelf: 'center', paddingBottom: 8}}
                // onPress={() => {
                //   navigation.navigate('ProductScanner', {code: 'chomp'});
                //   onRequestClose();
                // }}
                color="#41B87F"
                icon={'checkbox-blank-circle-outline'}
              />
              <Text style={{fontSize: 20, fontWeight: '700'}}>
                FatSecret Database
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('ProductScanner', {code: 'chomp'});
                onRequestClose();
              }}>
              <IconButton
                // style={{alignSelf: 'center', paddingBottom: 8}}
                // onPress={() => {
                //   navigation.navigate('ProductScanner', {code: 'chomp'});
                //   onRequestClose();
                // }}
                color="#41B87F"
                icon={'checkbox-blank-circle-outline'}
              />
              <Text style={{fontSize: 20, fontWeight: '700'}}>
                Chomp Database
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigation.navigate('ProductScanner', {code: 'buycott'});
                onRequestClose();
              }}>
              <IconButton
                // style={{
                //   alignSelf: 'center',
                //   marginLeft: 15,
                //   paddingBottom: 8,
                // }}
                // onPress={() => {
                //   onRequestClose();
                //   navigation.navigate('ProductScanner', {code: 'buycott'});
                // }}
                color="#41B87F"
                icon={'checkbox-blank-circle-outline'}
              />
              <Text style={{fontSize: 20, fontWeight: '700'}}>
                Buycott Database
              </Text>
            </TouchableOpacity>
          </View>

          {/* <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.loginButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity onPress={onRequestClose}>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={styles.loginTouch}>Update Country</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient> */}

          {/* <View>
            <Text style={styles.orText}>-------- OR ---------</Text>
          </View>
          <View>
            <Button color="#41B87F" uppercase={false}>
              <Text style={styles.createTouch}>Login </Text>
            </Button>
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  closeIcon: {
    right: 2,
    position: 'absolute',
    marginTop: -10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
