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
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    YOB: '',
    IDNum: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setAvatar({ uri: result.assets[0].uri });
      setAvatarURL(null);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <View style={styles.avatarContainer}>
              {selectedImage ? (
                <Image key={selectedImage} style={styles.avatar} source={{ uri: selectedImage }} />
              ) : avatarURL ? (
                <Image style={styles.avatar} source={{ uri: avatarURL }} />
              ) : (
                <Image
                  style={styles.avatar}
                  source={{ uri: 'https://static.thenounproject.com/png/642902-200.png' }}
                />
              )}
              {/* <TouchableOpacity style={styles.changeAvatarButton} onPress={pickImage}>
    <Text style={styles.changeAvatarButtonText}>Choose from Library</Text>
  </TouchableOpacity> */}
              <TouchableOpacity style={styles.editIconButton} onPress={pickImage}>
                <Image
                  style={styles.editIcon}
                  source={require('../assets/edit.png')}
                />
              </TouchableOpacity>
            </View>


            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Họ và tên*</Text>

                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={name => setForm({ ...form, name })}
                  placeholder="abc"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.name} />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Số điện thoại*</Text>

                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={phone => setForm({ ...form, phone })}
                  placeholder="0987654321"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.phone} />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Địa chỉ email</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  // onChangeText={email => setForm({ ...form, email })}
                  placeholder="abc123@gmail.com"
                  placeholderTextColor="#B2B2B2"
                  style={styles.inputControl}
                  value={form.email}
                  editable={false}
                />
              </View>



              <View style={styles.input}>
                <Text style={styles.inputLabel}>Năm sinh</Text>

                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={YOB => setForm({ ...form, YOB })}
                  placeholder="01/2024"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.YOB} />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Số CCCD</Text>

                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={IDNum => setForm({ ...form, IDNum })}
                  placeholder="000000000000"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.IDNum} />
              </View>

              <View style={styles.formActionDriving}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Driving')
                  }}>
                  <View style={styles.btnDriving}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../assets/IDCard.png')} />
                    <Text style={styles.btnDrivingText}>Giấy phép lái xe</Text>
                    <Image style={{ width: 20, height: 20, }} source={require('../assets/right.png')} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center'
  },
  /** avatar */

  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 35
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
  },
  changeAvatarButtonText: {
    marginTop: 10,
    color: '#773BFF'
  },
  editIconButton: {
    position: 'absolute',
    bottom: -10,
    right: 150,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#AFAFAF',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',

  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
    marginBottom: 70,
  },
  /** Input */
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
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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
  formActionDriving: {
    marginVertical: 10
  },
  btnDriving: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    flexDirection: 'row'
  },
  btnDrivingText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    flex: 1,
  },
});