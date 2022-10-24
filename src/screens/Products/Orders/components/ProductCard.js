import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ProductDetailCard({total, tax, subTotal}) {
  // data.map(item => {
  //   total = total + parseInt(item?.price) * item?.quan;
  // });
  console.log(subTotal, tax, total);
  return (
    <View style={{backgroundColor: 'white'}}>
      <Text style={styles.title4}>Payment Sumamry</Text>

      <View style={[styles.sideBySide]}>
        <Text style={styles.textColor}>Item Total</Text>
        <Text style={styles.textColor4}>{parseFloat(subTotal || 0)} $</Text>
      </View>
      <View style={styles.sideBySide}>
        <Text style={styles.textColor}>Shipping Charge</Text>
        <Text style={styles.textColor4}>0.00 $</Text>
      </View>
      <View style={styles.sideBySide}>
        <Text style={styles.textColor}>Rewards (10)</Text>
        <Text style={styles.textColor4}>0.00 $</Text>
      </View>
      <View style={styles.sideBySide}>
        <Text style={styles.textColor}>Tax</Text>
        <Text style={styles.textColor4}>{parseFloat(tax) || '0.00'} $ </Text>
      </View>
      <View style={styles.sideBySide}>
        <Text style={{color: 'black', fontSize: 18}}>Total</Text>
        <Text style={{fontWeight: 'bold', color: '#66cc33', fontSize: 20}}>
          {parseFloat(total)} $
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title4: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  },
  textColor4: {
    fontWeight: '500',
    fontSize: 16,
    color: '#66cc33',
  },
  sideBySide: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  textColor: {
    color: 'grey',
    fontSize: 16,
  },
});
