import React from 'react';
import {Form, Thumbnail} from 'native-base';
import InputBase from '../../../components/input-base';
import {StyleSheet} from 'react-native';
import moment from 'moment';

export default function PageInfo({state, onChangeState, editable}) {
  const {name, avatar, workUnit, number, dateOfBirth, rank} = state;

  return (
    <Form>
      <Thumbnail large source={{uri: avatar}} style={styles.avatar} />
      <InputBase
        name="name"
        value={name}
        label="Tên người dùng"
        onChangeState={onChangeState}
        editable={editable}
      />
      <InputBase
        name="workUnit"
        value={workUnit}
        label="Đơn vị"
        onChangeState={onChangeState}
        editable={editable}
      />
      <InputBase
        name="number"
        value={number}
        label="Số hiệu"
        onChangeState={onChangeState}
        editable={editable}
      />
      <InputBase
        name="dateOfBirth"
        value={moment(dateOfBirth).format('L')}
        label="Ngày sinh"
        onChangeState={onChangeState}
        editable={editable}
      />
      <InputBase
        name="rank"
        value={rank}
        label="Quân hàm"
        onChangeState={onChangeState}
        editable={editable}
      />
    </Form>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    marginVertical: 32,
  },
});
