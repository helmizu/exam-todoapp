/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, TextProps, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNDatePicker from 'react-native-modern-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from './BottomSheet';
import dayjs from 'dayjs';

interface IProps extends TextProps {
  label?: string;
  value?: string;
  error?: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  format?: string;
}

const DatePicker = ({
  label,
  onChangeText,
  placeholder,
  format = 'dddd, DD MMMM YYYY',
  value = '',
  onBlur,
  error = '',
  ...props
}: IProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(value);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dateToRender = selectedDate
    ? dayjs(selectedDate, 'YYYY/MM/DD').format(format)
    : selectedDate;

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
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
            !dateToRender ? styles.placeholder : {},
          ].flat()}>
          {dateToRender || placeholder}
        </Text>
        <Ionicons name="calendar-outline" color="#556172" size={24} />
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
          mode="calendar"
          style={{
            borderRadius: 12,
          }}
          onSelectedChange={(date: string) => {
            setSelectedDate(date);
            onChangeText?.(date);
            onBlur?.();
            setOpenModal(false);
          }}
          selected={selectedDate}
        />
      </BottomSheet>
    </View>
  );
};

export default DatePicker;

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
