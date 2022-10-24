import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const EndModal = ({isVisible, onYes, onNo, text, onClose}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.noContainer}>
              <TouchableOpacity onPress={onYes} style={styles.touchStyle}>
                <Text style={[styles.textStyle, {color: '#41B87F'}]}>No</Text>
              </TouchableOpacity>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.touchStyle}
                // style={styles.loginButton}
                colors={['#41B87F', '#86B841']}>
                <TouchableOpacity
                  onPress={onNo}
                  // style={styles.touchStyle}
                >
                  <Text style={[styles.textStyle, {color: 'white'}]}>Yes</Text>
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
  noContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  touchStyle: {
    marginVertical: 0,
    height: 40,
    borderRadius: 15,
    width: 90,
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
    margin: 30,
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
    fontSize: 18,
    // color: 'gray',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default EndModal;
