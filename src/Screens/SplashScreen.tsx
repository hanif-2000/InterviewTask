import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Images from '../common/images';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

type SplashScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.__sMainContainer}>
      <View style={styles.__sImageContainer}>
        <Image source={Images.logo} style={styles.__sLogoImage} />
        <Image source={Images.MaskGroup} style={styles.__sMaskImage} />
      </View>
      <View>
        <Image source={Images.Logo1} style={styles.__sLogo1Image} />
      </View>
      <View>
        <Image source={Images.Logo2} style={styles.__sLogo2Image} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  __sMainContainer: {
    flex: 1,
  },
  __sImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  __sLogoImage: {
    width: 180,
    height: 210,
    resizeMode: 'contain',
  },
  __sMaskImage: {
    width: 160,
    height: 220,
    resizeMode: 'contain',
  },
  __sLogo1Image: {
    width: '100%',
    height: 450,
    resizeMode: 'contain',
  },
  __sLogo2Image: {
    width: '143%',
    height: '54%',
    resizeMode: 'center',
    bottom: '15%',
  },
});
