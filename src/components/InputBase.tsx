import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps extends TextInputProps {
  label?: string;
  iconEnd?: string;
  iconStart?: string;
}

const InputBase = ({
  label = '',
  iconEnd = '',
  iconStart = '',
  ...props
}: IProps) => {
  return (
    <View>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.containerInput}>
        {!!iconStart && <Ionicons name={iconStart} color="#556172" size={24} />}
        <TextInput
          {...props}
          style={[props.style, styles.input].flat()}
          underlineColorAndroid="transparent"
          placeholderTextColor="#B1B6BD"
        />
        {!!iconEnd && <Ionicons name={iconEnd} color="#556172" size={24} />}
      </View>
    </View>
  );
};

export default InputBase;

const styles = StyleSheet.create({
  label: {fontSize: 16, marginBottom: 8, color: '#556172'},
  input: {fontSize: 16, height: 24, color: '#707070', flex: 1},
  containerInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#E8E9EB',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
