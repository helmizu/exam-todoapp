/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, TextProps, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNDatePicker from 'react-native-modern-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from './BottomSheet';
import Text from './Text';

interface IProps extends TextProps {
  label?: string;
  value?: string;
  error?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  format?: string;
}

const TimePicker = ({
  label,
  onChangeText,
  placeholder,
  format = 'HH:mm',
  value = '',
  onBlur,
  error = '',
  ...props
}: IProps) => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setSelectedTime(value);
    }
  }, [value]);

  return (
    <View>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={styles.containerInput}
        onPress={() => setOpenModal(true)}>
        <Text
          style={[
            props.style,
            styles.input,
            !selectedTime ? styles.placeholder : {},
          ].flat()}>
          {selectedTime || placeholder || format}
        </Text>
        <Ionicons name="time-outline" color="#556172" size={24} />
      </Pressable>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <BottomSheet open={openModal} onClose={() => setOpenModal(false)}>
        <RNDatePicker
          options={{
            backgroundColor: '#FFFFFF',
            textHeaderColor: '#4B7BE5',
            textDefaultColor: '#363942',
            selectedTextColor: '#fff',
            mainColor: '#4B7BE5',
            textSecondaryColor: '#363942',
            borderColor: 'transparent',
          }}
          mode="time"
          minuteInterval={5}
          style={{
            borderRadius: 12,
          }}
          onTimeChange={(time: string) => {
            setSelectedTime(time);
            onChangeText?.(time);
            onBlur?.();
            setOpenModal(false);
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  label: {fontSize: 16, marginBottom: 8, color: '#556172'},
  input: {fontSize: 16, height: 24, color: '#707070', flex: 1},
  containerInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#D8D9DB',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    color: '#B1B6BD',
  },
  error: {fontSize: 14, marginTop: 4, color: '#ff2131'},
});
