import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Container, Spinner, Text} from 'native-base';
import HeaderBase from '../../components/header';
import {height} from '../../core/utils/const_value';
import {getAdmin} from '../../core/services/api';
import ItemSearch from '../../components/item-search';

export default function Management({navigation}) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const onBack = () => navigation.goBack();

  useEffect(() => {
    getAdmin()
      .then((value) => {
        setLoading(false);
        setData(value);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  }, []);

  const renderItem = ({item}) => (
    <ItemSearch
      thumbnail={item.avatar}
      item={item}
      name={item?.name}
      description={item.workUnit}
      titleOther="Chặn"
      actionView={() => {}}
      actionOther={() => {}}
    />
  );

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
