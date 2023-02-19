/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const COLORS = ['#0093E0', '#E95400', '#FF6961'];

interface IProps {
  name: string;
  total: number;
  done?: number;
  index?: number;
}

const CardCategory = ({name, total = 0, done = 0, index = 0}: IProps) => {
  const mainColor = COLORS[index];
  const percentage = total ? Math.trunc((done * 100) / total) : 0;
  return (
    <View
      style={{
        borderRadius: 12,
        width: 200,
        elevation: 1,
        backgroundColor: '#fff',
      }}>
      <LinearGradient
        colors={[mainColor, '#B0C880']}
        locations={[0.35, 1]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 12,
            paddingTop: 48,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '500'}}>
            {name}
          </Text>
          <Text style={{color: '#F8F7FF', fontSize: 12, fontWeight: '400'}}>
            {total} {total > 1 ? 'Activities' : 'Activity'}
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
        }}>
        <Text style={{color: '#363942', fontSize: 15, fontWeight: '600'}}>
          {percentage}%
        </Text>
        <View
          style={{
            flex: 1,
            height: 2,
            borderRadius: 1,
            backgroundColor: '#EDF1F5',
            marginTop: 4,
          }}>
          <View
            style={{
              height: 2,
              borderRadius: 1,
              backgroundColor: '#1FA8E7',
              width: `${percentage}%`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CardCategory;
