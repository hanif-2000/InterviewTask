import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../common/images';
import Strings from '../common/Strings';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types';

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WelcomeScreen'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainImageContainer}>
        <ImageBackground source={Images.logo} style={styles.logoImage} />
        <ImageBackground source={Images.maskgroup} style={styles.maskImage} />
      </View>
      <View>
        <Image source={Images.washLogo} style={styles.logohandler} />
      </View>
      <View style={styles.mainText}>
        <Text style={styles.text}>{Strings.welcomeMessage}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.touchableText}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>{Strings?.letsStart}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{fontSize: 14}}>
          {Strings?.already}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.bottomText}>{Strings?.signUpText}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoImage: {
    width: 180,
    height: 210,
    resizeMode: 'contain',
  },
  maskImage: {
    width: 160,
    height: 220,
    resizeMode: 'contain',
  },
  logohandler: {
    width: '100%',
    height: 290,
    resizeMode: 'contain',
  },
  mainText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 19,
    color: '#808080',
    fontWeight: '600',
  },
  touchableText: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#A3CFFF',
    width: '65%',
    height: 50,
    borderRadius: 20,
    marginTop: '15%',
  },
  buttonText: {
    color: '#000',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 17,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  bottomText: {
    textDecorationLine: 'underline',
    color: '#000',
    fontWeight: '700',
  },
});
