import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Button,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Content,
  Spinner,
} from 'native-base';
import PageInfo from './components/page_info';
import {getUser} from '../../core/utils/funtions';

export default function DetailProfile({navigation}) {
  const [state, setState] = useState(null);

  const onChangeState = (objValue) => setState({...state, ...objValue});

  const onBack = () => navigation.goBack();

  useEffect(() => {
    getUser().then((value) => {
      value && setState(JSON.parse(value));
    });
  }, []);

  return (
    <Container>
      <Header
        onLayout={(e) =>
          console.log('height header', e.nativeEvent.layout.height)
        }>
        <Left>
          <Button transparent onPress={onBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Thông tin cá nhân</Title>
        </Body>
      </Header>
      <Content style={styles.bottom}>
        {state ? (
          <PageInfo
            state={state}
            onChangeState={onChangeState}
            editable={false}
          />
        ) : (
          <Spinner color="blue" />
        )}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  bottom: {
    marginBottom: 30,
  },
});
