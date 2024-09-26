import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Images from '../common/images';

interface CustomTextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean; // Optional prop for password field
  error?: string; // To show validation errors
  Icon?: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  Icon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.inputContainer,
            {borderColor: error ? 'red' : '#808080'},
          ]}>
          <Image
            source={Icon}
            style={[styles.inputIcon, {tintColor: error ? 'red' : '#808080'}]}
          />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="#808080"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
          />
          {secureTextEntry && (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={styles.toggleText}>
                {isPasswordVisible ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 45,
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: '#808080',
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 10,
    width: '100%',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  toggleText: {
    marginLeft: 10,
    color: '#007BFF',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 10,
  },
  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
});

export default CustomTextInput;
