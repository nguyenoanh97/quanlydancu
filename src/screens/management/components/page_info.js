import React from 'react';
import {Form} from 'native-base';
import InputBase from '../../../components/input-base';

export default function PageInfo({state, onChangeState, editable}) {
  const {name, avatar, workUnit, number, dateOfBirth, rank} = state;

  return (
    <Form>
      <InputBase
        name="name"
        value={name}
        label="Tên người dùng"
        onChangeState={onChangeState}
        editable={editable}
      />
      <InputBase
        name="avatar"
        value={avatar}
        label="Ảnh"
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
        value={number.toString()}
        label="Số hiệu"
        onChangeState={onChangeState}
        editable={editable}
      />
      <InputBase
        name="dateOfBirth"
        value={dateOfBirth}
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
