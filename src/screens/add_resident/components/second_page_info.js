import React, {Fragment} from 'react';
import InputBase from '../../../components/input-base';

export default function SecondPageInfo({state, onChangeState, editable}) {
  const {
    education,
    advancedEducation,
    specialize,
    language,
    job,
    resident,
    accommodation,
    cityId,
    districtId,
    wardId,
    imageId,
  } = state;

  const dataPageSecond = [
    {
      name: 'education',
      value: education,
      label: 'Học vấn (12/12)*',
      keyboardType: 'numeric',
    },
    {
      name: 'advancedEducation',
      value: advancedEducation,
      label: 'Học vấn nâng cao khác',
    },
    {
      name: 'specialize',
      value: specialize,
      label: 'Chuyên môn*',
    },
    {
      name: 'language',
      value: language,
      label: 'Ngoại ngữ',
    },
    {
      name: 'job',
      value: job,
      label: 'Nghề nghiệp*',
    },
    {
      name: 'resident',
      value: resident,
      label: 'Thường trú*',
    },
    {
      name: 'accommodation',
      value: accommodation,
      label: 'Nơi ở*',
    },
    {
      name: 'cityId',
      value: cityId,
      label: 'ID Thành phố*',
      keyboardType: 'numeric',
    },
    {
      name: 'districtId',
      value: districtId,
      label: 'ID Quận huyện*',
      keyboardType: 'numeric',
    },
    {
      name: 'wardId',
      value: wardId,
      label: 'ID Xã phường*',
      keyboardType: 'numeric',
    },
    {
      name: 'imageId',
      value: imageId,
      label: 'Mã ảnh thẻ*',
      keyboardType: 'numeric',
    },
  ];

  const renderItem = (item, index) => {
    const {name, label, value, keyboardType} = item;
    const onPressItem = () => {
      switch (name) {
        case 'cityId':
          break;
        default:
          return null;
      }
    };

    return (
      <InputBase
        key={name}
        name={name}
        value={value}
        label={label}
        onChangeState={onChangeState}
        keyboardType={keyboardType}
        editable={editable}
        onPress={!editable || name === '' ? onPressItem : null}
        isLastPage={index === dataPageSecond.length - 1}
      />
    );
  };

  return <Fragment>{dataPageSecond.map(renderItem)}</Fragment>;
}
