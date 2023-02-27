import { DarkTheme, DefaultTheme, } from '@react-navigation/native';

export const lightTheme = {
    ...DefaultTheme,
    color: {
        primary: "#045c57",
        secondary: "#058079",
        white: "#fff",
        black: "#252525",
        bgPrimary: this.black,
    }
}

export const darkTheme = {
    ...DarkTheme,
    color: {
        primary: "#fff",
        secondary: "#ccc",
        white: "#fff",
        black: "#252525",
        bgPrimary: this.white,
    }
}