/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BottomSheet from './BottomSheet';
import InputBase from './InputBase';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Select from './Select';
import Button from './Button';
import FAB from './FAB';
import {DATA_CATEGORIES} from '../constants/Categories';
import dayjs from 'dayjs';

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

const normalizeDateTimeToISOString = (date: string, time: string) => {
  const cDate = dayjs(`${date} ${time}`, 'dddd, DD MMMM YYYY HH:mm');
  if (cDate.isValid()) {
    return cDate.toISOString();
  }
  return 'invalid date';
};
const initializeFormData = (data?: FormData): FormData => {
  if (!data) {
    return {
      id: 0,
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      category: '',
      status: 'On Progress',
    };
  }
  return {
    id: data.id || 0,
    title: data.title || '',
    date: data.date ? dayjs(data.date).format('dddd, DD MMMM YYYY') : '',
    startTime: data.startTime ? dayjs(data.startTime).format('HH:mm') : '',
    endTime: data.endTime ? dayjs(data.endTime).format('HH:mm') : '',
    description: data.description || '',
    category: data.category || '',
    status: data.status || 'On Progress',
  };
};
const serializeFormData = (data: FormData): FormData => ({
  ...data,
  date: normalizeDateTimeToISOString(data.date, data.startTime),
  startTime: normalizeDateTimeToISOString(data.date, data.startTime),
  endTime: normalizeDateTimeToISOString(data.date, data.endTime),
});

interface IProps {
  onSubmit: (data: FormData) => void;
  data?: FormData;
}

const FormCreateTask = ({data, onSubmit}: IProps) => {
  const [openModalTask, setOpenModalTask] = useState<boolean>(false);
  const {control, handleSubmit, reset} = useForm<FormData>({
    defaultValues: initializeFormData(data),
    resolver: yupResolver(schema),
  });

  const _onSubmit = (formData: FormData) => {
    const serialized = serializeFormData(formData);
    onSubmit(serialized);
    setOpenModalTask(false);
    reset();
  };

  return (
    <>
      <BottomSheet
        title="New Task"
        open={openModalTask}
        onClose={() => setOpenModalTask(false)}>
        <View style={{gap: 24}}>
          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <InputBase
                label="Title"
                placeholder="Buy some stuff"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <DatePicker
                label="Date"
                placeholder="dddd, DD MMM YYYY"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
            name="date"
          />
          <View style={{flexDirection: 'row', gap: 24}}>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <TimePicker
                    label="Start"
                    placeholder="HH:mm"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
                name="startTime"
              />
            </View>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <TimePicker
                    label="End"
                    placeholder="HH:mm"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
                name="endTime"
              />
            </View>
          </View>
          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <InputBase
                label="Description"
                placeholder="Apple 1kg, ..."
                multiline
                numberOfLines={3}
                scrollEnabled
                style={{minHeight: 64}}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
            name="description"
          />
          <Controller
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Select
                label="Category"
                placeholder="Daily Activity"
                options={DATA_CATEGORIES}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
            name="category"
          />
          <Button onPress={handleSubmit(_onSubmit)}>Create a new task</Button>
        </View>
      </BottomSheet>
      <FAB
        position={{bottom: 24, right: 24}}
        onPress={() => setOpenModalTask(true)}
      />
    </>
  );
};

export default FormCreateTask;
