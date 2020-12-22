import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Button,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Content,
  Footer,
  FooterTab,
  Text,
} from 'native-base';
import PageBasicInfo from './components/page_basic_info';

export default function AddResident({navigation}) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Thêm cư dân</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <PageBasicInfo />
      </Content>
      <Footer>
        <FooterTab>
          <Button light>
            <Text>{`< Trang trước`}</Text>
          </Button>
          <Button primary>
            <Text>{`Trang sau >`}</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({});
