import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    if (!form.email || !form.password) {
        Alert.alert('Error', 'All fields are required');
        return;
    }
    // Handle form submission, e.g., send data to an API
    Alert.alert('Success', 'Form submitted successfully');
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#5457FB', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.09, 0.84]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Đăng nhập</Text>
              <AntDesign name="stepforward" size={24} color="black" />
              <Text style={styles.subtitle}></Text>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Địa chỉ email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={email => setForm({ ...form, email })}
                  placeholder="abc123@gmail.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.email}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Mật khẩu</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={password => setForm({ ...form, password })}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
              </View>
              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleSubmit}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Đăng nhập</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.formActionSpacer}>hoặc tiếp tục với</Text>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.btnSecondary}>
                  <MaterialCommunityIcons
                    color="#000"
                    name="google"
                    size={22}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.btnSecondaryText}>Google</Text>
                  <View style={{ width: 15 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}
              >
                <Text style={styles.formFooter}>
                  Chưa có tài khoản?{' '}
                  <Text style={{ color: '#5548E2' }}>Đăng kí</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0.8,
    justifyContent: 'center',
  },
  container: {
    padding: 24,
  },
  gradient: {
    flex: 1,
  },
  header: {
    marginTop: 0,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginTop: 20,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
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
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
  formActionSpacer: {
    marginVertical: 22,
    fontSize: 14,
    fontWeight: '600',
    color: '#4b4858',
    textAlign: 'center',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#000',
    marginBottom: 45,
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000',
    justifyContent: 'center',
  },
});
