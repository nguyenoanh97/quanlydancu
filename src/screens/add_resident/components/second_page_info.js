import React from 'react';
import {Form} from 'native-base';
import InputBase from '../../../components/input-base';

export default function SecondPageInfo({state, onChangeState}) {
  const {peopleCode} = state;

  return (
    <Form>
      <InputBase
        name="peopleCode"
        value={peopleCode}
        label="Mã người dân2*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
    </Form>
  );
}
