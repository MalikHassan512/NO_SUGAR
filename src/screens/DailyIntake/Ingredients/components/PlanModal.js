import React, {useState} from 'react';
import {Text, View, Modal, Image, StyleSheet, Dimensions} from 'react-native';
import {IconButton} from 'react-native-paper';
import GradientButton from '../../../../components/GradientBotton';
import TimerSvg from '../../../../../assets/new/timer.svg';
import {postData} from '../../../NetworkRequest';
import {useSelector, useDispatch} from 'react-redux';
import {getActivityValue} from '../../../../redux/actions/homeStatActions';
import {getGoalValue} from '../../../../redux/actions/goalAction';
import CalariosSvg from '../../../../../assets/MealIcons/Calories.svg';
import Carb1Svg from '../../../../../assets/MealIcons/Carbs.svg';
import FatSvg from '../../../../../assets/MealIcons/Fats.svg';
import ProtienSvg from '../../../../../assets/MealIcons/Protein.svg';
import SugarSvg from '../../../../../assets/new1/sugar.svg';
import {useNavigation} from '@react-navigation/core';

const width = Dimensions.get('window').width;

const PlanModal = ({modalVisible, type, onCloseModal, p_code, data, props}) => {
  const [quantity, setQuantity] = useState(1);
  const token = useSelector(state => state?.auth?.token);
  // console.log('dataaaa', data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  console.log('categorrr', data?.category?.uuid);

  const sendPost = async () => {
    setIsLoading(true);
    try {
      const res = await postData(token, 'user-progress/', {
        uuid: data?.uuid,
        quantity: quantity,
        cat_uuid: data?.category?.uuid,
        code: 'Food',
        p_code: p_code,
      });
      console.log(res);
      dispatch(getActivityValue(token));
      dispatch(getGoalValue(token));
      onCloseModal();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const sendExercise = async () => {
    setIsLoading(true);
    try {
      const res = await postData(token, 'user-progress/', {
        uuid: data?.uuid,
        quantity: quantity,
        cat_uuid: data?.category?.uuid,
        code: 'Workout',
      });
      console.log(res);
      dispatch(getActivityValue(token));
      dispatch(getGoalValue(token));
      onCloseModal();
      navigation.navigate('DailyIntakeScreen');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCloseModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <IconButton
            icon="close"
            color="#86B841"
            style={styles.closeButton}
            onPress={onCloseModal}
          />
          {type === 'exer' ? null : (
            <Image
              style={styles.absoluteImage}
              source={require('../../../../../assets/wing.png')}
            />
          )}
          <Text style={styles.modalHeading}>
            Add {type === 'exer' ? 'Session' : 'Quantity'}
          </Text>
          {/* {data?.map((item, index) => (
            <TouchableOpacity key={index}>
              <Text style={styles.modalText}>{item}</Text>
            </TouchableOpacity>
          ))} */}
          <View>
            <Image
              style={styles.itemImage}
              width={300}
              height={200}
              resizeMode={'contain'}
              source={
                data?.image === null
                  ? require('../../../../../assets/general/item_placeholder.png')
                  : {uri: data?.image}
              }
            />
          </View>

          <Text style={styles.nameText}>{data?.name}</Text>
          <View style={styles.flexDirection}>
            <View style={styles.flexDirection}>
              <SugarSvg width={30} height={30} />
              {/* <CalariosSvg /> */}
              <Text style={styles.smallText}>
                {(data?.sugar * quantity).toFixed(0)}g Sugar
              </Text>
            </View>
            {type === 'exer' ? (
              <View style={styles.flexDirection}>
                <Text style={styles.smallText}>
                  {(data?.mins * quantity).toFixed(0)} Minutes
                </Text>
                <TimerSvg width={30} height={30} />
              </View>
            ) : (
              <View style={styles.flexDirection}>
                <Text style={styles.smallText}>
                  {type === 'exer'
                    ? `-${(data?.calories * quantity).toFixed(2)}`
                    : (data?.calories * quantity).toFixed(2)}{' '}
                  Calorie
                </Text>
                <CalariosSvg />
              </View>
            )}
          </View>
          {type === 'exer' ? null : (
            <View style={styles.flexDirection}>
              <View style={styles.flexDirection}>
                <FatSvg />
                <Text style={[styles.smallText, {marginLeft: 20}]}>
                  {(data?.fats * quantity).toFixed(2)}g Fat
                </Text>
              </View>
              <View style={styles.flexDirection}>
                <Text style={styles.smallText}>
                  {(data?.net_carbs * quantity).toFixed(2)}g Carbs
                </Text>
                <Carb1Svg />
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <GradientButton
              onSubmit={() => (quantity > 1 ? setQuantity(quantity - 1) : null)}
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
          <View>
            {/* <TouchableOpacity onPress={onCloseModal}> */}
            <GradientButton
              isLoading={isLoading}
              onSubmit={() => {
                type === 'exer' ? sendExercise() : sendPost();
              }}
              height={60}
              borderRadius={35}
              title="Add"
            />
            {/* </TouchableOpacity> */}
          </View>
          {/* <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.loginButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity onPress={onCloseModal}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginTouch}>Add</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    // width: '70%',
  },
  counterText: {fontSize: 20, alignSelf: 'center', fontWeight: '600'},
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginVertical: 20,
  },
  absoluteImage: {
    width: 100,
    height: 100,
    right: 0,
    position: 'absolute',
    //   marginRight: -80,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-evenly',
  },
  smallText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  nameText: {fontSize: 24, marginBottom: 10, fontWeight: '700', width: '100%'},
  closeButton: {
    alignSelf: 'flex-start',
    marginTop: -20,
    marginLeft: -20,
    borderColor: '#86B841',
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,

    // alignItems: 'center',
    width: width - 40,
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
    marginVertical: 16,
    fontWeight: '700',
    // textAlign: 'center',
    // color: 'gray',
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: '700',
    // marginTop: 20,
  },
});

export default PlanModal;
