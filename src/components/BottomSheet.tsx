import {Modal, StyleSheet, SafeAreaView, View, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from './Text';

interface IProps {
  title?: string;
  onClose?: (e: any) => void;
  open: boolean;
}

const BottomSheet = ({
  title = '',
  onClose,
  children,
  open,
}: React.PropsWithChildren<IProps>) => {
  return (
    <Modal
      visible={open}
      animationType="slide"
      collapsable
      transparent
      onRequestClose={onClose}>
      <LinearGradient
        colors={['#0000007F', '#0000007F', '#FFF']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 0.6, 0.9]}
        style={styles.growth}>
        <SafeAreaView>
          <View style={styles.container}>
            {!!title && (
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Pressable style={styles.buttonIcon} onPress={onClose}>
                  <View style={styles.buttonIcon}>
                    <Ionicons name="close-outline" color="#606D80" size={20} />
                  </View>
                </Pressable>
              </View>
            )}
            <View style={styles.content}>{children}</View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  growth: {flexGrow: 1, justifyContent: 'flex-end', position: 'relative'},
  container: {
    backgroundColor: '#FFF',
    flexGrow: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: '#3E454F',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  buttonIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    minHeight: 120,
  },
});
