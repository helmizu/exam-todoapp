/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import * as yup from 'yup';
import BottomSheet from './BottomSheet';
import Button from './Button';
import {StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import Tag from './Tag';

const schema = yup
  .object({
    id: yup.number().required(),
    title: yup.string().required(),
    date: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    status: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
interface IProps {
  data: FormData | any;
  open: boolean;
  onClose: () => void;
  onUpdate: (data: FormData) => void;
}

const DetailTask = ({data, open, onClose, onUpdate}: IProps) => {
  const onUpdateTask = (status: string) => {
    const dataToUpdate = {...data, status};
    onUpdate(dataToUpdate as FormData);
    onClose();
  };
  return (
    <>
      <BottomSheet title={data?.title} open={open} onClose={onClose}>
        <View style={{gap: 16, marginBottom: 24}}>
          <Text style={styles.subtitle1}>Date & Time</Text>
          <Text style={styles.body2}>
            {dayjs(data?.date).format('dddd, DD MMM YYYY')} |{' '}
            {dayjs(data?.startTime).format('HH:mm')} -{' '}
            {dayjs(data?.endTime).format('HH:mm')}
          </Text>
        </View>
        <View style={{gap: 16, marginBottom: 24}}>
          <Text style={styles.subtitle1}>Category</Text>
          <Tag active style={styles.tag}>
            {data?.category}
          </Tag>
        </View>
        <View style={{gap: 16, marginBottom: 24}}>
          <Text style={styles.subtitle1}>Description</Text>
          <Text style={styles.body2}>{data?.description}</Text>
        </View>
        {data?.status === 'On Progress' && (
          <View style={{flexDirection: 'row', gap: 16}}>
            <Button variant="outlined" onPress={() => onUpdateTask('Cancel')}>
              Cancel Task
            </Button>
            <Button variant="contained" onPress={() => onUpdateTask('Done')}>
              Make it Done
            </Button>
          </View>
        )}
      </BottomSheet>
    </>
  );
};

export default DetailTask;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3E454F',
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3E454F',
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3E454F',
  },
  body1: {
    fontSize: 16,
    color: '#363942',
    opacity: 0.65,
  },
  body2: {
    fontSize: 14,
    color: '#363942',
    opacity: 0.65,
  },
  tag: {
    alignSelf: 'flex-start',
  },
});
