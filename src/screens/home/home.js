import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Button,
  Header,
  Left,
  Icon,
  Body,
  Title,
  H2,
} from 'native-base';
import {ADD_RESIDENT, SEARCH} from '../../core/utils/screen_names';
import ButtonFeature from '../../components/button-feature';
import {getUser} from '../../core/utils/funtions';

export default function Home({navigation}) {
  const [name, setName] = useState('');

  useEffect(() => {
    getUser().then((value) => {
      value && setName(`, ${JSON.parse(value)?.name}!`);
    });
  }, []);

  const onAdd = () => {
    navigation.navigate(ADD_RESIDENT);
  };

  const onSearch = () => {
    navigation.navigate(SEARCH);
  };

  return (
    <Container>
      <Header noLeft>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Trang chủ</Title>
        </Body>
      </Header>
      <H2
        style={{
          marginTop: 32,
          marginLeft: 16,
        }}>
        Xin chào{name}
      </H2>
      <View style={styles.viewButton}>
        <ButtonFeature
          imgURL="https://pngimage.net/wp-content/uploads/2018/05/add-customer-icon-png-4.png"
          title="Thêm cư dân"
          onPress={onAdd}
        />
        <ButtonFeature
          imgURL="https://cdn3.iconfinder.com/data/icons/webstore-soft/512/audience_people_business_group_person_student_man-512.png"
          title="Tìm kiếm cư dân"
          onPress={onSearch}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  viewButton: {
    marginTop: 32,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
