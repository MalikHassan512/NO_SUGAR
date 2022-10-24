import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ModalAuth from '../../../../components/ModalAuth';
import PlanModal from './PlanModal';
import AlertModal from '../../../CrushMyCraving/EndModal';
import {set} from 'react-native-reanimated';

const MealCard = ({data, mymeal, p_code, type, onSelected, home}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const sugar = useSelector(state => state?.goals.goal?.progress_data?.sugar);
  const guest = useSelector(state => state?.auth?.guest);
  const [authVisible, setAuthVisible] = useState(false);
  return home ? (
    <>
      <Card
        onPress={() => {
          console.log(data);
          onSelected(data);
        }}
        style={styles.viewContainer}>
        <View style={styles.viewContainer}>
          <Image
            style={styles.imageContainer}
            width={60}
            height={60}
            source={
              data?.image === null
                ? require('../../../../../assets/general/item_placeholder.png')
                : {uri: data?.image}
            }
          />

          <View style={{alignSelf: 'center', width: '60%'}}>
            <Text numberOfLines={2} style={styles.nameText}>
              {data?.name}
            </Text>
            {type === 'exer' ? (
              <Text style={{color: 'grey', fontSize: 10, marginVertical: 10}}>
                -{data?.calories} Cal, {data?.mins} Minutes
              </Text>
            ) : (
              <Text style={{color: 'grey', fontSize: 10, marginVertical: 10}}>
                {data?.calories} Cal, {data?.net_carbs} Carbs, {data?.sugar}{' '}
                Sugar, {data?.fats} Fats
              </Text>
            )}
          </View>
        </View>
      </Card>
    </>
  ) : (
    <>
      {isAlertVisible && (
        <AlertModal
          onClose={() => setIsAlertVisible(false)}
          onNo={() => {
            setIsAlertVisible(false);
            setIsVisible(true);
          }}
          onYes={() => setIsAlertVisible(false)}
          text="Your sugar limit is going above the standard limit, still you wanna add more sugar?"
          isVisible={isAlertVisible}
        />
      )}
      {isVisible && (
        <PlanModal
          modalVisible={isVisible}
          type={type}
          data={data}
          p_code={p_code}
          onCloseModal={() => setIsVisible(false)}
        />
      )}
      {authVisible && (
        <ModalAuth
          isVisible={authVisible}
          onClose={() => setAuthVisible(false)}
        />
      )}
      <Card
        onPress={() => (guest ? setAuthVisible(true) : setIsVisible(true))}
        style={styles.viewContainer}>
        <View style={styles.viewContainer}>
          <Image
            style={styles.imageContainer}
            width={60}
            height={60}
            source={
              data?.image === null
                ? require('../../../../../assets/general/item_placeholder.png')
                : {uri: data?.image}
            }
          />
          <View style={{alignSelf: 'center', width: '60%'}}>
            <Text numberOfLines={2} style={styles.nameText}>
              {data?.name}
            </Text>
            {type === 'exer' ? (
              <Text style={{color: 'grey', fontSize: 10, marginVertical: 10}}>
                -{data?.calories} Cal, {data?.mins} Minutes
              </Text>
            ) : (
              <Text style={{color: 'grey', fontSize: 10, marginVertical: 10}}>
                {data?.calories} Cal, {data?.net_carbs} Carbs, {data?.sugar}{' '}
                Sugar, {data?.fats} Fats
              </Text>
            )}
          </View>
          {mymeal ? null : (
            <IconButton
              onPress={() =>
                guest
                  ? setAuthVisible(true)
                  : parseInt(sugar, 10) > 20
                  ? setIsAlertVisible(true)
                  : setIsVisible(true)
              }
              style={{
                backgroundColor: '#e3f1dc',
                alignSelf: 'center',
              }}
              color="#72B852"
              icon="plus"
            />
          )}
        </View>
      </Card>
    </>
  );
};
const styles = StyleSheet.create({
  nameText: {fontSize: 16, fontWeight: '700'},
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 20,

    borderRadius: 20,
  },
  viewContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // marginVertical: 5,
    marginTop: 15,
    borderRadius: 20,
  },
});

export default MealCard;
