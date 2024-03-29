import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Chart from '../components/Chart';
import MainLayout from '../components/MainLayout';
import { COLORS, FONTS, icons } from '../constants';
import CoinList from '../constants/CoinList';
import { myHoldingsApi } from '../redux/holdingSlice';

interface propType {

}
interface walletViewProps {

}

interface rootState {
    holdingList: {
        status: string,
        error: null | string,
        holdings: Array<Object>
    }
}

const WalletView: React.FC<walletViewProps> = () => {
    return (
        <View style={{ ...styles.box }}>
            <Text style={{ ...styles.tx }}>Your Wallet</Text>
            <Text style={{ ...styles.tx }}>$ <Text style={{ fontSize: 25, color: COLORS.white }}>32,90,000.789</Text> USD</Text>

            {/* bottom View */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={icons.upArrow} style={{
                    width: 12, height: 15,
                    tintColor: COLORS.red,
                    // transform:[{rotate:"45deg"}]
                    transform: [{ rotate: "145deg" }],
                    marginRight: 5
                }} resizeMode={"contain"} />
                <Text style={{ ...styles.tx, }}>-30.56%</Text>
                <Text style={{ ...styles.tx, marginLeft: 10 }}>7d change</Text>
            </View>

            {/* button view  */}
            <View style={{
                flexDirection: "row", justifyContent: "space-around",
                marginBottom: -60, marginTop: 20
            }}>
                <ButtonWithIcon icon={icons.send} title={"Transfer"} style={{ width: "45%" }} />
                <ButtonWithIcon icon={icons.withdraw} title={"Withdraw"} style={{ width: "45%" }} />
            </View>
        </View>
    )
}

const Home: React.FC<propType> = () => {

    const dispatch = useDispatch()
    const { coinList } = useSelector((s: rootState) => s)
 
    const [chartIndex, setChartIndex] =useState(0)
    // console.log("holdingList0", coinList[chartIndex]?.sparkline_in_7d?.price)
    // console.log("holdingList1", coinList[chartIndex])
    console.log("holdingList2", coinList.coinList)
    function getData() {
        if (coinList.status == "idle") {
            dispatch(myHoldingsApi())
        } else {

        }
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <MainLayout>

            <View
            
            >
           
                {/* wallet information */}

                <WalletView />

                {/* chart */}
                <Chart data={coinList?.coinList[chartIndex]?.sparkline_in_7d?.price} image={coinList?.coinList[chartIndex]?.image} />

                {/* coin data list */}
                <CoinList chartIndex={chartIndex} setChartIndex={setChartIndex} />

            </View>

        </MainLayout>
    )
}

export default Home;

const styles = StyleSheet.create({
    tx: {
        color: COLORS.lightGray3,
        fontFamily: "Roboto-Bold",
        fontSize: 15,
    },
    box: {
        backgroundColor: COLORS.primary,
        padding: 30,
        paddingTop: 10,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        marginBottom: 30
    }
})