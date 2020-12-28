import React, {useState, Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Button,
  Header,
  Icon,
  Item,
  Input,
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Spinner,
  FooterTab,
  Footer,
} from 'native-base';
import {searchByPeopleCode} from '../../core/services/api';
import {toast} from '../../core/utils/funtions';
import {avatarDefault} from '../../../assets/images';
import {ADD_RESIDENT} from '../../core/utils/screen_names';

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
          <Text>Sankhadeep</Text>
          <Text note numberOfLines={1}>
            Its time to build a difference . .
          </Text>
        </Body>
        <Right>
          <Button transparent onPress={onViewInfo}>
            <Text>View</Text>
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
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            autoFocus={true}
            onBlur={onBlur}
            onChangeText={onChangeText}
          />
          <Icon name="ios-people" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      <Content>
        <Fragment>
          {!isLoadingSearch && dataSearch.length > 0 && (
            <List>{dataSearch.map(renderItemData)}</List>
          )}
          {!isLoadingSearch && dataSearch.length === 0 && (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              Không có dữ liệu
            </Text>
          )}
          {isLoadingSearch && <Spinner color="blue" />}
        </Fragment>
      </Content>
      <Footer>
        <FooterTab>
          <Button light onPress={onBack}>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>{'Quay lại'}</Text>
          </Button>
          <Button primary>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              Lọc theo phường, xã
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({});