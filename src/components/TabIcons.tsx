import { Image, ImageProps, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants'

export type prop = {
  icon: ImageSourcePropType,
  focused: boolean | string,
  label: string
}

const TabIcons: React.FC<prop> = ({ icon, focused, label }) => {
  let color = (focused || label == "trade") ? COLORS.white : COLORS.lightGray3
  return (
    <View style={styles.iconContainer}>
      <Image source={icon} resizeMode={"contain"} style={{
        width: 25,
        height: 25,
        tintColor: color
      }} />
      <Text style={{
        color: color, ...FONTS.body5,
        textTransform: "uppercase",
        fontSize: 10,
      }}>{label}</Text>
    </View>
  )
}

export default TabIcons

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center", alignItems: "center",
  }
})