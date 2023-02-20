import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactPropTypes } from 'react'
import { COLORS, FONTS, icons } from '../constants'

interface prop {
    icon:  ImageSourcePropType,
    title: string,
    style?:object,
    imageStyle?:object,
    textStyle?:object,
    onPress?:()=>void
}
const ButtonWithIcon: React.FC<prop> = ({ icon, title,style ,imageStyle,textStyle,onPress}) => {
    return (
        <TouchableOpacity
        activeOpacity={0.8}
            style={{...styles.baar,...style}}
            onPress={onPress?()=>onPress():()=>console.log("pressed")}
        >
            <Image source={icon} style={{
                height: 18, width: 18, tintColor: COLORS.black, marginRight: 10,...imageStyle
            }} />
            <Text style={{
                color: COLORS.black,
                ...FONTS.h3,...textStyle
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonWithIcon

const styles = StyleSheet.create({
    baar:{
        width: "80%",
        height: 40,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "center", alignItems: "center",
        marginBottom:15
    }
})