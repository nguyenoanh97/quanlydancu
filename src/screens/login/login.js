import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Keyboard,
} from 'react-native';
import InputLogin from './components/input-login';
import {logoCongAn} from '../../../assets/images';
import {toast} from '../../core/utils/funtions';
import {getAdmin} from '../../core/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../core/utils/async_key';
import {HOME} from '../../core/utils/screen_names';

export default function Login({navigation}) {
  const [username, setUsername] = useState('Darrick.Wolff');
  const [password, setPassword] = useState('FwVAuUdTQsta2jS');
  const [loading, setLoading] = useState(false);
  let user;

  const onChangeUsername = (text) => setUsername(text);

  const onChangePassword = (text) => setPassword(text);

  const handleLogin = async (data) => {
    user = null;
    if (
      data.filter((item) => {
        if (item.username === username && item.password === password) {
          user = item;
          return item;
        }
      }).length === 0
    ) {
      toast('Sai tên đăng nhập hoặc mật khẩu!', 'danger');
    } else {
      toast('Đăng nhập thành công!', 'success');
      await AsyncStorage.setItem(USER, JSON.stringify(user));
      navigation.navigate(HOME);
      console.log('user', user);
    }
  };

  const onPressLogin = () => {
    if (username !== '' && password !== '') {
      Keyboard.dismiss();
      setLoading(true);
      getAdmin()
        .then((value) => {
          console.log('value', value);
          setLoading(false);
          handleLogin(value);
        })
        .catch(() => setLoading(false));
    } else {
      toast('Vui lòng nhập tên đăng nhập và mật khẩu!', 'warning');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logoCongAn} />

      <InputLogin
        value={username}
        onChangeText={onChangeUsername}
        placeHolderText="Nhập tên đăng nhập..."
      />

      <InputLogin
        value={password}
        onChangeText={onChangePassword}
        placeHolderText="Nhập mật khẩu..."
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={onPressLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{color: '#fff'}}>ĐĂNG NHẬP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    marginBottom: 40,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
