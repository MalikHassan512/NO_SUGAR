import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ProtienSVG from '../../../../assets/protien.svg';
import FatSVG from '../../../../assets/fats.svg';
import CaloriesSVG from '../../../../assets/carbs.svg';
import Happy from '../../../../assets/new/Happy.svg';
import Angry from '../../../../assets/new/Angry.svg';
import Normal from '../../../../assets/new/Normal.svg';
import Sad from '../../../../assets/new/Sad.svg';
import Energetic from '../../../../assets/new/Energetic.svg';
import Worried from '../../../../assets/new/Worried.svg';
import SugarSvg from '../../../../assets/SimpleSugar.svg';
import WaterSvg from '../../../../assets/new/water.svg';
import ExerciseSvg from '../../../../assets/new/Exercise1.svg';
import FoodSvg from '../../../../assets/new/Food.svg';
import SleepSvg from '../../../../assets/new/Sleep.svg';
import MoodSvg from '../../../../assets/new/Mood.svg';
import Camera from '../../../../assets/DailyIntake/camera2';
import Scan from '../../../../assets/DailyIntake/scan2';
import CarbSVG from '../../../../assets/Carbs3.svg';
import ProgressModal from './ProgressModal';
import AuthModal from '../../../components/ModalAuth';

const width = Dimensions.get('screen').width;

const MyCravings = ({data, home}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const guest = useSelector(state => state?.auth?.guest);
  const [authVisible, setAuthVisible] = useState(false);

  const takePhoto = () => {
    launchCamera(
      {
        durationLimit: 100,
        maxWidth: 513,
        maxHeight: 513,
        mediaType: 'photo',
        includeBase64: true,
        cameraType: 'back',
      },
      response => {
        if (!response.didCancel) {
          // console.log(response);
          navigation.navigate('PhotoSearchHome', {
            file: `data:image/jpeg;base64,${response?.assets[0]?.base64}`,
          });
        }
      },
    );
  };

  return home ? (
    <>
      {authVisible && (
        <AuthModal
          isVisible={authVisible}
          onClose={() => setAuthVisible(false)}
        />
      )}
      <StyledCardHome color="white">
        {modalVisible && (
          <ProgressModal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          />
        )}

        <StyledIconContainer>
          <View>
            <TouchableOpacity
            // onPress={() => navigation.navigate('Food Activity')}
            >
              <FoodSvg />
            </TouchableOpacity>
            <StyledText2>Food</StyledText2>
            <StyledNumber>
              {parseInt(
                data?.Food?.calories +
                  data?.Recipe?.calories +
                  data?.Workout?.calories +
                  data?.Product?.calories,
                10,
              ) || 0}
            </StyledNumber>
            <StyledText>Calories</StyledText>
          </View>
          <View>
            <TouchableOpacity
            // onPress={() => navigation.navigate('Water Activity')}
            >
              <WaterSvg />
            </TouchableOpacity>
            <StyledText2>Water</StyledText2>
            <StyledNumber>{data?.Water?.quantity || 0}</StyledNumber>
            <StyledText>Glass</StyledText>
          </View>
          <View>
            <TouchableOpacity
            // onPress={() => navigation.navigate('Exercise Activity')}
            >
              <ExerciseSvg />
            </TouchableOpacity>
            <StyledText2>Move</StyledText2>
            <StyledNumber>{data?.Walk?.quantity || 0}</StyledNumber>
            <StyledText>Steps</StyledText>
          </View>
          <View>
            <TouchableOpacity
            // onPress={() => navigation.navigate('Sleep Activity')}
            >
              <SleepSvg />
            </TouchableOpacity>
            <StyledText2>Sleep</StyledText2>
            <StyledNumber>{data?.Sleep?.quantity || 0}</StyledNumber>
            <StyledText>Hour</StyledText>
          </View>
          <View>
            <StyledCircleView>
              <TouchableOpacity
              // onPress={() => navigation.navigate('Mood Activity')}
              >
                <MoodSvg />
              </TouchableOpacity>
            </StyledCircleView>

            <StyledText2>Mood</StyledText2>
            <View style={{alignSelf: 'center', marginVertical: 7}}>
              {/* <Normal width={16} height={16} /> */}
              {data?.Mood?.quantity < 0 ? (
                <Normal width={16} height={16} />
              ) : data?.Mood?.quantity < 2 ? (
                <Angry width={16} height={16} />
              ) : data?.Mood?.quantity < 4 ? (
                <Sad width={16} height={16} />
              ) : data?.Mood?.quantity < 6 ? (
                <Worried width={16} height={16} />
              ) : data?.Mood?.quantity < 8 ? (
                <Normal width={16} height={16} />
              ) : data?.Mood?.quantity < 10 ? (
                <Energetic width={16} height={16} />
              ) : (
                <Happy width={16} height={16} />
              )}
            </View>
            <StyledText>
              {data?.Mood?.quantity <= 0
                ? 'Normal'
                : data?.Mood?.quantity < 2
                ? 'Angry'
                : data?.Mood?.quantity < 4
                ? 'Sad'
                : data?.Mood?.quantity < 6
                ? 'Worried'
                : data?.Mood?.quantity < 8
                ? 'Normal'
                : data?.Mood?.quantity < 10
                ? 'Energetic'
                : 'Happy'}
            </StyledText>
          </View>
        </StyledIconContainer>

        <View style={styles.buttonAlign}>
          <TouchableOpacity onPress={takePhoto}>
            <Card style={styles.buttonStyle}>
              <View style={styles.align}>
                <Camera width={18} height={18} />
                <Text style={styles.textStyle}>TAKE PICTURE</Text>
              </View>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductScanner')}>
            <Card style={styles.buttonStyle}>
              <View style={styles.align}>
                <Scan width={18} height={18} />
                <Text style={styles.textStyle}>SCAN FOOD</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.trackButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity
            onPress={() =>
              guest ? setAuthVisible(true) : setModalVisible(true)
            }
            style={styles.touchStyle}>
            <Text style={styles.buttonText}>Add My Activity</Text>
            {/* <Ionicons
            style={{paddingHorizontal: 10, paddingTop: 2}}
            name="plus"
            color="white"
            size={35}
          /> */}
          </TouchableOpacity>
        </LinearGradient>
      </StyledCardHome>
    </>
  ) : (
    <StyledCard color="white">
      {/* <Text style={styles.crushText}>Daily Stats</Text> */}
      <StyledIconContainer>
        <View>
          {/* <StyledCircleView></StyledCircleView> */}
          <CarbSVG />
          <StyledNumber>{data?.net_carbs || 0}G</StyledNumber>
          <StyledText>Carbs</StyledText>
        </View>
        <View>
          {/* <StyledCircleView></StyledCircleView> */}
          <CaloriesSVG />

          <StyledNumber>{data?.fiber || 0}G</StyledNumber>
          <StyledText>Fiber</StyledText>
        </View>
        <View>
          {/* <StyledCircleView></StyledCircleView> */}
          <ProtienSVG />
          <StyledNumber>{data?.protein || 0}G</StyledNumber>
          <StyledText>Proteins</StyledText>
        </View>
        <View>
          {/* <StyledCircleView></StyledCircleView> */}
          <FatSVG />
          <StyledNumber>{data?.fats || 0}G</StyledNumber>
          <StyledText>Fats</StyledText>
        </View>
        <View>
          {/* <StyledCircleView></StyledCircleView> */}
          <SugarSvg />
          <StyledNumber>{data?.sugar || 0}G</StyledNumber>
          <StyledText>Sugar</StyledText>
        </View>

        {/* {home ? (
          <TouchableOpacity
            onPress={() =>
              navigate('DailyIntakeScreen', {
                screen: 'Ingredients',
                initial: false,
              })
            }>
            {/* <StyledCircleTouchableOpacity></StyledCircleTouchableOpacity> */}
        {/* <AddSvg width={70} height={70} />
            <StyledNumber>Calculate</StyledNumber>
            <StyledText>Now</StyledText>
          </TouchableOpacity>
        ) : null} */}
      </StyledIconContainer>
    </StyledCard>
  );
};

const StyledIconContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;

  margin: 10px;
`;
const StyledCircleView = styled(View)`
  border-width: 2px;
  border-radius: 28px;
  height: 57px;
  width: 57px;
  align-self: center;
  justify-content: center;
  padding-left: 13px;
  border-color: #72b852;
`;
const StyledNumber = styled(Text)`
  margin: 5px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #464444;
`;
const StyledText = styled(Text)`
  font-weight: 700;
  color: gray;
  font-size: 10px;
  text-align: center;
`;
const StyledText2 = styled(Text)`
  margin-top: 20px;
  font-weight: 700;
  color: gray;
  font-size: 12px;
  text-align: center;
`;
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#41B87F',
    marginLeft: 5,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    // paddingHorizontal: 0,
    // elevation: 5,
    // width: 180,
  },
  buttonAlign: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  trackButton: {
    // marginVertical: height * 0.02,
    marginVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'center',
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
    // width: '70%',
  },
  quotesContainer: {
    alignItems: 'flex-start',
    maxWidth: '80%',
  },
  buttonContainer: {
    // height: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 50,
  },
  crushText: {
    marginHorizontal: 20,
    marginVertical: 20,

    fontWeight: 'bold',
    fontSize: 22,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});
const StyledCard = styled(View)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width}px`};
  height: 150px;

  border-radius: 10px;
  border-color: #e9f0ea;
`;
const StyledCardHome = styled(View)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width}px`};
  height: 270px;
  margin: 10px;
  padding-top: 15px;

  border-radius: 10px;
  border-color: #e9f0ea;
`;

export default MyCravings;
