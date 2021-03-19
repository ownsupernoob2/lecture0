import React, { useEffect, useState } from "react";
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Content,
    Button,
    Text,
} from "native-base";
import { StyleSheet, Image, View, Alert } from "react-native";
import { signInWithGmail } from "../../functions/FireAuthHelper";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Loader from '../../components/Loader';

const LoginLanding = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false); //For Loader Hide/Show

    /**
    * @description Function to Login with Facebook.
    * @param null.
    */
 

    /**
     * @description Function to Configure google sign .
     * @param null.
     */
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '85711100844-2b7iussqevqf9ti2qc49p2lnv5u1b3d9.apps.googleusercontent.com', //'954003985339-qsic3rv7bduob5a744mh364vvtmq7f7a.apps.googleusercontent.com',
            offlineAccess: false,
        });
    }, [])

    /**
     * @description Function to Login with Gmail.
     * @param null.
     */
    const loginWithGmail = async () => {
        try {
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfoFromGmail = await GoogleSignin.signIn();
            console.log("Successfully Login with :===> " + JSON.stringify(userInfoFromGmail))
            console.log("user token :--> " + JSON.stringify(userInfoFromGmail.idToken));
            // console.log('User information :--> ' + JSON.stringify(userInfo.user))

            signInWithGmail(userInfoFromGmail.idToken)
                .then((res) => {
                    console.log("Response of Gmail ", JSON.stringify(res));
                    let userInfo = {
                        firstName: res.user.displayName.split(' ')[0],
                        lastName: res.user.displayName.split(' ')[1],
                        userAuth: {
                            email: res.user.email,
                            password: "",
                        },
                        phoneNumber: "",
                    }
                    console.log("User info gmail---------", JSON.stringify(userInfo));
                    alert("User logged in Successfully");
                    setIsLoading(false);
                    navigation.navigate("ProfileScreen");
                })
                .catch(error => {
                    console.log("Error while signin using facebook from Gmail API ", error);
                    setIsLoading(false);
                })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                setIsLoading(false);
                Alert.alert('cancelled', 'You cancelled Gmail sign in.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                setIsLoading(false);
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                setIsLoading(false);
                Alert.alert('play services not available or outdated');
            } else {
                console.log("Something went wrong :===> " + error.toString())
                setIsLoading(false);
                //Alert.alert('Something went wrong', error.toString());
            }
        }
    }

    
   

    return (
        <Container>
                
            <Content>
                <Button
                    style={[styles.button, { marginTop: '8%' }]}
                    onPress={() => navigation.navigate("loginScreen")}>
                    <Image
                        style={styles.btnIcon}
                        source={require('../../assets/email.png')}
                    />
                    <Text style={styles.btnText}>Login using Email/Password</Text>
                </Button>

            

              
                <Button
                    style={styles.button}
                    onPress={loginWithGmail}
                >
                    <Image
                        style={styles.btnIcon}
                        source={require('../../assets/gmailLogo.png')}
                    />
                    <Text style={styles.btnText}>Login using Gmail</Text>
                </Button>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '15%' }}>
                    <Text
                    >Don't have an account?</Text>
                    <Text
                        style={styles.register}
                        onPress={() => navigation.navigate("signUpScreen")}>  Register </Text>
                </View>
            </Content>
            <Loader isAnimate={isLoading} />
        </Container>
    );
};

export default LoginLanding;

const styles = StyleSheet.create({
    button: {
        justifyContent: "space-between",
        width: '75%',
        alignSelf: "center",
        marginBottom: 20,
        backgroundColor: 'white',
        paddingHorizontal: '4%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row'
    },
    btnIcon: {
        height: 24, width: 24,
        resizeMode: 'contain'
    },
    btnText: {
        color: 'black',
        width: '90%',
        textAlign: 'left',
        fontSize: 16
    },
    register: {
        textDecorationLine: 'underline'
    }
});
