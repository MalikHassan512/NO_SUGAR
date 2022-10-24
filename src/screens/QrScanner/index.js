import React, {useEffect} from 'react';
import {View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useNavigation, useRoute} from '@react-navigation/core';
import axios from 'axios';

const QrScanner = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const onSuccess = async ({data}) => {
    console.log('onSucesss', data);
    navigate('QrProduct', {bar_code: data, code: params?.code});
  };

  return (
    <View style={{flex: 1}}>
      <QRCodeScanner
        reactivate={true}
        showMarker={true}
        onRead={onSuccess}
        cameraStyle={{}}
        containerStyle={{}}
        cameraProps={{
          // flashMode: 'off',
          autoFocus: true,
        }}
      />
    </View>
  );
};

export default QrScanner;
