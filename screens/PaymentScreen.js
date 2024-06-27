import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export default function PaymentScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const { payment_url } = route.params

    const injectedJavascript = `(function() {
        window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <WebView
                source={{ uri: payment_url }}
                style={styles.webview}
                startInLoadingState={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    webview: {
        flex: 1,
    },
})