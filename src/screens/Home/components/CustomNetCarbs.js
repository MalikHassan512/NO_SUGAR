import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Modal} from 'react-native';
import GradientButton from '../../../components/GradientBotton';
import CarbSvg from '../../../../assets/general/carb1.svg';
import FatSvg from '../../../../assets/general/fat1.svg';
import ProteinSvg from '../../../../assets/general/protein1.svg';
import {IconButton} from 'react-native-paper';

const AuthModal = ({isVisible, onClose}) => {
  const [quantity, setQuantity] = useState(0);
  const minHandler = () => {
    quantity > 1 ? setQuantity(quantity - 1) : 5;
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              size={30}
              onPress={onClose}
              icon="close"
              style={styles.closeIcon}
            />
            {/* <Card style={styles.cardContainer}> */}
            <View style={styles.ProductContainer}>
              <View>
                <View style={styles.IconWithText}>
                  <CarbSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Carbohydrate</Text>
                </View>

                <View style={styles.IconWithText}>
                  <ProteinSvg
                    height={20}
                    width={20}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.Title}>Fiber</Text>
                </View>

                <View style={styles.IconWithText}>
                  <FatSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Sugar</Text>
                </View>

                <View style={styles.IconWithText}>
                  <CarbSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Net Carbs</Text>
                </View>
              </View>

              <View>
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputText}
                  returnKeyType="next"
                />
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputText}
                  returnKeyType="next"
                />
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputText}
                  returnKeyType="next"
                />
                <Text style={styles.ItemDetail}>0000</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <GradientButton
                onSubmit={minHandler}
                borderRadius={5}
                title="-"
              />
              <Text style={styles.counterText}>{quantity}</Text>
              <GradientButton
                onSubmit={() => setQuantity(quantity + 1)}
                borderRadius={5}
                title="+"
              />
            </View>
            {/* </Card> */}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    right: 2,
    position: 'absolute',
    marginTop: -10,
  },
  inputText: {
    // marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e5e5e5',
    color: 'gray',
    // paddingHorizontal: 15,
    marginVertical: 4,
    minWidth: 100,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 5,
    // paddingLeft: 5,
    fontSize: 18,
    fontWeight: '600',
    height: 30,
  },
  counterText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    // marginTop: -10,
    // marginHorizontal: 50,
    justifyContent: 'space-evenly',
  },
  IconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ItemDetail: {
    color: 'grey',
    marginVertical: 9,
  },
  Title: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
  },
  ProductContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
    width: '90%',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 20,
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
});

export default AuthModal;
