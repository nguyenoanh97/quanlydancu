import {Toast} from 'native-base';

export const toast = (msg, type, dur) => {
  Toast.show({
    text: msg,
    duration: dur ? dur : 2000,
    position: 'bottom',
    type: type ? type : 'default',
  });
};
