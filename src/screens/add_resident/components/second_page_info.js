import React from 'react';
import {Form} from 'native-base';
import InputBase from '../../../components/input-base';

export default function SecondPageInfo({state, onChangeState}) {
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

  return (
    <Form>
      <InputBase
        name="education"
        value={education}
        label="Học vấn (12/12)*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="advancedEducation"
        value={advancedEducation}
        label="Học vấn nâng cao khác"
        onChangeState={onChangeState}
      />
      <InputBase
        name="specialize"
        value={specialize}
        label="Chuyên môn*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="language"
        value={language}
        label="Ngoại ngữ"
        onChangeState={onChangeState}
      />
      <InputBase
        name="job"
        value={job}
        label="Nghề nghiệp*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="resident"
        value={resident}
        label="Thường trú*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="accommodation"
        value={accommodation}
        label="Nơi ở*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="cityId"
        value={cityId}
        label="Thành phố*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="districtId"
        value={districtId}
        label="Quận huyện*"
        onChangeState={onChangeState}
        keyboardType="numeric"
      />
      <InputBase
        name="wardId"
        value={wardId}
        label="Xã phường*"
        onChangeState={onChangeState}
      />
      <InputBase
        name="imageId"
        value={imageId}
        label="Mã ảnh thẻ*"
        onChangeState={onChangeState}
      />
    </Form>
  );
}
