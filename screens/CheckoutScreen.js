import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Divider, Switch } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

export default function CheckoutScreen() {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: false,
      });
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />

            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Image
                                resizeMode="cover"
                                source={{ uri: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                                style={styles.cardImg}
                            />
                            <View style={styles.cardBody}>
                                <Text style={styles.cardTag}>Biển số xe: K38BIG</Text>
                                <Text style={styles.cardTitle}>Tesla Model S</Text>
                                <View style={styles.cardRow}>
                                    <View style={styles.cardRowItem}>
                                        <Image
                                            source={require('../assets/star.png')}
                                            style={styles.cardRowItemImg}
                                        />
                                        <Text style={styles.cardRowItemText}>5</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Divider />

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Thông tin thuê xe</Text>
                            <View style={styles.row}>
                                <View style={styles.rowItem}>
                                    <Image style={styles.icon} source={require('../assets/calendar_grey.png')} />
                                    <View>
                                        <Text style={styles.label}>Nhận xe</Text>
                                        <Text style={styles.value}>21h00, 09/05/2024</Text>
                                    </View>
                                </View>
                                <View style={styles.rowItem}>
                                    <Image style={styles.icon} source={require('../assets/calendar_grey.png')} />
                                    <View>
                                        <Text style={styles.label}>Trả xe</Text>
                                        <Text style={styles.value}>20h00, 10/05/2024</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Image style={{ width: 18, height: 18, marginRight: 5 }} source={require('../assets/location_grey.png')} />
                                        <View >
                                            <Text style={styles.label}>Nhận xe tại địa chỉ</Text>

                                            <Text style={styles.value}>FPT University</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold', marginHorizontal: 25, marginVertical: 20 }}>Bảng tính giá</Text>
                            <View style={styles.price}>
                                <View style={styles.priceDetail}>
                                    <Text style={styles.priceTitle}>Đơn giá thuê</Text>
                                    <Text style={styles.priceText}>668.800 đ/ngày</Text>
                                </View>
                                <View style={styles.priceDetail}>
                                    <Text style={styles.priceTitle}>Bảo hiểm thuê xe</Text>
                                    <Text style={styles.priceText}>61.801 đ/ngày</Text>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.priceDetail}>
                                    <Text style={styles.priceTitleColor}>Thành tiền</Text>
                                    <Text style={styles.priceTextColor}>750.601 đ</Text>
                                </View>
                                <View style={styles.priceDetail}>
                                    <Text style={styles.priceTitleColor}>Đặt cọc qua ứng dụng</Text>
                                    <Text style={styles.priceTextColor}>214.601 đ</Text>
                                </View>
                                <View style={styles.priceDetail}>
                                    <Text style={styles.priceTitleColor}>Thanh toán khi nhận xe</Text>
                                    <Text style={styles.priceTextColor}>436.000 đ</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.requireContainer}>
                            <Text style={styles.sectionTitle}>Giấy tờ thuê xe</Text>
                            <View style={styles.require}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, marginLeft: 8, marginBottom: 8 }}>
                                    <Image style={{ width: 30, height: 30 }} source={require('../assets/IDCard.png')} />
                                    <Text style={styles.requireContent}> Xuất trình đầy đủ GPLX, CCCD (chụp hình đối chiếu) hoặc Hộ chiếu (passport) bản gốc giữ lại</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, marginLeft: 8 }}>
                                    <Image style={{ width: 35, height: 35 }} source={require('../assets/money.png')} />
                                    <Text style={styles.requireContent}>Đặt cọc tài sản thế chấp tiền mặt(15 triệu hoặc theo thỏa thuận) hoặc xe máy có giá trị tương đương 15 triệu trở lên (xe máy và cavet gốc) trước khi nhận xe.</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>

            <View style={styles.overlay}>
                <View style={styles.overlayContent}>
                    <View style={styles.overlayContentTop}>
                        {/* <Switch
                            trackColor={{ false: '#6E6D6D', true: '#67C96B' }}
                            thumbColor={'#fff'}
                            ios_backgroundColor="#B8B8B8"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={styles.switch}
                        />
                        <Text style={styles.overlayContentPrice}>Tôi đồng ý với{' '}
                            <Text style={{color: '#15891A'}}>
                                Chính sách hủy chuyến của MinhHungCar
                            </Text>
                        </Text> */}
                    </View>

                </View>

                <TouchableOpacity
                    onPress={() => {
                       
                    }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Gửi yêu cầu thuê xe</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingBottom: 100,
    },
    container: {
        marginTop: 20,
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: '#fff',
        marginHorizontal: 25,
    },
    cardImg: {
        width: 140,
        height: 90,
        borderRadius: 12,
    },
    cardBody: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 5,
    },
    cardTag: {
        fontSize: 13,
        color: '#939393',
        marginBottom: 9,
        textTransform: 'capitalize',
    },
    cardTitle: {
        fontSize: 20,
        color: '#000',
        marginBottom: 8,
        fontWeight: 'bold'
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardRowItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardRowItemImg: {
        width: 22,
        height: 22,
        borderRadius: 9999,
        marginRight: 6,
    },
    cardRowItemText: {
        fontSize: 13,
        color: '#000',
    },
    section: {
        marginTop: 20,
        marginBottom: 25,
        marginHorizontal: 25,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowItem: {
        flexDirection: 'row',
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 5,
    },
    label: {
        color: '#6C6C6C',
        fontSize: 14,
        fontWeight: '600'
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
    priceContainer: {
        backgroundColor: '#F4F4F4',
        paddingBottom: 20,

    },
    price: {
        backgroundColor: '#fff',
        marginHorizontal: 25,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 15,
    },
    priceDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 11,
    },
    priceTitle: {
        color: '#8E8E8E',
        fontWeight: '600',
    },
    priceText: {
        color: '#5C5C5C',
        fontWeight: '600',
    },
    priceTitleColor: {
        color: 'black',
        fontWeight: '600',
    },
    priceTextColor: {
        color: '#5457FB',
        fontWeight: '600',
    },
    divider: {
        marginVertical: 8
    },
    requireContainer: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        marginVertical: 10
    },
    require: {
        paddingHorizontal: 10,
    },
    requireContent: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 20,
        fontSize: 13,
        color: '#6E6D6D'
    },
    /** Overlay */
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 48,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    overlayContent: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    overlayContentTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 2,
    },
    switch: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] 
      },
    overlayContentPrice: {
        fontSize: 11,
        lineHeight: 26,
        fontWeight: '600',
        color: 'grey',
    },
    /** Button */
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: '#773BFF',
        borderColor: '#773BFF',
        marginTop: 10
    },
    btnText: {
        fontSize: 16,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});
