import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coilList } from '../redux/coinSlice'
import icons from './icons'
import { COLORS, FONTS } from './theme'

const CoinList = (props) => {
    const {chartIndex, setChartIndex} = props ||{}
    const dispatch = useDispatch()
    const { coinList } = useSelector(s => s)
    console.log("hey mukesh  props?.data", JSON.stringify(coinList))

    function getData() {
        if (coinList.status == "idle") {
            dispatch(coilList())
        } else {

        }
    }


    useEffect(() => {
        getData()
    }, [])
    const renderItem = ({ item, index }) => {
        const createColor = chartIndex==index? COLORS.white:COLORS.white700;
        // console.log("item", JSON.stringify(item))
        const isPriceDown = (item.price_change_percentage_7d_in_currency < 0) ? true : false
        return (
            <TouchableOpacity 
            onPress={()=>setChartIndex(index)}
            style={{
                flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center"
            }}>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <Image source={{ uri: item.image }} style={{
                        width: 25, height: 25,
                    }} resizeMode="contain" />
                    <Text style={{ color:createColor, ...FONTS.h3, marginLeft: 10 }}>{item.name}</Text>
                </View>

                <View style={{ marginRight: 10 }}>
                    <Text style={{ color:createColor, textAlign: "right", ...FONTS.h3 }}>$ {item.current_price}</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                        <Image source={icons.upArrow} style={{
                            width: 10, height: 10,
                            tintColor: isPriceDown ? COLORS.red : COLORS.lightGreen,
                            transform: [{ rotate: isPriceDown ? "145deg" : "45deg" }],
                            marginRight: 5
                        }} resizeMode={"contain"} />
                        <Text style={{ color:createColor, ...FONTS.h4 }}>{`${Number(item.price_change_percentage_7d_in_currency).toFixed(2)}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{
            width:"100%",
            height: 330,
            marginTop:20,
           
        }}>          
                <Text style={{
                    color: "#fff",
                    ...FONTS.h3
                }}>Top Cryptocurrency</Text>
           
            <FlatList
                data={coinList.coinList}
                keyExtractor={(item, i) => '' + i}
                renderItem={renderItem}
            contentContainerStyle={{ paddingBottom:30}}
            />
        </View>
    )
}

export default CoinList

const styles = StyleSheet.create({})