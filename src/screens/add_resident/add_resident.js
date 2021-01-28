import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  BackHandler,
  StyleSheet,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {
  Container,
  Button,
  Footer,
  FooterTab,
  Text,
  Form,
  Content,
} from 'native-base';
import FirstPageInfo from './components/first_page_info';
import SecondPageInfo from './components/second_page_info';
import Carousel from 'react-native-snap-carousel';
import {width} from '../../core/utils/const_value';
import ThirdPageInfo from './components/third_page_info';
import FourthPageInfo from './components/fourth_page_info';
import {
  createAccommodation,
  createFamily,
  createResident,
  editResident,
} from '../../core/services/api';
import {emitParams, toast} from '../../core/utils/funtions';
import {actionEmitter} from '../../core/utils/emiter';
import HeaderBase from '../../components/header';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
  date: new Date(), //ngay sinh
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
  die: '0', // da chet
  go: '0', // da di
  comeDate: new Date(), //ngay den
  goDate: '', // ngay di
  note: '', // ghi chu
  // page 4
  createdDate: new Date(), // ngay tao
  changeDate: new Date(), // ngay sua
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

let isPressEdit = false;

export default function AddResident({navigation, route}) {
  const [state, setState] = useState(initState);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    isPressEdit = false;
    if (route?.params?.data) {
      const {data} = route?.params;
      isPressEdit = !!data;
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
    Alert.alert(
      'Thông báo!',
      `Bạn đã ${isPressEdit ? 'sửa' : 'thêm'} cư dân thành công!`,
      [{text: 'Trở lại', onPress: onBack, style: 'cancel'}],
    );

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
    const user = global.user;
    createResident(state)
      .then(() => {
        createFamily({
          accommodation: state.accommodation,
          peopleCreated: user.id,
          peopleUpdate: user.id,
          note: state.note,
          householdId: state.householdId,
        });
        createAccommodation({
          peopleCode: state.peopleCode,
          note: state.note,
          accommodation: state.accommodation,
          hostHeadRelationship: state.hostHeadRelationship,
        });
        onSetLoading(false);
        alertSuccess();
      })
      .catch((e) => {
        console.error(e);
        onSetLoading(false);
        toast(`Xảy ra lỗi: ${e}`, 'danger');
      });
  };

  const onEditResident = () => {
    editResident(state)
      .then(() => {
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
      if (isPressEdit) {
        onEditResident();
      } else {
        onCreateResident();
      }
    } else {
      if (state.peopleCode !== '') {
        _ref?.current?.snapToNext(true);
      } else {
        toast('Bạn hãy điền các trường thông tin!', 'warning');
      }
    }
  };

  const _renderItem = ({item}) => {
    const renderSwitch = () => {
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
    return (
      <Content>
        <Form>{renderSwitch(item)}</Form>
      </Content>
    );
  };

  const onSnapToItem = (index) => setActiveIndex(index);

  const onPressRight = () => {
    LayoutAnimation.easeInEaseOut();
    setEditable(true);
  };

  return (
    <Container>
      <HeaderBase
        onPressLeft={alertUser}
        title={
          editable
            ? isPressEdit
              ? 'Sửa cư dân'
              : 'Thêm cư dân'
            : 'Thông tin cư dân'
        }
        rightTitle={!editable && 'Sửa'}
        onPressRight={onPressRight}
      />
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
      <Footer>
        <FooterTab>
          <Button light onPress={onPrev} disabled={activeIndex === 0}>
            <Text style={styles.textAction}>{'< Trang trước'}</Text>
          </Button>
          <Button
            primary
            onPress={onNext}
            disabled={activeIndex === numPage - 1 && !editable && !isPressEdit}>
            <Text style={[styles.textAction, {color: '#fff'}]}>
              {activeIndex === numPage - 1 && editable
                ? isPressEdit
                  ? 'Sửa cư dân'
                  : 'Thêm cư dân'
                : 'Trang sau >'}
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  textAction: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
