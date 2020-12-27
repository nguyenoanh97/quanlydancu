import React, {Fragment, useEffect, useState} from 'react';
import Loading from './Loading';
import {actionEmitter} from '../../core/utils/emiter';
import {addListenerEmitter} from '../../core/utils/funtions';

export const ModalWrapper = () => {
  const [state, setState] = useState({
    typeModal: null,
    params: null,
  });

  // useEffect(() => {
  //   NetInfo.addEventListener(stateInternet => {
  //     !stateInternet.isConnected &&
  //     emitParams(actionEmitter.TOGGLE_MODAL_INTERNET, {visible: true});
  //   });
  // }, []);

  const onCloseModal = () =>
    setState((arg) => ({...arg, params: {...state.params, visible: false}}));

  const setParams = (typeModal, params) =>
    setState((arg) => ({...arg, typeModal, params}));

  const actionListener = (type, data) => {
    setTimeout(() => {
      setParams(type, data);
    }, 100);
  };

  useEffect(() => {
    addListenerEmitter(actionListener);
  }, []);

  const renderSwitch = () => {
    const {params} = state;
    switch (state.typeModal) {
      case actionEmitter.TOGGLE_MODAL_LOADING:
        return <Loading data={params} onCloseModal={onCloseModal} />;
      default:
        return null;
    }
  };

  return <Fragment>{renderSwitch()}</Fragment>;
};
