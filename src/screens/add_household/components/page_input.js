import React from 'react';
import {Form} from 'native-base';
import InputBase from '../../../components/input-base';

export default function PageInput({state, onChangeState, editable}) {
  const {householdId, note, numMember, householdHeadId} = state;

  return (
    <Form>
      <InputBase
        name="householdId"
        value={householdId}
        label="Số hộ khẩu"
        onChangeState={onChangeState}
        editable={editable}
        keyboardType="numeric"
      />
      <InputBase
        name="numMember"
        value={numMember}
        label="Số thành viên"
        onChangeState={onChangeState}
        editable={editable}
        keyboardType="numeric"
      />
      <InputBase
        name="householdHeadId"
        value={householdHeadId}
        label="Id chủ hộ"
        onChangeState={onChangeState}
        editable={editable}
        keyboardType="numeric"
      />
      <InputBase
        name="note"
        value={note}
        label="Mô tả"
        onChangeState={onChangeState}
        editable={editable}
      />
    </Form>
  );
}
