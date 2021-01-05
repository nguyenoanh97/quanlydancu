import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Container, Spinner, Text} from 'native-base';
import HeaderBase from '../../components/header';
import {height} from '../../core/utils/const_value';
import {getAdminByRank, updateAdmin} from '../../core/services/api';
import ItemSearch from '../../components/item-search';
import {DETAIL_PROFILE} from '../../core/utils/screen_names';
import {emitParams, handleError, toast} from '../../core/utils/funtions';
import {actionEmitter} from '../../core/utils/emiter';

export default function Management({navigation}) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const onBack = () => navigation.goBack();

  useEffect(() => {
    const {rank, cityId, districtId} = global.user;
    getAdminByRank('rank', `${parseInt(rank) - 1}`)
      .then((value) => {
        setLoading(false);
        const valueFilter = value.filter(
          (item) =>
            item.districtId === districtId && item.cityId === cityId && item,
        );
        setData(valueFilter);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  }, []);

  const onSetLoading = (status) => {
    emitParams(actionEmitter.TOGGLE_MODAL_LOADING, {visible: status});
  };

  const renderItem = ({item}) => {
    const onPressView = () => {
      navigation.navigate(DETAIL_PROFILE, {data: item});
    };

    const onPressOther = () => {
      onSetLoading(true);
      updateAdmin({...item, active: !item.active})
        .then(() => {
          onSetLoading(false);
          const newArr = data.map((i) =>
            i.id === item.id ? {...i, active: !i.active} : i,
          );
          toast('Thay đổi trạng thái thành công!', 'success');
          setData(newArr);
        })
        .catch(handleError);
    };

    return (
      <ItemSearch
        item={item}
        titleOther={item.active ? 'Chặn' : 'Bỏ chặn'}
        actionView={onPressView}
        actionOther={onPressOther}
      />
    );
  };

  const renderListEmptyComponent = () => (
    <View style={styles.viewLoading}>
      {isLoading ? <Spinner color="blue" /> : <Text>Danh sách trống</Text>}
    </View>
  );

  return (
    <Container>
      <HeaderBase title="Danh sách cán bộ" onPressLeft={onBack} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderListEmptyComponent}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  viewLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height - 70,
  },
});
