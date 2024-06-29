import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Divider, Switch } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthConText } from '../store/auth-context';
import axios from 'axios';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apiCar } from '../api/apiConfig';

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const authCtx = useContext(AuthConText);
    const token = authCtx.access_token;
    const route = useRoute();
    const { carId, startDate, endDate } = route.params;

    const [carDetail, setCarDetail] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [parsedStartDate, setParsedStartDate] = useState(new Date());
    const [parsedEndDate, setParsedEndDate] = useState(new Date());
    const [contractID, setContractID] = useState('');
    const [selectedCollateral, setSelectedCollateral] = useState('cash');
    const [rentPricePerDay, setRentPricePerDay] = useState(0);
    const [insurancePricePerDay, setInsurancePricePerDay] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [prepaid, setPrepaid] = useState(0);
    const [payDirect, setPayDirect] = useState(0);
    const [isLoadingPrice, setLoadingPrice] = useState(true);

    const handleOptionSelect = (option) => {
        setSelectedCollateral(option);
    };

    useEffect(() => {
        if (startDate && endDate) {
            setParsedStartDate(new Date(startDate));
            setParsedEndDate(new Date(endDate));
        }
    }, [startDate, endDate]);

    useEffect(() => {
        getCarDetail();
    }, [carId]);

    useEffect(() => {
        if (parsedStartDate && parsedEndDate) {
            calculatePricing();
        }
    }, [parsedStartDate, parsedEndDate]);

    useEffect(() => {
        if (contractID) {
            navigation.navigate('Contract', { contractID: contractID });
        }
    }, [contractID]);

    const getCarDetail = async () => {
        try {
            const response = await axios.get(`https://minhhungcar.xyz/car/${carId}`);
            setCarDetail(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Fetch detail fail: ', error);
        }
    };

    const rentCar = async () => {
        try {
            const response = await axios.post(
                apiCar.rentCar,
                {
                    car_id: carId,
                    start_date: parsedStartDate,
                    end_date: parsedEndDate,
                    collateral_type: selectedCollateral,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const id = response.data.contract.id;
            setContractID(id - 1);
            setLoading(false);
        } catch (error) {
            console.log('Rent car fail: ', error);
        }
    };

    const calculatePricing = async () => {
        if (!parsedStartDate || !parsedEndDate) return;
        try {
            const response = await axios.get(
                `https://minhhungcar.xyz/customer/calculate_rent_pricing?car_id=${carId}&start_date=${parsedStartDate.toISOString()}&end_date=${parsedEndDate.toISOString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { rent_price_quotation, insurance_price_quotation, total_amount, prepaid_amount } = response.data;
            setRentPricePerDay(rent_price_quotation);
            setInsurancePricePerDay(insurance_price_quotation);
            setTotalPrice(total_amount);
            setPrepaid(prepaid_amount);
            setPayDirect(total_amount - prepaid_amount);
            setLoadingPrice(false);
        } catch (error) {
            console.log('Failed to fetch pricing: ', error);
            setLoadingPrice(false);
        }
    };

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || parsedStartDate;
        const minDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // Minimum start date, 2 hours from now

        if (currentDate < minDate) {
            Alert.alert('', 'Thời gian nhận xe ít nhất kể từ 2 tiếng tính từ hiện tại');
        } else {
            setParsedStartDate(currentDate);
            const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Next day from the current start date
            if (nextDay) {
                setParsedEndDate(nextDay);
            }
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || parsedEndDate;
        const minDate = parsedStartDate || new Date();
        if (currentDate <= minDate) {
            Alert.alert('', 'Ngày kết thúc phải sau ngày bắt đầu ít nhất 1 ngày');
        } else {
            if (currentDate - parsedStartDate < 24 * 60 * 60 * 1000) {
                Alert.alert('', 'Thời gian thuê phải tối thiểu là 1 ngày');
            } else {
                setParsedEndDate(currentDate);
            }
        }
    };

    const handleRent = async () => {
        await rentCar();
    };


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <LoadingOverlay message='' />
                </View>
            ) : (
                <>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                            <View style={styles.container}>
                                <View style={styles.card}>
                                    <Image
                                        resizeMode="cover"
                                        source={{ uri: carDetail.images[0] }}
                                        style={styles.cardImg}
                                    />
                                    <View style={styles.cardBody}>
                                        <Text style={styles.cardTag}>Biển số xe: {carDetail.license_plate}</Text>
                                        <Text style={styles.cardTitle}>{carDetail.car_model.brand + ' ' + carDetail.car_model.model + ' ' + carDetail.car_model.year}</Text>
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
                                                <View
                                                    style={{
                                                        marginTop: 15,
                                                        flexDirection: 'row',
                                                        marginLeft: -70
                                                    }}
                                                >
                                                    <DateTimePicker
                                                        value={parsedStartDate}
                                                        mode="datetime"
                                                        display="default"
                                                        onChange={handleStartDateChange}
                                                        minimumDate={new Date(Date.now() + 2 * 60 * 60 * 1000)}
                                                        locale="vi"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.rowItem}>
                                            <Image style={styles.icon} source={require('../assets/calendar_grey.png')} />
                                            <View>
                                                <Text style={styles.label}>Trả xe</Text>
                                                <View
                                                    style={{
                                                        marginLeft: -80,
                                                        marginTop: 15,
                                                        flexDirection: 'row'
                                                    }}
                                                >
                                                    <DateTimePicker
                                                        value={parsedEndDate}
                                                        mode="datetime"
                                                        display="default"
                                                        onChange={handleEndDateChange}
                                                        minimumDate={new Date(Date.now() + 2 * 60 * 60 * 1000)}
                                                        locale="vi"
                                                    />
                                                </View>
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

                                <Divider />

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Loại thế chấp</Text>
                                    {/* <View style={styles.row}> */}

                                    <View style={styles.radioContainer}>
                                        <TouchableOpacity
                                            style={styles.radioButtonContainer}
                                            onPress={() => handleOptionSelect('cash')}
                                        >
                                            <View style={[styles.radioButton, selectedCollateral === 'cash' && styles.radioButtonSelected]}>
                                                {selectedCollateral === 'cash' && <View style={styles.radioButtonInner} />}
                                            </View>
                                            <Text style={styles.radioButtonText}>Tiền mặt</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.radioButtonContainer}
                                            onPress={() => handleOptionSelect('motorbike')}
                                        >
                                            <View style={[styles.radioButton, selectedCollateral === 'motorbike' && styles.radioButtonSelected]}>
                                                {selectedCollateral === 'motorbike' && <View style={styles.radioButtonInner} />}
                                            </View>
                                            <Text style={styles.radioButtonText}>Xe máy và giấy tờ xe</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* </View>  */}
                                </View>

                                <View style={styles.priceContainer}>
                                    <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold', marginHorizontal: 25, marginVertical: 20 }}>Bảng tính giá</Text>
                                    {isLoadingPrice ? (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator message='' />
                                        </View>
                                    ) : (
                                        <View style={styles.price}>
                                            <View style={styles.priceDetail}>
                                                <Text style={styles.priceTitle}>Đơn giá thuê</Text>
                                                <Text style={styles.priceText}>{rentPricePerDay.toLocaleString()} đ/ngày</Text>
                                            </View>
                                            <View style={styles.priceDetail}>
                                                <Text style={styles.priceTitle}>Bảo hiểm thuê xe</Text>
                                                <Text style={styles.priceText}>{insurancePricePerDay.toLocaleString()} đ/ngày</Text>
                                            </View>
                                            <Divider style={styles.divider} />
                                            <View style={styles.priceDetail}>
                                                <Text style={styles.priceTitleColor}>Thành tiền</Text>
                                                <Text style={styles.priceTextColor}>{totalPrice.toLocaleString()} đ</Text>
                                            </View>
                                            <View style={styles.priceDetail}>
                                                <Text style={styles.priceTitleColor}>Đặt cọc qua ứng dụng</Text>
                                                <Text style={styles.priceTextColor}>{prepaid.toLocaleString()} đ</Text>
                                            </View>
                                            <View style={styles.priceDetail}>
                                                <Text style={styles.priceTitleColor}>Thanh toán khi nhận xe</Text>
                                                <Text style={styles.priceTextColor}>{payDirect.toLocaleString()} đ</Text>
                                            </View>
                                        </View>
                                    )}
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
                                            <Text style={styles.requireContent}>Tài sản thế chấp tiền mặt(15 triệu hoặc theo thỏa thuận) hoặc xe máy có giá trị tương đương 15 triệu trở lên (xe máy và cavet gốc) trước khi nhận xe.</Text>
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
                            onPress={handleRent}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Thuê xe</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        height: '100%',
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
        textTransform: 'uppercase'
    },
    cardTitle: {
        fontSize: 18,
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
        paddingHorizontal: 5
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
    //Radio button
    radioContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        height: 18,
        width: 18,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        borderColor: '#773BFF',
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: '#773BFF',
    },
    radioButtonText: {
        fontSize: 14,
        color: '#000',
    },
});
