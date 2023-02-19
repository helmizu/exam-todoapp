/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mapColorStatus = (status: string) => {
  if (status === 'Done') {
    return '#50C890';
  }
  if (status === 'Cancel') {
    return '#de2131';
  }
  return '#4B7BE5';
};

interface IProps {
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

const CardTask = ({
  title,
  category,
  date,
  startTime,
  endTime,
  status,
}: IProps) => {
  return (
    <View
      style={{
        borderRadius: 12,
        width: '100%',
        elevation: 2,
        shadowOffset: {width: 0, height: 8},
        shadowRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        backgroundColor: '#fff',
        padding: 16,
        gap: 8,
      }}>
      <View>
        <Text
          style={{
            color: '#363942',
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 4,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: '#363942',
            fontSize: 12,
            fontWeight: '400',
            opacity: 0.65,
          }}>
          {category}
        </Text>
      </View>
      <View style={{width: '100%', height: 1, backgroundColor: '#BFBFBF'}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'flex-start',
          }}>
          <Ionicons name="time-outline" color="#4B7BE5" size={16} />
          <View>
            <Text
              style={{
                color: '#363942',
                fontSize: 14,
                fontWeight: '400',
                opacity: 0.65,
                marginBottom: 4,
              }}>
              {date}
            </Text>
            <Text
              style={{
                color: '#363942',
                fontSize: 14,
                fontWeight: '400',
                opacity: 0.65,
              }}>
              {startTime} - {endTime}
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: mapColorStatus(status),
            borderRadius: 16,
          }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: '500',
              color: '#FFFFFF',
            }}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardTask;
