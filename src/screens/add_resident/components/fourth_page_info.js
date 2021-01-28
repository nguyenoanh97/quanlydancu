import React, {Fragment} from 'react';
import InputBase from '../../../components/input-base';

export default function FourthPageInfo({state, onChangeState, editable}) {
  const {
    kt,
    fatherId,
    motherId,
    coupleId,
    numSiblings,
    listSiblings,
    householdHeadId,
    phone,
  } = state;

  const dataPageFourth = [
    {
      name: 'kt',
      value: kt,
      label: 'Loại KT',
    },
    {
      name: 'fatherId',
      value: fatherId,
      label: 'Mã bố*',
      keyboardType: 'numeric',
    },
    {
      name: 'motherId',
      value: motherId,
      label: 'Mã mẹ*',
      keyboardType: 'numeric',
    },
    {
      name: 'coupleId',
      value: coupleId,
      label: 'Mã vợ/chồng*',
      keyboardType: 'numeric',
    },
    {
      name: 'numSiblings',
      value: numSiblings,
      label: 'Số ạnh chị em*',
      keyboardType: 'numeric',
    },
    {
      name: 'listSiblings',
      value: listSiblings,
      label: 'DS mã anh chị em',
      keyboardType: 'numeric',
    },
    {
      name: 'householdHeadId',
      value: householdHeadId,
      label: 'Mã chủ hộ*',
      keyboardType: 'numeric',
    },
    {
      name: 'phone',
      value: phone,
      label: 'Số điện thoại*',
      keyboardType: 'numeric',
    },
  ];

  const renderItem = (item, index) => {
    const {name, label, value, keyboardType} = item;

    return (
      <InputBase
        key={name}
        name={name}
        value={value}
        label={label}
        onChangeState={onChangeState}
        keyboardType={keyboardType}
        editable={editable}
        isLastPage={index === dataPageFourth.length - 1}
      />
    );
  };

  return <Fragment>{dataPageFourth.map(renderItem)}</Fragment>;
}
