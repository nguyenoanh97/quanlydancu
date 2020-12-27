import React from 'react';
import {Form} from 'native-base';
import InputBase from '../../../components/input-base';

export default function FourthPageInfo({state, onChangeState}) {
  const {
    createdDate,
    changeDate,
    personCreated,
    kt,
    fatherId,
    motherId,
    coupleId,
    numSiblings,
    listSiblings,
    householdHeadId,
    phone,
  } = state;

  return (
    <Form>
      <InputBase
        name="createdDate"
        value={createdDate}
        label="Ngày tạo*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="changeDate"
        value={changeDate}
        label="Ngày sửa*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="personCreated"
        value={personCreated}
        label="Người tạo"
        onChangeState={onChangeState}
      />
      <InputBase
        name="kt"
        value={kt}
        label="Loại KT"
        onChangeState={onChangeState}
      />
      <InputBase
        name="fatherId"
        value={fatherId}
        label="Mã bố*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="motherId"
        value={motherId}
        label="Mã mẹ*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="coupleId"
        value={coupleId}
        label="Mã vợ/chồng*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="numSiblings"
        value={numSiblings}
        label="Số ạnh chị em*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="listSiblings"
        value={listSiblings}
        label="DS mã anh chị em*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="householdHeadId"
        value={householdHeadId}
        label="Mã chủ hộ*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="phone"
        value={phone}
        label="Số điện thoại*"
        onChangeState={onChangeState}
      />
    </Form>
  );
}
