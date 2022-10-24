import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function MealButton({buttons, onSelect}) {
  const [clickedId, setClickedId] = useState(0);
  const handleClick = (item, id) => {
    setClickedId(id);
    onSelect({
      code:
        id === 1
          ? 'br'
          : id === 2
          ? 'ln'
          : id === 3
          ? 'dn'
          : id === 4
          ? 'sn'
          : '',
    });
  };
  return (
    <View style={styles.container}>
      {buttons.map((buttonLabel, index) => {
        return (
          <TouchableOpacity
            key={buttonLabel + index}
            onPress={item => handleClick(item, index)}
            style={[
              index === clickedId ? styles.buttonActive : styles.button,
              index === 0 ? {borderRadius: 30} : '',
              index === 1 ? {borderRadius: 30} : '',
              index === 2 ? {borderRadius: 30} : '',
              index === 3 ? {borderRadius: 30} : '',
              index === 4 ? {borderRadius: 30} : '',
            ]}>
            <Text
              style={[index === clickedId ? styles.textActive : styles.text]}>
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    marginRight: 5,
    elevation: 5,
    backgroundColor: 'white',
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    marginRight: 5,
    elevation: 5,
    backgroundColor: '#E8FFE0',
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#72B852',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  textActive: {
    color: '#72B852',
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
