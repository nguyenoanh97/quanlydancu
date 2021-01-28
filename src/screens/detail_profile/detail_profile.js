import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Spinner} from 'native-base';
import PageInfo from './components/page_info';
import HeaderBase from '../../components/header';

export default function DetailProfile({navigation, route}) {
  const [user, setUser] = useState(null);

  const onBack = () => navigation.goBack();

  useEffect(() => {
    if (route?.params?.data) {
      const {data} = route?.params;
      setUser(data);
    } else {
      global.user && setUser(global.user);
    }
  }, []);

  return (
    <Container>
      <HeaderBase onPressLeft={onBack} title="Thông tin cá nhân" />
      <Content style={styles.bottom}>
        {user ? (
          <PageInfo state={user} editable={false} />
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
