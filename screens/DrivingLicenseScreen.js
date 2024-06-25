import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DrivingLicenseScreen() {
    const [form, setForm] = useState({
        images: [
            { field: 'licenseFront', uri: '' },
            { field: 'licenseBack', uri: '' },
        ],
        licenseNum: '',
    });

    // useEffect(() => {
    //     (async () => {
    //         const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    //         if (libraryStatus !== 'granted' || cameraStatus !== 'granted') {
    //             Alert.alert('Permission Denied', 'You need to grant camera and camera roll permissions to use this feature');
    //         }
    //     })();
    // }, []);

    const showImagePickerOptions = (field) => {
        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Take Photo',
                    onPress: () => takePhoto(field),
                },
                {
                    text: 'Choose from Library',
                    onPress: () => pickImageFromLibrary(field),
                },
            ],
            { cancelable: true }
        );
    };

    const pickImageFromLibrary = async (field) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const updatedImages = form.images.map((image) =>
                image.field === field ? { ...image, uri: result.assets[0].uri } : image
            );
            setForm({ ...form, images: updatedImages });
        }
    };

    const takePhoto = async (field) => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const updatedImages = form.images.map((image) =>
                image.field === field ? { ...image, uri: result.assets[0].uri } : image
            );
            setForm({ ...form, images: updatedImages });
        }
    };

    const handleUpdate = () => {
        // Handle update logic here, like sending data to server
        Alert.alert('Update', 'License updated successfully');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={styles.noticeContainer}>
                    <View style={styles.notice}>
                        <Text style={styles.noticeText}>Lưu ý: Để tránh phát sinh vấn đề trong quá trình thuê xe, người đặt xe trên MinhHungCar (đã xác thực GPLX) ĐỒNG THỜI phải là người nhận xe.</Text>
                    </View>
                </View>
                <View style={styles.licenseContainer}>
                    <Text style={styles.title}>Ảnh mặt trước GPLX</Text>
                    <Text style={styles.subTitle}>Hình chụp cần thấy được Ảnh đại diện và Số GPLX</Text>
                    <View style={styles.licenseUpload}>
                        <TouchableOpacity
                            style={styles.licenseUploadButton}
                            onPress={() => showImagePickerOptions('licenseFront')}
                        >
                            {form.images.find(image => image.field === 'licenseFront').uri ? (
                                <Image style={styles.licensePhoto} source={{ uri: form.images.find(image => image.field === 'licenseFront').uri }} />
                            ) : (
                                <Image style={styles.licensePhotoPlaceholder} source={require('../assets/photos.png')} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.licenseContainer}>
                    <Text style={styles.title}>Ảnh mặt sau GPLX</Text>
                    <View style={styles.licenseUpload}>
                        <TouchableOpacity
                            style={styles.licenseUploadButton}
                            onPress={() => showImagePickerOptions('licenseBack')}
                        >
                            {form.images.find(image => image.field === 'licenseBack').uri ? (
                                <Image style={styles.licensePhoto} source={{ uri: form.images.find(image => image.field === 'licenseBack').uri }} />
                            ) : (
                                <Image style={styles.licensePhotoPlaceholder} source={require('../assets/photos.png')} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.licenseContainer}>
                    <Text style={styles.title}>Số giấy phép lái xe</Text>
                    <Text style={styles.subTitle}>Dãy 12 chữ số ở mặt trước GPLX</Text>
                    <View style={styles.input}>
                        <TextInput
                            clearButtonMode="while-editing"
                            onChangeText={licenseNum => setForm({ ...form, licenseNum })}
                            placeholder="000000000000"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.licenseNum}
                        />
                    </View>
                </View>
                <View style={styles.formAction}>
                    <TouchableOpacity
                        onPress={handleUpdate}
                    >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Cập nhật</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    noticeContainer: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    notice: {
        width: 341,
        height: 69,
        backgroundColor: '#F2E2E2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noticeText: {
        color: '#F11B1B',
    },
    licenseContainer: {
        marginHorizontal: 25,
        marginVertical: 20,
        flex: 1,
    },
    licenseUpload: {
        width: '100%',
        height: 180,
        borderColor: '#F1F1F1',
        borderWidth: 0.5,
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    licenseUploadButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    licensePhoto: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    licensePhotoPlaceholder: {
        width: 60,
        height: 60,
    },
    input: {
        marginBottom: 16,
    },
    inputControl: {
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 5,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderStyle: 'solid',
        borderColor: '#D3D3D3',
        borderWidth: 1,
        marginTop: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 13,
        color: '#6D6D6D',
        marginTop: 6,
    },
    formAction: {
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 25,
    },
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
});
