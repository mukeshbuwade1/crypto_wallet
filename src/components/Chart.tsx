import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { monotoneCubicInterpolation, ChartPath, ChartPathProvider, ChartDot, ChartXLabel, ChartYLabel } from "@rainbow-me/animated-charts";
import { COLORS, FONTS } from '../constants';
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

    const points = monotoneCubicInterpolation({ data, range: 90 });

    const formatUSD = value => {
        "worklet";

        if (value = "") { return "" }
        return `$${Number(value).toFixed(2)}`
    }
    return (
        <View>
            <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
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
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                            backgroundColor: COLORS.white,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                backgroundColor: COLORS.lightGreen,
                                justifyContent: "center",
                                alignItems: "center"
                            }} />
                        </View>
                    </View>
                </ChartDot>

                <ChartYLabel
                    format={formatUSD}
                    style={{
                        color: COLORS.white, ...FONTS.body5
                    }} />

            </ChartPathProvider>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})