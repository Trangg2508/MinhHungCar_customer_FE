import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Card } from '@rneui/themed';
import Category from '../components/Category';
import CardCar from '../components/CardCar';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function HomeScreen({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        setShowDatePicker(true); // Show the DatePicker when the component mounts
    }, []);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const formatDate = (date) => {
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Svg height="100%" width="100%" style={styles.background}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0%" stopColor="#447eff" />
                            <Stop offset="100%" stopColor="#773bff" />
                        </LinearGradient>
                    </Defs>
                    <Rect width="100%" height="180" fill="url(#grad)" />
                </Svg>
                <View style={styles.header}>

                    <View>
                        <View style={styles.avatar}>
                            <Image
                                alt=""
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                                }}
                                style={styles.avatarImg} />

                        </View>

                    </View>
                    <View>
                        <Text style={styles.headerTitle}>
                            Xin chào,
                            Nguyễn Văn A
                        </Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <Card containerStyle={styles.card}>
                        <View style={styles.titleBackground}>
                            <Card.Title style={styles.title}>XE TỰ LÁI</Card.Title>
                        </View>
                        <View style={styles.dateFromTo}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 20, height: 20 }} source={require('../assets/calendar_grey.png')} />
                                <Text style={styles.fonts_1} h1>
                                    Từ ngày
                                </Text>
                            </View>

                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeDate}
                                />
                            )}
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <Text style={{ color: 'black' }}>{formatDate(date)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateFromTo}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 20, height: 20 }} source={require('../assets/calendar_grey.png')} />
                                <Text style={styles.fonts_1} h1>
                                    Đến ngày
                                </Text>
                            </View>
                            <Text style={styles.fonts_2} h2>
                                h2 Heading
                            </Text>


                        </View>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('List')
                        }}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Tìm kiếm</Text>
                            </View>
                        </TouchableOpacity>
                    </Card>
                </View>
                <View style={styles.category}>
                    <Category />
                </View>
                <Text style={styles.titleList}>Xe dành cho bạn</Text>
                <View style={styles.listCar}>
                    <CardCar />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        marginTop: 60,
        marginLeft: 40
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    content: {
        position: 'absolute',
        top: 110,
        left: 5,
    },
    card: {
        marginTop: 10,
        borderRadius: 30,
        width: 350,
        height: 280,
        padding: 0,
        borderWidth: 1,
    },
    titleBackground: {
        backgroundColor: '#9EA2FE',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        marginTop: 16,
        fontWeight: 'bold',
        fontSize: 18,
        fontWeight: 'bold'
    },
    dateFromTo: {
        marginTop: 18,
        marginHorizontal: 40
    },
    fonts_1: {
        marginBottom: 10,
        marginLeft: 10,
        color: '#ACACAC',
        fontWeight: 'bold',
    },
    fonts_2: {
        marginBottom: 10,
        marginLeft: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 24,
        color: '#fff',
    },
    button: {
        backgroundColor: '#773BFF',
        height: 40,
        width: 249,
        marginTop: 10,
        marginLeft: 50,
        marginRight: 20,
        borderRadius: 30
    },
    buttonText: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white'
    },
    category: {
        marginTop: 310,
        marginLeft: 15
    },
    listCar: {
        marginTop: 5,
        flexDirection: 'row',
        height: 280
    },
    titleList: {
        marginTop: 30,
        marginLeft: 30,
        fontSize: 24,
        fontWeight: 'bold'
    },
    avatar: {
        position: 'relative',
    },
    avatarImg: {
        width: 35,
        height: 35,
        borderRadius: 9999,
        marginRight: 10
    },
    avatarNotification: {
        position: 'absolute',
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: '#fff',
        top: 0,
        right: -2,
        width: 14,
        height: 14,
        backgroundColor: '#d1d5db',
    },
});

