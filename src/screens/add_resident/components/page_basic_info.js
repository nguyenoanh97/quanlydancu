import React, {useState} from 'react';
import {Form, Input, Item, Label, ActionSheet} from 'native-base';

const GENDER = [
  {text: 'Nam', icon: 'american-football', iconColor: '#2c8ef4'},
  {text: 'Nữ', icon: 'analytics', iconColor: '#f42ced'},
  {text: 'Khác', icon: 'aperture', iconColor: '#ea943b'},
];

export default function PageBasicInfo({}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('Nam');
  const [regionBirth, setRegionBirth] = useState('');
  const [nativeLand, setNativeLand] = useState('');

  console.log('data', {
    name,
    date,
    gender,
    regionBirth,
    nativeLand,
  });

  const onChangeName = (text) => setName(text);

  const onChangeDate = (newDate) => setDate(newDate);

  const onChangeGender = () =>
    ActionSheet.show(
      {
        options: GENDER,
        title: 'Chọn giới tính',
      },
      (buttonIndex) => {
        buttonIndex &&
          GENDER[buttonIndex] &&
          setGender(GENDER[buttonIndex].text);
      },
    );

  const onChangeRegionBirth = (value) => setRegionBirth(value);

  const onChangeNativeLand = (value) => setNativeLand(value);

  return (
    <Form>
      <Item floatingLabel>
        <Label>Tên cư dân</Label>
        <Input onChangeText={onChangeName} />
      </Item>
      <Item floatingLabel>
        <Label>Ngày sinh</Label>
        <Input onChangeText={onChangeDate} keyboardType="numeric" />
      </Item>
      <Item floatingLabel onPress={onChangeGender}>
        <Label>Giới tính</Label>
        <Input editable={false} value={gender} />
      </Item>
      <Item floatingLabel>
        <Label>Nơi sinh</Label>
        <Input onChangeText={onChangeRegionBirth} />
      </Item>
      <Item floatingLabel>
        <Label>Quê quán</Label>
        <Input onChangeText={onChangeNativeLand} />
      </Item>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
    </Form>
  );
}
