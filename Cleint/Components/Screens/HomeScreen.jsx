import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function HomeScreen() {
  return (
    <SafeAreaView>
     <Text style={{
        textAlign:'center',
        fontSize:16,
        color:'black',
    }}>Home screen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen
