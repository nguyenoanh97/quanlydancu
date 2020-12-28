import React, {useState, useEffect, useRef} from 'react';
import {Alert, BackHandler, StyleSheet, View, ScrollView} from 'react-native';
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
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {width} from '../../core/utils/const_value';
import ThirdPageInfo from './components/third_page_info';
import FourthPageInfo from './components/fourth_page_info';
import {createResident} from '../../core/services/api';
import {emitParams, toast} from '../../core/utils/funtions';
import {actionEmitter} from '../../core/utils/emiter';

const dataPage = [
  {
    id: '0',
  },
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
];

const initState = {
  // page 1
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
  passport: '', //ho chieu,
  //  page 2
  education: '', // hoc van
  advancedEducation: '', //hoc van cao
  specialize: '', // chuyen mon
  language: '', // ngoai ngu
  job: '', //cong viec
  resident: '', // thuong tru
  accommodation: '', // noi o
  cityId: '', // thanh pho id
  districtId: '', // quan huyen id
  wardId: '', // phuong xa id,
  imageId: '', //ma anh the
  // page 3
  householdId: '', //so ho khau
  householdHeadRelationship: '', // quan he vs chu ho
  host: '', // chu tro
  hostHeadRelationship: '', // quan he vs chu tro
  criminalRecord: '', // tien an
  die: '', // da chet
  go: '', // da di
  comeDate: '', //ngay den
  goDate: '', // ngay di
  note: '', // ghi chu
  // page 4
  createdDate: '', // ngay tao
  changeDate: '', // ngay sua
  personCreated: '', // nguoi tao
  kt: '', // loai kt
  fatherId: '', // ma bo
  motherId: '', //ma me
  coupleId: '', // ma vo/chong
  numSiblings: '', // so anh chi em
  listSiblings: '', // ds ma anh chi em
  householdHeadId: '', // ma chu ho
  phone: '', // so dien thoai
};

const numPage = 4;

export default function AddResident({navigation, route}) {
  const [state, setState] = useState(initState);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (route?.params?.data) {
      const {data} = route?.params;
      setState(data);
      setEditable(false);
    }
  }, [route.params]);

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

  const alertSuccess = () =>
    Alert.alert('Thông báo!', 'Bạn đã thêm cư dân thành công!', [
      {text: 'Trở lại', onPress: onBack},
      {
        text: 'Thêm cư dân mới',
        onPress: () => {},
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

  const onSetLoading = (status) => {
    emitParams(actionEmitter.TOGGLE_MODAL_LOADING, {visible: status});
  };

  const onCreateResident = () => {
    createResident(state)
      .then((value) => {
        console.log('value', value);
        onSetLoading(false);
        alertSuccess();
      })
      .catch((e) => {
        console.error(e);
        onSetLoading(false);
        toast(`Xảy ra lỗi: ${e}`, 'danger');
      });
  };

  const onNext = () => {
    if (activeIndex === numPage - 1 && editable) {
      onSetLoading(true);
      onCreateResident();
    } else {
      _ref?.current?.snapToNext(true);
    }
  };

  const renderSwitch = (item) => {
    switch (item.id) {
      case '0':
        return (
          <FirstPageInfo
            onChangeState={onChangeState}
            state={state}
            editable={editable}
          />
        );
      case '1':
        return (
          <SecondPageInfo
            onChangeState={onChangeState}
            state={state}
            editable={editable}
          />
        );
      case '2':
        return (
          <ThirdPageInfo
            onChangeState={onChangeState}
            state={state}
            editable={editable}
          />
        );
      case '3':
        return (
          <FourthPageInfo
            onChangeState={onChangeState}
            state={state}
            editable={editable}
          />
        );
      default:
        return null;
    }
  };

  const _renderItem = ({item}) => (
    <ScrollView style={{height: 500}}>{renderSwitch(item)}</ScrollView>
  );

  const onSnapToItem = (index) => setActiveIndex(index);

  const pagination = () => {
    return (
      <View style={{}}>
        <Pagination
          dotsLength={dataPage.length}
          activeDotIndex={activeIndex}
          dotStyle={styles.dotStylePagination}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
    );
  };

  return (
    <Container>
      <Header
        onLayout={(e) =>
          console.log('height header', e.nativeEvent.layout.height)
        }>
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
          data={dataPage}
          enableSnap={false}
          scrollEnabled={false}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={onSnapToItem}
        />
        {/*{pagination()}*/}
      </Content>
      <Footer
        onLayout={(e) =>
          console.log('height Footer', e.nativeEvent.layout.height)
        }>
        <FooterTab>
          <Button light onPress={onPrev} disabled={activeIndex === 0}>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              {'< Trang trước'}
            </Text>
          </Button>
          <Button
            primary
            onPress={onNext}
            disabled={activeIndex === numPage - 1 && !editable}>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              {activeIndex === numPage - 1 && editable
                ? 'Thêm cư dân'
                : 'Trang sau >'}
            </Text>
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
  dotStylePagination: {
    width: 20,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#FFB76B',
    alignSelf: 'center',
    marginHorizontal: -5,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
  },
});
