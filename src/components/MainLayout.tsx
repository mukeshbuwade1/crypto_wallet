import { Animated, Easing, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { ReactPropTypes, useEffect, useRef } from 'react'
import ButtonWithIcon from './ButtonWithIcon'
import { COLORS, icons } from '../constants'
import { useDispatch, useSelector } from 'react-redux'

interface prop {
  children: React.ReactNode
}

const MainLayout: React.FC<prop> = ({ children }) => {
  const AnimationValue = useRef(new Animated.Value(0)).current;
  // const dispatch = useDispatch()
  const { showTrade } = useSelector((s) => s)

  useEffect(() => {
    if (showTrade) {
      Animated.timing(AnimationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(AnimationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, [showTrade]);

  const animatedHeight = AnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  })


  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor={COLORS.primary} translucent={false} />
      {children}

      {/* Dim background */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.transparentBlack,
          opacity:AnimationValue,
          display:showTrade?"flex" :"none"
        }}
      />


      {/* aminated trade and withdraw button */}
      <Animated.View style={{
        ...styles.buttonContainer,
        transform: [
          { translateY: animatedHeight }
        ]
      }}>
        <ButtonWithIcon icon={icons.send} title={"Transfer"} />
        <ButtonWithIcon icon={icons.withdraw} title={"Withdraw"} />
      </Animated.View>
    </View>
  )
}

export default MainLayout

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: "center", alignItems: "center", backgroundColor: COLORS.primary,
    paddingTop: 20,
  }
})
