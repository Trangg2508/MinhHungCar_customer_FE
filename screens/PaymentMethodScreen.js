// import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { Divider } from 'react-native-paper';
// import { WebView } from 'react-native-webview';

// export default function PaymentMethodScreen() {
//     const navigation = useNavigation();
//     const webViewRef = useRef();

//     const qrURL = 'https://rentalcar-capstone.s3.ap-southeast-2.amazonaws.com/f3afd973-5d8b-4ddd-8110-62af1c0a34c0.png';

//     const paymentURL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=46728000&vnp_BankCode=NCB&vnp_Command=pay&vnp_CreateDate=20240627070753&vnp_CurrCode=VND&vnp_ExpireDate=20240704070753&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&vnp_OrderInfo=8.467280&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fminhhungcar.xyz%2Fvnpay%2Freturn_url&vnp_TmnCode=UPUEB83F&vnp_TxnRef=27070753&vnp_Version=2.1.0&vnp_SecureHash=e87a80412d87a6ff3a2c45ac949f11664b9bc622e9855828e4717afcf7ebca1340eb86935e7b0af4b7b3016d49e168f28d99929732ce528db19205a02f78de95';

//     const [show, setShow] = useState(false);

//     const handlePayment = () => {
//         setShow(true);
//     };

//     const injectedJavascript = `(function() {
//         window.postMessage = function(data) {
//             window.ReactNativeWebView.postMessage(data);
//         };
//     })()`;

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//             <View style={{ paddingVertical: 24, paddingHorizontal: 30 }}>
//                 <Text style={{ fontSize: 17, fontWeight: '700' }}>Chọn phương thức thanh toán</Text>
//                 <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
//                     <Image source={require('../assets/vnpayLogo.png')} style={styles.vnpayLogo} />
//                     <Image source={require('../assets/right.png')} style={styles.arrowIcon} />
//                 </TouchableOpacity>
//                 {show && (
//                     <View style={{ flex: 1 }}>
//                         <WebView
//                             ref={webViewRef}
//                             injectedJavaScript={injectedJavascript}
//                             startInLoadingState
//                             scalesPageToFit
//                             style={{ flex: 1 }}
//                             source={{ uri: paymentURL }}
//                             javaScriptEnabled
//                             onMessage={(e) => {
//                                 navigation.navigate('History');
//                             }}
//                             onNavigationStateChange={(navState) => {
//                                 console.log('webview navstate: ', navState.url);
//                                 if (navState.url.includes('vnp_ResponseCode') || navState.url.includes('return_url')) {
//                                     // Extract the response code or other relevant information from the URL
//                                     const urlParams = new URLSearchParams(navState.url);
//                 const responseCode = urlParams.get('vnp_ResponseCode');
//                 const transactionNo = urlParams.get('vnp_TransactionNo');
//                 const paymentStatus = responseCode === '00' ? 'Successful' : 'Failed';

//                                     // Handle the payment status accordingly
//                                     console.log(`Payment Status: ${paymentStatus}, Transaction No: ${transactionNo}`);

//                                     // Close the WebView or navigate as needed
//                                     setShow(false); // Close WebView
//                                     // navigation.navigate('History');
//                                 } else {
//                                     // Log if the URL doesn't contain expected parameters
//                                     console.log('URL does not contain expected parameters:', navState.url);
//                                 }
//                             }}
//                         />
//                     </View>
//                 )}
//                 <View style={styles.dividerContainer}>
//                     <Divider style={styles.divider} />
//                     <Text style={styles.dividerText}>hoặc với mã QR</Text>
//                     <Divider style={styles.divider} />
//                 </View>
//                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                     <View style={styles.QR}>
//                         <Image style={styles.qrImage} source={{ uri: qrURL }} />
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     paymentButton: {
//         width: '100%',
//         height: 80,
//         marginTop: 20,
//         flexDirection: 'row',
//         paddingBottom: 10,
//         paddingHorizontal: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderWidth: 0.5,
//         borderColor: '#A1A1A1',
//     },
//     vnpayLogo: {
//         width: '80%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     arrowIcon: {
//         width: 24,
//         height: 24,
//         marginTop: 5,
//     },
//     dividerContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 10,
//         marginTop: 30,
//     },
//     divider: {
//         width: 100,
//     },
//     dividerText: {
//         marginHorizontal: 10,
//         fontWeight: 'bold',
//     },
//     QR: {
//         width: 268,
//         height: 268,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         marginVertical: 20,
//     },
//     qrImage: {
//         position: 'absolute',
//         width: 268,
//         height: 268,
//     },
// });


import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet, Linking } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { WebView } from 'react-native-webview';

export default function PaymentMethodScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { payment_url, qr_code_image } = route.params;

    useEffect(() => {
        console.log(qr_code_image)
    }, [])




    const handlePayment = async () => {
        try {
            const supported = await Linking.canOpenURL(payment_url);
            if (supported) {
                await Linking.openURL(payment_url);
            } else {
                console.log("Don't know how to open URI: " + payment_url);
            }
        } catch (error) {
            console.error('Error opening link:', error);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ paddingVertical: 24, paddingHorizontal: 30 }}>
                <Text style={{ fontSize: 17, fontWeight: '700' }}>Chọn phương thức thanh toán</Text>
                <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
                    <Image source={require('../assets/vnpayLogo.png')} style={styles.vnpayLogo} />
                    <Image source={require('../assets/right.png')} style={styles.arrowIcon} />
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <Divider style={styles.divider} />
                    <Text style={styles.dividerText}>hoặc với mã QR</Text>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.QR}>
                        <Image style={styles.qrImage} source={{ uri: qr_code_image }} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    paymentButton: {
        width: '100%',
        height: 80,
        marginTop: 20,
        flexDirection: 'row',
        paddingBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#A1A1A1',
    },
    vnpayLogo: {
        width: '80%',
        height: '100%',
        resizeMode: 'cover',
    },
    arrowIcon: {
        width: 24,
        height: 24,
        marginTop: 5,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 30,
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
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
    qrImage: {
        position: 'absolute',
        width: 268,
        height: 268,
    },
});

