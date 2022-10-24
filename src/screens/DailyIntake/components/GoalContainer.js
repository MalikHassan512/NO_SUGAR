import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {ProgressBar} from 'react-native-paper';

export default function DailyIntake({data}) {
  return (
    <>
      <View style={styles.dualContainer}>
        <ProgressCircle
          percent={(data?.Calories?.Done / data?.Calories?.Target) * 100 || 0}
          radius={80}
          borderWidth={15}
          color="#ef462b"
          shadowColor="#f9b9af"
          bgColor="#fff">
          <ProgressCircle
            percent={(data?.Water?.Done / data?.Water?.Target) * 100 || 0}
            radius={65}
            borderWidth={15}
            color="#267db3"
            shadowColor="#abcee2"
            bgColor="#fff">
            <ProgressCircle
              percent={(data?.Walk?.Done / data?.Walk?.Target) * 100 || 0}
              radius={50}
              borderWidth={15}
              color="#68c182"
              shadowColor="#c5e7cf"
              bgColor="#fff">
              <ProgressCircle
                percent={(data?.Sleep?.Done / data?.Sleep?.Target) * 100 || 0}
                radius={35}
                borderWidth={15}
                color="#fad55c"
                shadowColor="#fdefc2"
                bgColor="#fff">
                {/* <Text style={{fontWeight: '700', zIndex: -1, marginTop: -45}}>
                  Im
                </Text> */}
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('Sleep Activity')}>
                  <Text style={styles.value}>{data?.Sleep?.Done || 0}</Text>
                  <Text style={styles?.hourText}>Hours</Text>
                </TouchableOpacity> */}
              </ProgressCircle>
            </ProgressCircle>
          </ProgressCircle>
        </ProgressCircle>
        <View
          style={{
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View>
            <Text style={{fontSize: 12}}>
              Calories{' '}
              <Text style={{color: '#ef462b'}}>
                {(
                  (data?.Calories?.Done / data?.Calories?.Target) *
                  100
                ).toFixed(1) || 0}
                %
              </Text>{' '}
              <Text style={{color: '#ef462b'}}>{`${data?.Calories?.Done || 0}/${
                data?.Calories?.Target || 2000
              } Kcal`}</Text>
            </Text>

            <ProgressBar
              progress={data?.Calories?.Done / data?.Calories?.Target || 0}
              color={'#ef462b'}
            />
          </View>
          <View>
            <Text style={{fontSize: 12}}>
              Water{' '}
              <Text style={{color: '#267db3'}}>
                {' '}
                {((data?.Water?.Done / data?.Water?.Target) * 100).toFixed(1) ||
                  0}
                %
              </Text>{' '}
              <Text style={{color: '#267db3'}}>
                {`${data?.Water?.Done || 0}/${
                  data?.Water?.Target || 8
                } Glasses`}
              </Text>
            </Text>

            <ProgressBar
              progress={data?.Water?.Done / data?.Water?.Target || 0}
              color={'#267db3'}
            />
          </View>
          <View>
            <Text style={{fontSize: 12}}>
              Walk{' '}
              <Text style={{color: '#68c182'}}>
                {' '}
                {((data?.Walk?.Done / data?.Walk?.Target) * 100).toFixed(1) ||
                  0}
                %
              </Text>{' '}
              <Text style={{color: '#68c182'}}>
                {' '}
                {`${data?.Walk?.Done || 0}/${data?.Walk?.Target || 8} Steps`}
              </Text>
            </Text>

            <ProgressBar
              progress={data?.Walk?.Done / data?.Walk?.Target || 0}
              color={'#68c182'}
            />
          </View>
          <View>
            <Text style={{fontSize: 12}}>
              Sleep{' '}
              <Text style={{color: '#fad55c'}}>
                {' '}
                {((data?.Sleep?.Done / data?.Sleep?.Target) * 100).toFixed(1) ||
                  0}
                %
              </Text>{' '}
              <Text style={{color: '#fad55c'}}>
                {' '}
                {`${data?.Sleep?.Done || 0}/${data?.Sleep?.Target || 8} Hours`}
              </Text>
            </Text>

            <ProgressBar
              progress={data?.Sleep?.Done / data?.Sleep?.Target || 0}
              color={'#fad55c'}
            />
          </View>
        </View>
      </View>
      {/* <View style={styles.mainContainer}>
        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Calories</Text>
            <Calories />
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(data?.Calories?.Done / data?.Calories?.Target) * 100}
              radius={50}
              borderWidth={8}
              color="#ef462b"
              shadowColor="#ffe8ea"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => navigation.navigate('Food Activity')}>
                <Text style={styles.value}>{data?.Calories?.Done || 0}</Text>
                <Text style={styles?.hourText}>Kcal</Text>
              </TouchableOpacity>
            </ProgressCircle>
          </View>
        </Card>

        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Walk</Text>
            <Walk />
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(data?.Walk?.Done / data?.Walk?.Target) * 100}
              radius={50}
              borderWidth={8}
              color="#68c182"
              shadowColor="#e1ffde"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => navigation.navigate('Exercise Activity')}>
                <Text style={styles.value}>{data?.Walk?.Done || 0}</Text>
                <Text style={styles?.hourText}>Steps</Text>
              </TouchableOpacity>
            </ProgressCircle>
          </View>
        </Card>
      </View>
      <View style={styles.mainContainer}>
        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Water</Text>
            <Water />
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(data?.Water?.Done / data?.Water?.Target) * 100}
              radius={50}
              borderWidth={8}
              color="#267db3"
              shadowColor="#dcf5fc"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => navigation.navigate('Water Activity')}>
                <Text style={styles.value}>{data?.Water?.Done || 0}</Text>
                <Text style={styles?.hourText}>Glasses</Text>
              </TouchableOpacity>
            </ProgressCircle>
          </View>
        </Card>

        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Sleep</Text>
            <Sleep />
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(data?.Sleep?.Done / data?.Sleep?.Target) * 100}
              radius={50}
              borderWidth={8}
              color="#fad55c"
              shadowColor="#ffe8db"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => navigation.navigate('Sleep Activity')}>
                <Text style={styles.value}>{data?.Sleep?.Done || 0}</Text>
                <Text style={styles?.hourText}>Hours</Text>
              </TouchableOpacity>
            </ProgressCircle>
          </View>
        </Card>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  hourText: {
    textAlign: 'center',
    color: 'gray',
    fontWeight: '500',
  },
  counter: {
    fontSize: 12,
    // marginVertical: 0,
    marginBottom: 5,
    color: 'grey',
    marginHorizontal: 10,
  },
  value: {
    fontWeight: '700',
    fontSize: 16,
    width: 100,
    textAlign: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
    marginVertical: 15,
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 18,
    // margin: 10,
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    flex: 0.2,
    marginTop: 5,
  },
  dualContainer: {
    flex: 0.5,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
    height: 'auto',
    flexDirection: 'row',
  },
  mainContainer: {
    // height: 210,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});
