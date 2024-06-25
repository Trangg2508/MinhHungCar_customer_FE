import { Divider } from '@rneui/base';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function PaymentInformationScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    bankNum: '',
    bank: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Chủ tài khoản</Text>
                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={(name) => setForm({ ...form, name })}
                  placeholder="abc"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.name}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Số tài khoản</Text>
                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={(bankNum) => setForm({ ...form, bankNum })}
                  placeholder="00000000000000"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.bankNum}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Ngân hàng</Text>
                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={(bank) => setForm({ ...form, bank })}
                  placeholder="TPBank"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.bank}
                />
              </View>

              <View style={styles.dividerContainer}>
                <Divider style={styles.divider} />
                <Text style={styles.dividerText}>hoặc với mã QR</Text>
                <Divider style={styles.divider} />
              </View>

              <View style={styles.QR}>
                <Image
                  source={{ uri: 'https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg' }}
                  style={styles.qrImage}
                />
                <TouchableOpacity onPress={() => { }} style={styles.QRUploadButton}>
                  <Image style={styles.uploadIcon} source={require('../assets/upload.png')} />
                </TouchableOpacity>
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={() => { /* handle onPress */ }}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Lưu</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderStyle: 'solid',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  divider: {
    width: 100,
  },
  dividerText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  QR: {
    width: 268,
    height: 268,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  qrImage: {
    position: 'absolute',
    width: 268,
    height: 268,
    opacity: 0.2,
    borderRadius: 10,
  },
  QRUploadButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#5548E2',
    borderColor: '#5548E2',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});
