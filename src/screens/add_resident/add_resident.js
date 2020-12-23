import React, {useState, useEffect, useRef} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
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
import FirstPageInfo from './components/first_page_info';
import SecondPageInfo from './components/second_page_info';
import Carousel from 'react-native-snap-carousel';
import {width} from '../../core/utils/const_value';

const initState = {
  peopleCode: '', // ma nguoi dan
  name: '', // ten
  date: '', //ngay sinh
  gender: 'Nam', // gioi tinh
  regionBirth: '', // Nơi sinh
  nativeLand: '', // que quan
  nation: '', // dan toc
  otherNation: '', // dan toc khac
  religion: '', // ton giao
  otherReligion: '', // ton giao khac
  country: '', //quoc gia
  identityCard: '', // cmnd,
  passport: '', //ho chieu
};

export default function AddResident({navigation}) {
  const [state, setState] = useState(initState);
  const [activeIndex, setActiveIndex] = useState(0);

  const _ref = useRef(null);

  const onChangeState = (objValue) => setState({...state, ...objValue});

  const onBack = () => navigation.goBack();

  const alertUser = () =>
    Alert.alert('Thông báo!', 'Bạn có muốn quay trở lại?', [
      {text: 'Đồng ý', onPress: onBack},
      {
        text: 'Hủy',
        onPress: () => null,
        style: 'cancel',
      },
    ]);

  const backAction = () => {
    alertUser();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onPrev = () => _ref?.current?.snapToPrev(true);

  const onNext = () => _ref?.current?.snapToNext(true);

  const _renderItem = ({item, index}) => {
    return (
      <View>
        {index === 0 ? (
          <FirstPageInfo onChangeState={onChangeState} state={state} />
        ) : (
          <SecondPageInfo onChangeState={onChangeState} state={state} />
        )}
      </View>
    );
  };

  const onSnapToItem = (index) => setActiveIndex(index);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={alertUser}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Thêm cư dân</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Carousel
          ref={_ref}
          data={[0, 1]}
          enableSnap={false}
          scrollEnabled={false}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={onSnapToItem}
        />
        <View style={styles.bottomView} />
      </Content>
      <Footer>
        <FooterTab>
          <Button light onPress={onPrev}>
            <Text>{'< Trang trước'}</Text>
          </Button>
          <Button primary onPress={onNext}>
            <Text>{'Trang sau >'}</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    height: 32,
  },
  wrapper: {},
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
