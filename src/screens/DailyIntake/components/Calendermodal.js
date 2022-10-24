import React, {useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {getActivityValue} from '../../../redux/actions/homeStatActions';
import {getGoalValue} from '../../../redux/actions/goalAction';

const CalenderModal = ({
  isVisible,
  onSetDateRange,
  onSetDate,
  onClose,
  startDate,
  endDate,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const token = useSelector(state => state?.auth?.token);

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
            <CalendarPicker
              todayBackgroundColor="#2DCA1F"
              allowRangeSelection={true}
              allowBackwardRangeSelect={true}
              selectedDayColor="#afebaa"
              selectedDayTextColor="black"
              onDateChange={(date, type) => {
                if (type == 'END_DATE') {
                  console.log('selectedStartDate', selectedStartDate);
                  // setSelectedEndDate(date);
                  onSetDate({start: selectedStartDate, end: date});
                  onSetDateRange(
                    `${moment(selectedStartDate).format('YYYY-MM-DD')},${moment(
                      date,
                    ).format('YYYY-MM-DD')}`,
                  );
                  dispatch(
                    getGoalValue(token, {
                      date_range: `${moment(selectedStartDate).format(
                        'YYYY-MM-DD',
                      )},${moment(date).format('YYYY-MM-DD')}`,
                    }),
                  );
                  dispatch(
                    getActivityValue(token, {
                      date_range: `${moment(selectedStartDate).format(
                        'YYYY-MM-DD',
                      )},${moment(date).format('YYYY-MM-DD')}`,
                    }),
                  );
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                } else {
                  setSelectedStartDate(date);
                  // onSetDate({start: date});
                }
                // onSetDate(date);
              }}
              maxDate={Date.now()}
              minDate={Date.now() - 1000 * 60 * 60 * 24 * 30}
            />
            <IconButton
              size={30}
              onPress={() => onClose()}
              icon="close"
              style={{
                right: 25,
                position: 'absolute',
                marginTop: -5,
              }}
            />
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

export default CalenderModal;
