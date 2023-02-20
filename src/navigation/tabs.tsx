import React from "react";
import {
    Text,
    TouchableOpacity, View,
} from "react-native";
import { BottomTabBarButtonProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Portfolio, Market, Profile } from "../screens"
import { COLORS } from "../constants";
import icons from "../constants/icons";
import TabIcons from "../components/TabIcons";
import { useDispatch, useSelector } from "react-redux";
import { setTradeModelVisible } from "../redux/tabSlice";

const Tab = createBottomTabNavigator()

export type props = {}

interface rootState {
    showTrade: boolean
    }

const Tabs: React.FC<props> = () => {
    const dispatch = useDispatch()
    const { showTrade } = useSelector((s:rootState) => s)


    const TradeButtonComp = (props: BottomTabBarButtonProps) => {
        const { children, onPress } = props
        return (
            <TouchableOpacity
                onPress={() => dispatch(setTradeModelVisible(!showTrade))}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",

                }}
            >
                <View
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: COLORS.black,
                    }}>
                    {children}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: 80,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!showTrade) return <TabIcons icon={icons.home} focused={focused} label={"Home"} />;
                    },
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!showTrade) return <TabIcons icon={icons.briefcase} focused={focused} label={"portfolio"} />;
                    },
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <TabIcons icon={showTrade ? icons.close : icons.trade} focused={focused} label={"trade"} />;
                    },
                    tabBarButton: (props) => (<TradeButtonComp {...props} onPress={() => { }} />)
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!showTrade) return <TabIcons icon={icons.market} focused={focused} label={"Market"} />;
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!showTrade) return <TabIcons icon={icons.profile} focused={focused} label={"profile"} />;
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;