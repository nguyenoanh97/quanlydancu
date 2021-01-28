import React, {Fragment, useState} from 'react';
import InputBase from '../../../components/input-base';
import {ActionSheet} from 'native-base';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const ARRAY_BOOLEAN = [
  {text: '0', icon: 'american-football', iconColor: '#2c8ef4'},
  {text: '1', icon: 'analytics', iconColor: '#f42ced'},
];

export default function ThirdPageInfo({state, onChangeState, editable}) {
  const {
    householdId,
    householdHeadRelationship,
    host,
    hostHeadRelationship,
    criminalRecord,
    die,
    go,
    comeDate,
    goDate,
    note,
  } = state;

  const dataPageThird = [
    {
      name: 'householdId',
      value: householdId,
      label: 'Số hộ khẩu*',
      keyboardType: 'numeric',
    },
    {
      name: 'householdHeadRelationship',
      value: householdHeadRelationship,
      label: 'QH với chủ hộ*',
    },
    {
      name: 'host',
      value: host,
      label: 'Chủ trọ',
    },
    {
      name: 'hostHeadRelationship',
      value: hostHeadRelationship,
      label: 'QH với chủ trọ',
    },
    {
      name: 'criminalRecord',
      value: criminalRecord,
      label: 'Tiền án tiền sự',
    },
    {
      name: 'die',
      value: die,
      label: 'Đã chết?*',
    },
    {
      name: 'go',
      value: go,
      label: 'Đã đi',
    },
    {
      name: 'comeDate',
      value: comeDate,
      label: 'Ngày đến',
    },
    {
      name: 'goDate',
      value: goDate,
      label: 'Ngày đi',
    },
    {
      name: 'note',
      value: note,
      label: 'Ghi chú',
    },
  ];

  const [showComeDate, setShowComeDate] = useState(false);

  const [showGoDate, setShowGoDate] = useState(false);

  const onChangeDie = () => {
    ActionSheet.show(
      {
        options: ARRAY_BOOLEAN,
        title: 'Đã chết (1-Đúng, 0-Sai)?',
      },
      (buttonIndex) => {
        console.log('buttonIndex die', buttonIndex);
        buttonIndex !== undefined &&
          ARRAY_BOOLEAN[buttonIndex] &&
          onChangeState({die: ARRAY_BOOLEAN[buttonIndex].text});
      },
    );
  };

  const onChangeGo = () => {
    ActionSheet.show(
      {
        options: ARRAY_BOOLEAN,
        title: 'Đã đi (1-Đúng, 0-Sai)?',
      },
      (buttonIndex) => {
        console.log('buttonIndex go', buttonIndex);
        buttonIndex !== undefined &&
          ARRAY_BOOLEAN[buttonIndex] &&
          onChangeState({go: ARRAY_BOOLEAN[buttonIndex].text});
      },
    );
  };

  const onChangeComeDate = (event, selectedDate) => {
    setShowComeDate(false);
    onChangeState({comeDate: selectedDate});
  };

  const onChangeGoDate = (event, selectedDate) => {
    setShowGoDate(false);
    onChangeState({goDate: selectedDate});
  };

  const renderItem = (item, index) => {
    const {name, label, value, keyboardType} = item;
    const onPressItem = () => {
      switch (name) {
        case 'die':
          onChangeDie();
          break;
        case 'go':
          onChangeGo();
          break;
        case 'comeDate':
          setShowComeDate(true);
          break;
        case 'goDate':
          setShowGoDate(true);
          break;
        default:
          return null;
      }
    };

    return (
      <InputBase
        key={name}
        name={name}
        value={
          name === 'comeDate' || name === 'goDate'
            ? value !== ''
              ? moment(value).format('L')
              : value
            : value
        }
        label={label}
        onChangeState={onChangeState}
        keyboardType={keyboardType}
        editable={editable}
        onPress={
          editable &&
          (name === 'die' ||
            name === 'go' ||
            name === 'comeDate' ||
            name === 'goDate')
            ? onPressItem
            : null
        }
        isLastPage={index === dataPageThird.length - 1}
      />
    );
  };

  return (
    <Fragment>
      {dataPageThird.map(renderItem)}
      {showComeDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(comeDate)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeComeDate}
        />
      )}
      {showGoDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(goDate)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeGoDate}
        />
      )}
    </Fragment>
  );
}
