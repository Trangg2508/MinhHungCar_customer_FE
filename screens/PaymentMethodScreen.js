import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function PaymentMethodScreen() {
    const navigation = useNavigation();
    const route = useRoute()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ paddingVertical: 24, paddingHorizontal: 30 }}>
                <Text style={{ fontSize: 17, fontWeight: '700' }}>Chọn phương thức thanh toán</Text>
                <TouchableOpacity onPress={() => { }}
                    style={{ width: '100%', height: 80, marginTop: 20, flexDirection: 'row', paddingBottom: 10, paddingHorizontal: 15, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.5, borderColor: '#A1A1A1' }}>
                    <Image source={require('../assets/vnpayLogo.png')} style={{ width: '80%', height: '100%', resizeMode: 'cover' }} />
                    <Image source={require('../assets/right.png')} style={{ width: 24, height: 24, marginTop: 5 }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}