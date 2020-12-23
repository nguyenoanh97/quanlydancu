import React from 'react';
import {Form, ActionSheet} from 'native-base';
import InputBase from '../../../components/input-base';

const GENDER = [
  {text: 'Nam', icon: 'american-football', iconColor: '#2c8ef4'},
  {text: 'Nữ', icon: 'analytics', iconColor: '#f42ced'},
  {text: 'Khác', icon: 'aperture', iconColor: '#ea943b'},
];

export default function FirstPageInfo({state, onChangeState}) {
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

  return (
    <Form>
      <InputBase
        name="peopleCode"
        value={peopleCode}
        label="Mã người dân*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="name"
        value={name}
        label="Tên cư dân*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="date"
        value={date}
        label="Ngày sinh*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="gender"
        value={gender}
        label="Giới tính*"
        onChangeState={onChangeState}
        onPress={onChangeGender}
      />
      <InputBase
        name="regionBirth"
        value={regionBirth}
        label="Nơi sinh*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="name"
        value={nativeLand}
        label="Quê quán*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="nation"
        value={nation}
        label="Dân tộc*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="otherNation"
        value={otherNation}
        label="Dân tộc khác"
        onChangeState={onChangeState}
      />
      <InputBase
        name="religion"
        value={religion}
        label="Tôn giáo*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="otherReligion"
        value={otherReligion}
        label="Tôn giáo khác"
        onChangeState={onChangeState}
      />
      <InputBase
        name="country"
        value={country}
        label="Đất nước*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="identityCard"
        value={identityCard}
        label="Số CMND, thẻ căn cước*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="passport"
        value={passport}
        label="Hộ chiếu"
        onChangeState={onChangeState}
      />
    </Form>
  );
}
