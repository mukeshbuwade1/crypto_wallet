import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { monotoneCubicInterpolation, ChartPath, ChartPathProvider, ChartDot, ChartXLabel, ChartYLabel } from "@rainbow-me/animated-charts";
import { COLORS, FONTS, SIZES } from '../constants';
import moment from 'moment';

export const { width } = Dimensions.get('window');

const Chart = (props) => {
    let date_unix = moment().subtract(7, "day").unix()


    let data = props?.data ? props.data.map((e, i) => {
        return {
            x: date_unix + (i + 1) * 3600,
            y: e
        }
    }) : []
    const points = monotoneCubicInterpolation({ data, range: 100 });

    const formatUSD = value => {
        "worklet";
        if (value) {
            if (value == "") {
                return ""
            } else {
                let a = Number(value).toFixed(2)
                return "$" + a + ''
            }
        } else {
            return ""
        }

    }
    const formatDateTime = value => {
        "worklet";
        if (value) {
            if (value == "") {
                return ""
            } else {
                let selectedDate: Date = new Date(1000 * value);
                let date = selectedDate.getDate()
                let month = selectedDate.getMonth() + 1
                return `${date}/${month}`
            }
        } else {
            return ""
        }
    }

    function formatValue(value) {
        if (value > 1e6) {
            return `$${(value / 1e6).toFixed(2)}M`
        } else if (value > 1e3) {
            return `$${(value / 1e3).toFixed(2)}K`
        } else {
            return  `$${Number(value).toFixed(2)}`
        }
    }
    const creatingYAxisLabel = () => {
        if (props?.data !== undefined) {
            let min = Math.min(...props?.data)
            let max = Math.max(...props?.data)

            let mid = (min + max) / 2

            let higherMid = (mid + max) / 2
            let lowerMid = (min + mid) / 2;
            return [
                formatValue(max),
                formatValue(higherMid),
                formatValue(mid),
                formatValue(lowerMid),
                formatValue(min),
            ]
        } else {
            return []
        }
    }
    return (
        <View style={{ marginTop: 20 }}>

            <View
                style={{
                    display: props?.data ? "none" : "flex",
                    position: "absolute",
                    height: 220,
                    backgroundColor: COLORS.transparentBlack1
                }}
            />
            <View style={{
                position: "absolute",
                height: 220,
                flexDirection: "column",
                justifyContent: "space-between",
            }}>
                {
                    creatingYAxisLabel().map((e, i) => (
                        <Text style={{ ...FONTS.h4, color: COLORS.lightGray3 }} key={i}>{e}</Text>
                    ))
                }
                <Image source={{uri:props.image}}  alt='crypto image'
                style={{
                    width: 100,
                    height: 100,
                    resizeMode:"contain",
                    position:"absolute",
                    top:60,
                    left:150,
                    opacity:0.2
                }}
                />
            </View>
            <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }} >
                <ChartPath height={200} stroke={COLORS.lightGreen} width={width} />
                <ChartDot >
                    <View style={{
                        backgroundColor: COLORS.transparentBlack1,
                        position: "absolute",
                        left: -35,
                        width: 80,
                        alignItems: "center"
                    }}>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                            backgroundColor: COLORS.white,
                        }}>
                            <View style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                backgroundColor: COLORS.lightGreen,

                            }} />
                        </View>
                        {/* Y label  */}
                        <ChartYLabel
                            format={formatUSD}
                            style={{
                                color: COLORS.white, fontFamily: "Roboto-Regular", fontSize: SIZES.body5,
                            }} />

                        {/* x label  */}
                        <ChartXLabel
                            format={formatDateTime}
                            style={{
                                color: COLORS.lightGray3, fontFamily: "Roboto-Regular", fontSize: SIZES.body5
                            }} />
                    </View>
                </ChartDot>


            </ChartPathProvider>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})