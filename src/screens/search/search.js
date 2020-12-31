import React, {useState, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Spinner,
} from 'native-base';
import {searchByPeopleCode} from '../../core/services/api';
import {toast} from '../../core/utils/funtions';
import {avatarDefault} from '../../../assets/images';
import {ADD_RESIDENT} from '../../core/utils/screen_names';
import HeaderBase from '../../components/header';
import FooterBase from '../../components/footer';

export default function Search({navigation}) {
  const [text, setText] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [isLoadingSearch, setLoadingSearch] = useState(false);

  const onChangeText = (value) => setText(value);

  const onBlur = () => {
    if (text !== '') {
      setLoadingSearch(true);
      searchByPeopleCode('peopleCode', text)
        .then((value) => {
          setLoadingSearch(false);
          setDataSearch(value);
          console.log('value', value);
        })
        .catch((e) => {
          toast(`Xảy ra lỗi: ${e}`, 'danger');
          console.error(e);
        });
    }
  };

  const renderItemData = (item, index) => {
    const onViewInfo = () => {
      navigation.navigate(ADD_RESIDENT, {data: item});
    };

    return (
      <ListItem thumbnail key={index.toString()}>
        <Left>
          <Thumbnail square source={avatarDefault} />
        </Left>
        <Body>
          <Text>{item?.name}</Text>
          <Text note numberOfLines={2}>
            {item.nativeLand}
          </Text>
        </Body>
        <Right>
          <Button transparent onPress={onViewInfo}>
            <Text>Chi tiết</Text>
          </Button>
        </Right>
      </ListItem>
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderBase type="search" onBlur={onBlur} onChangeText={onChangeText} />
      <Content>
        <Fragment>
          {!isLoadingSearch && dataSearch.length > 0 && (
            <List>{dataSearch.map(renderItemData)}</List>
          )}
          {!isLoadingSearch && dataSearch.length === 0 && (
            <Text style={styles.textEmpty}>Không có dữ liệu</Text>
          )}
          {isLoadingSearch && <Spinner color="blue" />}
        </Fragment>
      </Content>
      <FooterBase onPressLeft={onBack} onPreesRight={() => {}} />
    </Container>
  );
}

const styles = StyleSheet.create({
  textEmpty: {
    textAlign: 'center',
    marginTop: 20,
  },
});
