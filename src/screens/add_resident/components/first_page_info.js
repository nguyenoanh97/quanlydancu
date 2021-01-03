import React, {Fragment, useState} from 'react';
import {ActionSheet} from 'native-base';
import InputBase from '../../../components/input-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const GENDER = [
  {text: 'Nam', icon: 'american-football', iconColor: '#2c8ef4'},
  {text: 'Nữ', icon: 'analytics', iconColor: '#f42ced'},
  {text: 'Khác', icon: 'aperture', iconColor: '#ea943b'},
];

export default function FirstPageInfo({state, onChangeState, editable}) {
  const {
    peopleCode,
    name,
    date,
    gender,
    regionBirth,
    nativeLand,
    nation,
    otherNation,
    religion,
    otherReligion,
    country,
    identityCard,
    passport,
  } = state;

  const dataPageFirst = [
    {
      name: 'peopleCode',
      value: peopleCode,
      label: 'Mã người dân*',
      keyboardType: 'numeric',
    },
    {
      name: 'name',
      value: name,
      label: 'Tên cư dân*',
    },
    {
      name: 'date',
      value: date,
      label: 'Ngày sinh*',
    },
    {
      name: 'gender',
      value: gender,
      label: 'Giới tính*',
    },
    {
      name: 'regionBirth',
      value: regionBirth,
      label: 'Nơi sinh*',
    },
    {
      name: 'nativeLand',
      value: nativeLand,
      label: 'Quê quán*',
    },
    {
      name: 'nation',
      value: nation,
      label: 'Dân tộc*',
    },
    {
      name: 'otherNation',
      value: otherNation,
      label: 'Dân tộc khác',
    },
    {
      name: 'religion',
      value: religion,
      label: 'Tôn giáo*',
    },
    {
      name: 'otherReligion',
      value: otherReligion,
      label: 'Tôn giáo khác',
    },
    {
      name: 'country',
      value: country,
      label: 'Quốc tịch*',
    },
    {
      name: 'identityCard',
      value: identityCard,
      label: 'Số CMND, thẻ căn cước*',
      keyboardType: 'numeric',
    },
    {
      name: 'passport',
      value: passport,
      label: 'Hộ chiếu*',
      keyboardType: 'numeric',
    },
  ];

  const onChangeGender = () => {
    ActionSheet.show(
      {
        options: GENDER,
        title: 'Chọn giới tính',
      },
      (buttonIndex) => {
        buttonIndex &&
          GENDER[buttonIndex] &&
          onChangeState({gender: GENDER[buttonIndex].text});
      },
    );
  };

  const [show, setShowDate] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDate(false);
    onChangeState({date: selectedDate});
  };

  const renderItem = (item, index) => {
    const {name, label, value, keyboardType} = item;
    const onPressItem = () => {
      switch (name) {
        case 'gender':
          onChangeGender();
          break;
        case 'date':
          setShowDate(true);
          break;
        default:
          return null;
      }
    };

    return (
      <InputBase
        key={index.toString()}
        name={name}
        value={name === 'date' ? moment(value).format('L') : value}
        label={label}
        onChangeState={onChangeState}
        keyboardType={keyboardType}
        editable={editable}
        onPress={name === 'date' || name === 'gender' ? onPressItem : null}
        isLastPage={index === dataPageFirst.length - 1}
      />
    );
  };

  return (
    <Fragment>
      {dataPageFirst.map(renderItem)}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Fragment>
  );
}
