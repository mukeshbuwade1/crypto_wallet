import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { monotoneCubicInterpolation, ChartPath, ChartPathProvider, ChartDot, ChartXLabel, ChartYLabel } from "@rainbow-me/animated-charts";
import { COLORS, FONTS, SIZES } from '../constants';
import moment from 'moment';

export const { width } = Dimensions.get('window');

const Chart = (props) => {
    let date_unix = moment().subtract(7, "day").unix()

    // const data = [
    //     { x: 1453075200, y: 1.47 }, { x: 1453161600, y: 1.37 },
    //     { x: 1453248000, y: 1.53 }, { x: 1453334400, y: 1.54 },
    //     { x: 1453420800, y: 1.52 }, { x: 1453507200, y: 2.03 },
    //     { x: 1453593600, y: 2.10 }, { x: 1453680000, y: 2.50 },
    //     { x: 1453766400, y: 2.30 }, { x: 1453852800, y: 2.42 },
    //     { x: 1453939200, y: 2.55 }, { x: 1454025600, y: 2.41 },
    //     { x: 1454112000, y: 2.43 }, { x: 1454198400, y: 2.20 },
    // ];
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
                // let selectedDate= moment()
                console.log("l", `${date}/${month}`)
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
            return value
        }
    }
    const creatingYAxisLabel = () => {
        if (props?.data !== undefined) {
            let min = Math.min(...props?.data)
            let max = Math.max(...props?.data)

            let mid = (min + max) / 2

            let higherMid = (mid + max) / 2
            let lowerMid = (min + mid) / 2;
            // console.log(min, lowerMid, mid, higherMid, max)
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
        <View style={{marginTop:20}}>
            <View style={{
                position: "absolute",
                height: 220,
                flexDirection: "column",
                justifyContent: "space-between",
            }}>
                {
                    creatingYAxisLabel().map((e,i) => (
                        <Text style ={{...FONTS.h4, color:COLORS.lightGray3}} key={i}>{e}</Text>
                    ))
                }
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