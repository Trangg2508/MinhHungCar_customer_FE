// ContractScreen.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { AuthConText } from '../store/auth-context';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Switch } from 'react-native';

export default function ContractScreen({ navigation }) {
  const route = useRoute();
  const { contractID } = route.params;
  const authCtx = useContext(AuthConText);
  const token = authCtx.access_token;
  const [pdfURL, setPdfURL] = useState('');
  const [contractStatus, setContractStatus] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const webViewRef = useRef();
  console.log("contractID", contractID)


  useEffect(() => {
    console.log("Received contractID in Contract screen:", contractID);
    getDetailContract();
  }, []);

  const getDetailContract = async () => {
    try {
      const response = await axios.get(`https://minhhungcar.xyz/customer/contract/${contractID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPdfURL(response.data.data.url);
      setContractStatus(response.data.data.status);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    } catch (error) {
      setLoading(false);
      if (error.response.data.error_code === 10051) {
        Alert.alert('Lỗi', 'Không thể xem chi tiết hợp đồng lúc này. Vui lòng thử lại sau');
      } else if (error.response.data.error_code === 10036) {
        Alert.alert('Lỗi', 'Không thể lấy được trạng thái hợp đồng');
      } else {
        console.log("Error: ", error.response.data.message)
      }
    }
  };

  const handleAgreeSwitch = (value) => {
    setIsChecked(value);
  };

  const handleSignContract = async () => {
    try {
      const response = await axios.put(
        `https://minhhungcar.xyz/customer/contract/agree`,
        {
          customer_contract_id: contractID,
          return_url: 'https://google.com'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const { payment_url, qr_code_image } = response.data.data;
      Alert.alert(
        'Chúc mừng',
        'Bạn đã chấp thuận hợp đồng thành công! Vui lòng thanh toán',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('PayMethod', { payment_url, qr_code_image })
          }
        ]
      );
    } catch (error) {
      if (error.response.data.error_code === 10050) {
        Alert.alert('Lỗi', 'Không thể chấp thuận hợp đồng lúc này. Vui lòng thử lại sau');
      } else {
        console.log('Sign contract error: ', error.response.data.message);
        Alert.alert('Lỗi', error.response.data.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingOverlay message='' />
        </View>
      ) : (
        <>
          <WebView
            ref={webViewRef}
            contentMode='desktop'
            source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfURL}` }}
            style={styles.webview}
            onLoadEnd={data => {
              const { nativeEvent } = data;
              const { title } = nativeEvent;
              if (!title.trim()) {
                webViewRef.current?.stopLoading();
                webViewRef.current?.reload();
              }
            }}
          />
          {contractStatus === 'waiting_for_agreement' && (
            <>
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Tôi đồng ý với các điều khoản trong hợp đồng</Text>
                <Switch
                  value={isChecked}
                  onValueChange={handleAgreeSwitch}
                  trackColor={{ false: '#767577', true: '#773BFF' }}
                  thumbColor={isChecked ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
              <TouchableOpacity
                style={[styles.button, !isChecked ? styles.disabledButton : null]}
                onPress={handleSignContract}
                disabled={!isChecked}
              >
                <Text style={styles.buttonText}>Chấp thuận hợp đồng</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop: 10,
  },
  switchText: {
    fontSize: 16,
    flex: 1,
  },
  button: {
    backgroundColor: '#773BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
