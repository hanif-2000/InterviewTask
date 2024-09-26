import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Images from '../common/images';
import Strings from '../common/Strings';

type HomeScreenProps = {
  route: any;
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({route, navigation}) => {
  const {data} = route.params || {};
  return (
    <View style={styles.__sMainContainer}>
      <View style={styles.__sCentered}>
        <Image source={Images.Logo} style={styles.__sLogo} />
      </View>
      <View style={styles.__sCenteredTextContainer}>
        <Text style={styles.__sWelcomeText}>
          {Strings.welcomeUser}
          {data?.name}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.__sTouchableText}
        onPressIn={() => navigation.navigate('Welcome')}>
        <Text style={styles.__sButtonText}>{Strings.logout}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  __sMainContainer: {
    flex: 1,
  },
  __sMainImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  __sMargin: {
    margin: 5,
  },
  __sRowMargin: {
    flexDirection: 'row',
    margin: 5,
  },
  __sIconSize: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  __sWiFiIcon: {
    right: 10,
  },
  __sCentered: {
    alignItems: 'center',
  },
  __sLogo: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  __sCenteredTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    width: '90%',
  },
  __sWelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  __sTouchableText: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#A3CFFF',
    width: '80%',
    height: 45,
    borderRadius: 20,
    marginTop: '40%',
  },
  __sButtonText: {
    color: 'black',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20,
  },
});
