import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  View,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import RecipeCate from '../components'
const windowHeight = Dimensions.get('window').height;
const App = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Category</Text>
          <View style={styles.align}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]}>
              <Text style={styles.textStyle}>Keto</Text>
            </TouchableOpacity>
            <Pressable style={[styles.button, styles.buttonClose,{marginLeft: 5}]}>
              <Text style={styles.textStyle}>Gluten Free</Text>
            </Pressable>
          </View>
          <Pressable style={[styles.button, styles.buttonClose]}>
            <Text style={styles.textStyle}>Vegetarian</Text>
          </Pressable>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.trackButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.touchStyle}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  align: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  touchStyle: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#72b852',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '700',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  trackButton: {
    marginVertical: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    //   margin: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 35,
    //   alignItems: "center",
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
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#EFEFEF',
    width: 160,
  },
  textStyle: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
