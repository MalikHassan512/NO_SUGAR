import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Card, Divider, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import WaterSvg from '../../../../assets/drinking-water.svg';
import MusicSvg from '../../../../assets/general/music.svg';
import SnacksSvg from '../../../../assets/new/snackpack.svg';
import ExerciseSvg from '../../../../assets/general/exercise.svg';
import {getData} from '../../NetworkRequest';
import moment from 'moment';

const width = Dimensions.get('screen').width;

const data = [
  {
    val: 1,
    image: <WaterSvg width={95} height={95} />,
    text: 'Drink a glass of water!',
  },
  {
    val: 2,
    image: <MusicSvg width={95} height={95} />,
    text: 'Get Busy!',
  },
  {
    val: 3,
    image: <SnacksSvg width={95} height={95} />,
    text: 'Munch on a No Sugar Substitute!.',
  },
  {
    val: 4,
    image: <ExerciseSvg width={95} height={95} />,
    text: 'Move your body! ',
  },
];

const CrushStat = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState('');
  const order = useSelector(state => state?.craving?.order);
  const token = useSelector(state => state?.auth?.token);
  const getUserCravings = async () => {
    try {
      const resp = await getData(token, 'user-craving/');
      console.log('dataacarving dataaa', resp?.results);
      setData(resp.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserCravings();
  }, []);
  return loading ? (
    <View style={styles.activityContainer}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.cardContainer}>
        <Card style={[styles.cardStyle, {backgroundColor: '#372424'}]}>
          <Text style={[styles.textStyle, {color: 'white'}]}>
            {data[0]?.crushed}
          </Text>
          <Text style={[styles.cardText, {color: 'white'}]}>Crushed</Text>
        </Card>
        <Card style={[styles.cardStyle, {backgroundColor: '#FFCD9F'}]}>
          <View>
            <Text style={[styles.textStyle, {color: '#372424'}]}>
              {data[0]?.completed_steps}
            </Text>
            <Text style={[styles.cardText, {color: '#372424'}]}>Completed</Text>
          </View>
        </Card>
      </View>
      {/* {open === 'br' ? ( */}
      {data?.[1].map(item => (
        <Card key={item} onPress={() => setOpen('')} style={styles.mainCard}>
          {/* </Card> */}
          {/* <Card onPress={() => setOpen('br')} style={styles.cardContainer2}> */}

          <TouchableOpacity
            onPress={() => (open === item ? setOpen('') : setOpen(item))}
            style={styles.normalContainer}>
            <View style={{flexDirection: 'row'}}>
              <Icons name="clock-time-five" color="#66cc33" size={20} />
              <Text style={{fontWeight: 'bold', marginLeft: 5, fontSize: 16}}>
                {moment(item).format('DD MMM YYYY')}
              </Text>
            </View>
            {/* <View style={styles.normalContainer}> */}
            <Text style={{color: '#66cc33'}}>
              {open === item ? 'See Less' : 'See More'}
            </Text>
            {/* <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('Ingredients', {p_code: 'br'})
                }>
                <AddButton />
              </TouchableOpacity> */}
            {/* </View> */}
          </TouchableOpacity>
          {open === item && (
            <TouchableOpacity>
              {data[2]
                .filter(
                  da =>
                    moment(da?.created_at).format('YYYY-MM-DD').toString() ===
                    item,
                )
                ?.map(dat => (
                  <View key={dat?.uuid}>
                    <View key={dat?.uuid} style={styles.normalContainer}>
                      <View style={{flexDirection: 'row', width: '60%'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '600',
                            marginRight: 10,
                          }}>
                          Step {dat?.crav_step}
                        </Text>
                        <Text>{dat?.craving}</Text>
                      </View>
                      <Text>
                        {moment(dat?.created_at, 'HH:mm:ss').format('LT')}
                      </Text>
                    </View>
                    <Divider />
                  </View>
                ))}
            </TouchableOpacity>
          )}
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    fontWeight: '700',

    textAlign: 'center',
  },
  textStyle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  intakeCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intakeCard: {
    width: width - 40,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 100,
    borderRadius: 20,
    padding: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  cardStyle: {
    width: '45%',
    height: 120,
    paddingVertical: 20,
    alignItems: 'center',

    borderRadius: 20,
  },
  mainCard: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  normalContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cardContainer2: {
    marginVertical: 5,
    padding: 10,
    elevation: 3,
    borderRadius: 15,
  },
  activityContainer: {
    flex: 1,
    // height: height * 0.5,ß
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CrushStat;
