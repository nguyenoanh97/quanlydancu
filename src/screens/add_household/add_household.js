import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {emitParams, toast} from '../../core/utils/funtions';
import PageInput from './components/page_input';
import HeaderBase from '../../components/header';
import FooterBase from '../../components/footer';
import {createHousehold} from '../../core/services/api';
import {actionEmitter} from '../../core/utils/emiter';

const initState = {
  householdId: '', //so ho khau
  note: '', // mo ta
  numMember: '', // so thanh vien
  householdHeadId: '', //id chu ho
};

export default function AddHousehold({navigation}) {
  const [state, setState] = useState(initState);

  const onBack = () => navigation.goBack();

  const onChangeState = (objValue) => setState({...state, ...objValue});

  const onSetLoading = (status) => {
    emitParams(actionEmitter.TOGGLE_MODAL_LOADING, {visible: status});
  };

  const alertSuccess = () =>
    Alert.alert('Thông báo!', 'Bạn đã thêm hộ khẩu mới thành công!', [
      {text: 'Trở lại', onPress: onBack},
      {
        text: 'Thêm hộ khẩu mới',
        onPress: () => {},
        style: 'cancel',
      },
    ]);

  const onPressButton = () => {
    onSetLoading(true);
    createHousehold(state)
      .then((value) => {
        console.log('value', value);
        onSetLoading(false);
        alertSuccess();
      })
      .catch((e) => {
        console.error(e);
        onSetLoading(false);
        toast(`Xảy ra lỗi: ${e}`, 'danger');
      });
  };

  return (
    <Container>
      <HeaderBase title="Thêm hộ khẩu" onPressLeft={onBack} />
      <Content style={styles.bottom}>
        <PageInput
          state={state}
          onChangeState={onChangeState}
          editable={true}
        />
      </Content>
      <FooterBase
        onPressCenter={onPressButton}
        title={'Thêm hộ khẩu'}
        disabled={false}
        type="oneButton"
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  bottom: {
    marginBottom: 30,
  },
});
