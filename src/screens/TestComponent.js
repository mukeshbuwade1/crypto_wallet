import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTheme } from '../redux/themeSlice'
import { useColorModeValue } from '../hooks/useColorModeValue';
import { useTheme } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from "axios";
import {
  getHash,
  startOtpListener,
  useOtpVerify,
  removeListener
} from 'react-native-otp-verify';


var data = JSON.stringify({
  "originator": "SignOTP",
  "recipient": "+919770675479",
  "content": "Greetings from D7 API, your mobile verification code is: {}.  7KPdjHs9uGM",
  "expiry": "600",
  "data_coding": "text"
});

var config = {
  method: 'post',
  url: 'https://api.d7networks.com/verify/v1/otp/send-otp',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiOTFhZWFlMzctNjg0OS00ZjZjLThjMWYtZjczZTFiYWRhN2ZmIn0.86rZSt_vdkw5wQRZoKZkl0hkK0wbqSEDxLHn0Rw2_6I',
    'Content-Type': 'application/json'
  },
  data: data
};

const getOtp = async () => {
  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

const options = {
  method: 'POST',
  url: 'https://d7-verify.p.rapidapi.com/verify/v1/otp/send-otp',
  headers: {
    'content-type': 'application/json',
    Token: 'undefined',
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'd7-verify.p.rapidapi.com'
  },
  data: '{"originator":"SignOTP","recipient":"+919770675479","content":"Greetings from D7 API, your mobile verification code is: 1210. 7KPdjHs9uGM ","expiry":"600","data_coding":"text"}'
};


// const getOtp = async () => {
//   await axios.request(options).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });

// }


const TestComponent = () => {
  const { color } = useTheme()
  const dispatch = useDispatch()
  const c = useColorModeValue("#000", "#fff")
  console.log("color", c)
  const [code, setCode] = useState("")

  useEffect(() => {
    getHash().then(hash => {
      console.log("hash", hash)
      // use this hash in the message.
    }).catch(console.log);

    startOtpListener(message => {
      console.log("message", message)
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp = /(\d{6})/g.exec(message)[1];
      console.log("optttttttt", otp)
      setCode(""+otp);
    });
    return () => removeListener();
  }, []);


  return (
    <View>
      <Button title='getotp' onPress={getOtp} />
      <Text style={{
        color: c, fontWeight: "700", width: "100%", textAlign: "center", fontSize: 20
      }}>Verify OTP</Text>

      <OTPInputView
        style={{ width: '80%', height: 200 }}
        pinCount={6}
        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={code => { setCode(code) }}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code => {
          console.log(`Code is ${code}, you are good to go!`)
        })}
      />
    </View>
  )
}

export default TestComponent


const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
