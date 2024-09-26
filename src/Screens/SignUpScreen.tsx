import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Images from '../common/images';
import Strings from '../common/Strings';
import CustomCheckBox from '../Components/CheckBox';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../Components/CustomTextInput';
import {registerUser} from '../services/apiService';
import Spinner from 'react-native-loading-spinner-overlay';

interface SignUpScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheckBox = () => {
    setIsChecked(prev => !prev);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await registerUser(values);
      navigation.navigate('HomeScreen', {
        data: response,
      });
    } catch (error) {
      console.error('Registration Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.__sMainContainer}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
        <Formik
          initialValues={{name: '', phone: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              <View style={styles.__sLogoContainer}>
                <Image source={Images.Logo} style={styles.__sLogo} />
              </View>

              <View style={styles.__sTextContainer}>
                <Text style={styles.__sHeaderText}>{Strings.signUpText}</Text>
                <Text style={styles.__sDescriptionText}>
                  {Strings.signUpDescription}
                </Text>
              </View>

              <View style={styles.__sInputContainer}>
                <Text style={styles.__sLabelText}>{Strings.name}</Text>
                <CustomTextInput
                  label="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  error={errors.name}
                  Icon={Images.user}
                />
              </View>

              <View style={styles.__sInputContainer}>
                <Text style={styles.__sLabelText}>{Strings.phone}</Text>
                <CustomTextInput
                  label="Phone"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  error={errors.phone}
                  Icon={Images.mail}
                />
              </View>

              <View style={styles.__sInputContainer}>
                <Text style={styles.__sLabelText}>{Strings.password}</Text>
                <CustomTextInput
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  error={errors.password}
                  Icon={Images.LockIcon}
                />
              </View>

              <View style={styles.checkboxContainer}>
                <CustomCheckBox
                  isChecked={isChecked}
                  onToggle={toggleCheckBox}
                  label={Strings.agreeTerms}
                />
                <TouchableOpacity>
                  <Text style={styles.__sTermsText}>
                    {Strings.termsAndConditions}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.__sTouchableText}
                onPress={() => handleSubmit()}>
                <Text style={styles.__sButtonText}>{Strings.signInTitle}</Text>
              </TouchableOpacity>

              <View style={styles.__sRelativeContainer}>
                <Image
                  source={Images.bottomImage}
                  style={styles.__sBottomImage}
                />
                <View style={styles.__sBottomContainer}>
                  <Text style={styles.__sBottomText}>
                    {Strings.alreadyHaveAccount}{' '}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignIn')}>
                      <Text style={styles.__sSignInText}>
                        {Strings.signInTitle}
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
                <View style={styles.__sPrivacyPolicyContainer}>
                  <Text style={styles.__sPrivacyPolicyText}>
                    {Strings.byLogin}
                    <Text>{Strings.privacyPolicy}</Text>
                  </Text>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  __sMainContainer: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  __sLogoContainer: {
    alignItems: 'center',
    marginTop: 70,
  },
  __sLogo: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  __sTextContainer: {
    margin: 10,
  },
  __sHeaderText: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
    bottom: 10,
  },
  __sDescriptionText: {
    fontSize: 13,
  },
  __sInputContainer: {
    paddingLeft: 10,
    marginTop: 10,
  },
  __sLabelText: {
    color: '#000',
    fontWeight: '500',
    paddingLeft: 10,
  },
  __sTouchableText: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#A3CFFF',
    width: '95%',
    height: 50,
    borderRadius: 20,
    marginTop: '9%',
  },
  __sButtonText: {
    color: 'black',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20,
  },
  __sBottomContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 30,
    position: 'absolute',
  },
  __sBottomText: {
    fontSize: 15,
    textAlign: 'center',
  },
  __sSignInText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontWeight: '700',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  __sTermsText: {
    textDecorationLine: 'underline',
    color: '#808080',
  },
  __sRelativeContainer: {
    position: 'relative',
  },
  __sBottomImage: {
    width: 340,
    height: 210,
    marginLeft: '30%',
  },
  __sPrivacyPolicyContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '40%',
  },
  __sPrivacyPolicyText: {
    textAlign: 'center',
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
