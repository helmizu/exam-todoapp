import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  icon?: string;
  onPress?: (e: any) => void;
  position: {top?: number; bottom?: number; left?: number; right?: number};
}

const FAB = ({
  onPress,
  icon = 'add-outline',
  position,
}: React.PropsWithChildren<IProps>) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles.fab, position]}>
      <LinearGradient
        colors={['#0093E9', '#80D0C7']}
        locations={[0.15, 0.92]}
        start={{x: 0, y: 0.1}}
        end={{x: 1, y: -0.1}}
        style={[styles.button, styles.contentCenter]}>
        <Ionicons name={icon} color="#F8F6FF" size={20} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    zIndex: 10,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
