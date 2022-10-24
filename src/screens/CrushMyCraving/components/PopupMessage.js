import React from 'react';
import {View, StyleSheet, Text, Dimensions, Modal} from 'react-native';

const width = Dimensions.get('window').width;
const SnackBar = ({isVisible, onYes, onNo, onClose}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        style={{height: 60, width: width}}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You Got this</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 70,
    height: 60,
    width: width,
  },
  modalView: {
    // margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    height: 60,
    width: width - 30,
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
});

export default SnackBar;
