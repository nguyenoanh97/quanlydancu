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
import {getImage, searchByPeopleCode} from '../../core/services/api';
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
          getImage()
            .then((valueImage) => {
              const dataWithImage = value.map((item) => {
                const img = valueImage.find(
                  (_item) => item.imageId === _item.id,
                );
                if (img) {
                  return {...item, ...img};
                } else {
                  return item;
                }
              });
              setDataSearch(dataWithImage);
            })
            .catch((e) => {
              toast(`Xảy ra lỗi: ${e}`, 'danger');
              console.error(e);
            })
            .finally(() => {
              setLoadingSearch(false);
            });
        })
        .catch((e) => {
          setLoadingSearch(false);
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
          <Thumbnail
            square
            source={item.urlImage ? {uri: item.urlImage} : avatarDefault}
          />
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
