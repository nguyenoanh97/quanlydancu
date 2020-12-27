import React from 'react';
import {Form} from 'native-base';
import InputBase from '../../../components/input-base';

export default function ThirdPageInfo({state, onChangeState}) {
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

  return (
    <Form>
      <InputBase
        name="householdId"
        value={householdId}
        label="Số hộ khẩu*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="householdHeadRelationship"
        value={householdHeadRelationship}
        label="QH với chủ hộ*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="host"
        value={host}
        label="Chủ trọ"
        onChangeState={onChangeState}
      />
      <InputBase
        name="hostHeadRelationship"
        value={hostHeadRelationship}
        label="QH với chủ trọ"
        onChangeState={onChangeState}
      />
      <InputBase
        name="criminalRecord"
        value={criminalRecord}
        label="Tiền án tiền sự*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="die"
        value={die}
        label="Đã chết?*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="go"
        value={go}
        label="Đã đi*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="comeDate"
        value={comeDate}
        label="Ngày đến"
        onChangeState={onChangeState}
      />
      <InputBase
        name="goDate"
        value={goDate}
        label="Ngày đi"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="note"
        value={note}
        label="Ghi chú"
        onChangeState={onChangeState}
      />
    </Form>
  );
}
