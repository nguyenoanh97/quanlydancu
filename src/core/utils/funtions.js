import {Toast} from 'native-base';
import {DeviceEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from './async_key';

export const toast = (msg, type, dur) => {
  Toast.show({
    text: msg,
    duration: dur ? dur : 2000,
    position: 'bottom',
    type: type ? type : 'default',
  });
};

const TYPE_EVENT_EMITTER = 'TYPE_EVENT_EMITTER';

export const addListenerEmitter = (callback) => {
  DeviceEventEmitter.addListener(TYPE_EVENT_EMITTER, callback);
  return {
    removeListenerEmitter: () => {
      DeviceEventEmitter.removeListener(TYPE_EVENT_EMITTER, callback);
    },
  };
};

export const emitParams = (type, data) => {
  DeviceEventEmitter.emit(TYPE_EVENT_EMITTER, type, data);
};

export const getUser = async () => await AsyncStorage.getItem(USER);
