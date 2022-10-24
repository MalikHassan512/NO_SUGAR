import React from 'react';
import {Modal, StyleSheet, Text, Image, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setCountryCode} from '../redux/actions/countryAction';

const App = ({modalVisible, onRequestClose}) => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state?.country?.country);
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
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 170,
                  height: 170,
                  //  backgroundColor: 'pink',
                  marginRight: 10,
                }}
                height={170}
                width={170}
                resizeMode="center"
                source={require('../../assets/ca-flag.png')}
              />
              <Image
                style={{width: 170, height: 170}}
                height={170}
                width={170}
                resizeMode="center"
                source={require('../../assets/american-flag.png')}
              />
            </View>
            <View style={styles.container}>
              <Text style={{fontSize: 18, fontWeight: '700'}}>Canada</Text>
              <Text style={{fontSize: 18, fontWeight: '700'}}>USA</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}> */}
              <IconButton
                style={{alignSelf: 'center', marginLeft: 15, paddingBottom: 8}}
                onPress={() => {
                  dispatch(setCountryCode({country: 'No Sugar Company Inc.'}));
                  onRequestClose();
                }}
                color="#41B87F"
                icon={
                  selected === 'No Sugar Company Inc.'
                    ? 'checkbox-marked-circle-outline'
                    : 'checkbox-blank-circle-outline'
                }
              />
              {/* <CanadaSvg width={35} height={35} /> */}
              {/* <Text>Canada</Text> */}
              {/* </View> */}

              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //   marginRight: 20,
                }}> */}
              <IconButton
                style={{alignSelf: 'center', paddingBottom: 8}}
                onPress={() => {
                  dispatch(
                    setCountryCode({country: 'The No Sugar Company US'}),
                  );
                  onRequestClose();
                }}
                color="#41B87F"
                icon={
                  selected === 'The No Sugar Company US'
                    ? 'checkbox-marked-circle-outline'
                    : 'checkbox-blank-circle-outline'
                }
              />
              {/* <USASvg width={35} height={35} /> */}
              {/* </View> */}
            </View>
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
    justifyContent: 'space-around',
    marginBottom: 10,
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
    padding: 10,
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
