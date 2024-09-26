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
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../Components/CustomTextInput';
import {loginUser} from '../services/apiService';
import Spinner from 'react-native-loading-spinner-overlay';

type SignInScreenProps = {
  navigation: any;
};

const SignInScreen: React.FC<SignInScreenProps> = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await loginUser(values);
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
          initialValues={{phone: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              <View style={styles.__sLogoContainer}>
                <Image source={Images.Logo} style={styles.__sLogo} />
              </View>

              <View style={styles.__sHeader}>
                <Text style={styles.__sHeaderTitle}>{Strings.signInTitle}</Text>
                <Text style={styles.__sHeaderSubtitle}>
                  {Strings.signInSubtitle}
                </Text>
              </View>

              <View style={styles.__sInputWrapper}>
                <Text style={styles.__sLabel}>{Strings.phone}</Text>
                <CustomTextInput
                  label="Phone"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  error={errors.phone}
                  Icon={Images.MailIcon}
                />
              </View>

              <View style={styles.__sInputWrapper}>
                <Text style={styles.__sLabel}>Password</Text>
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

              <TouchableOpacity style={styles.__sForgotPassword}>
                <Text style={styles.__sForgotPasswordText}>
                  {Strings.forgotPassword}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.__sTouchableText}
                onPress={() => handleSubmit()}>
                <Text style={styles.__sButtonText}>{Strings.signInTitle}</Text>
              </TouchableOpacity>

              <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <Text style={styles.orText}>{Strings.orText}</Text>
              </View>

              <View style={styles.__sSocialIconContainer}>
                <TouchableOpacity>
                  <Image
                    source={Images.AppleIcon}
                    style={styles.__sSocialIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                    source={Images.GoogleIcon}
                    style={styles.__sSocialIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.__sBottomSection}>
                <Image
                  source={Images.BottomImage1}
                  style={styles.__sBottomImage}
                />
                <View style={styles.__sBottomContainer}>
                  <Text style={styles.__sBottomTextContainer}>
                    {Strings.noAccount}{' '}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}>
                      <Text style={styles.__sBottomText}>
                        {Strings.signUpText}
                      </Text>
                    </TouchableOpacity>
                  </Text>
                  <View style={styles.__sTermsContainer}>
                    <Text style={styles.__sTermsText}>
                      {Strings.termsAndPolicy}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  __sMainContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  __sHeader: {
    margin: 10,
  },
  __sHeaderTitle: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  __sHeaderSubtitle: {
    fontSize: 13,
  },
  __sInputWrapper: {
    margin: 10,
  },
  __sLabel: {
    color: '#000',
    fontWeight: '500',
    marginBottom: 5,
    paddingLeft: 5,
  },

  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 13,
  },
  __sForgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 12,
  },
  __sForgotPasswordText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    textDecorationLine: 'underline',
    lineHeight: 21,
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
  separatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: '#A3CFFF',
    width: '70%',
    height: 0,
    position: 'absolute',
    top: '50%',
  },
  orText: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    textAlign: 'center',
    zIndex: 1,
  },
  __sSocialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '28%',
    alignSelf: 'center',
  },
  __sSocialIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  __sBottomSection: {},
  __sBottomImage: {
    width: 300,
    height: 210,
    marginRight: '30%',
  },
  __sBottomContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  __sBottomTextContainer: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  __sBottomText: {
    textDecorationLine: 'underline',
    color: 'black',
    fontWeight: '700',
  },
  __sTermsContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  __sTermsText: {
    textAlign: 'center',
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
