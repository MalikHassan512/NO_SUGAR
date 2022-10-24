import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {logGuest} from '../redux/actions/authActions';

const AuthModal = ({isVisible, onClose}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <IconButton
              icon="close"
              color="#86B841"
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('TimerScreen');
              }}
            /> */}

            <Text style={styles.modalText}>
              In order to continue, we would like you to register first?
            </Text>
            <View style={styles.sideContainer}>
              <TouchableOpacity onPress={onClose} style={styles.touchStyle}>
                <Text style={[styles.textStyle, {color: '#41B87F'}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.touchStyle}
                // style={styles.loginButton}
                colors={['#41B87F', '#86B841']}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(logGuest());
                    // navigation.navigate('Auth', {screen: 'GoalsScreen'});
                    onClose();
                  }}
                  // style={styles.touchStyle}
                >
                  <Text style={[styles.textStyle, {color: 'white'}]}>
                    Register
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  sideContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  touchStyle: {
    marginVertical: 0,
    height: 35,
    borderRadius: 20,
    width: 80,
    borderWidth: 1,
    borderColor: '#41B87F',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  textStyle: {
    // color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
    padding: 35,
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
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default AuthModal;
