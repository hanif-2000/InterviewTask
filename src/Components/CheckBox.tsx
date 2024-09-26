import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface CustomCheckBoxProps {
  isChecked: boolean;
  onToggle: () => void;
  label: string;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  isChecked,
  onToggle,
  label,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  checked: {
    backgroundColor: '#A3CFFF',
    borderColor: '#007BFF',
  },
  checkmark: {
    fontSize: 16,
    color: 'white',
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
});

export default CustomCheckBox;
