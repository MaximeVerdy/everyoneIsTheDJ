import React, {useState} from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput } from 'react-native';
import { Badge, Button, Header, Icon, Input} from 'react-native-elements'
import Ionicons from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function SignIn(props) {

   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    
    
var handleSignIn = async() => {
// --------------------------------- VOS IP ICI ----------------------------------------- 
// Flo IP 192.168.0.17   
//LA capsule 172.17.1.32
    var rawResponse = await fetch('http://172.17.1.32:3000/sign-in', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${email}&password=${password}`
        })

    var response = await rawResponse.json();
    
    if(response.result === false){
        setErrorMessage(true)
    } else {
        props.navigation.navigate('HomeHost')
    }

    
}

var logInDenied;
if(errorMessage === true){
    logInDenied = <Badge status="error" badgeStyle={{color: 'white', backgroundColor:'#FF0060'}} value="Email et/ou Mot de Passe Incorrect(es)"></Badge>
}

var headerLeft = <FontAwesomeIcon icon={faArrowLeft} size={35} style={{color: "white"}} onPress={() => props.navigation.navigate('DJhoteFirstScreen')} />;
var headerCenter = <Text style={{color: '#fff', fontSize: 40, fontFamily:'Staatliches', textAlign: 'center', alignItems: 'baseline'}}>Connexion</Text>;
   

    return (
    <View style={styles.container}>
        
        <Header
                    containerStyle={{backgroundColor: '#131313', borderBottomWidth: 0}}
                    leftComponent={headerLeft}
                    centerComponent={headerCenter}
                    
                />
           <KeyboardAwareScrollView style={styles.main}> 
            {logInDenied}
                    <Input
                        label='Email'
                                placeholder='gerard@mail.com'
                                type='text'
                                containerStyle={{
                                        color:'#fff', 
                                        width: '100%', 
                                        marginTop:'3%'
                                    }}
                                inputStyle={{
                                        fontFamily:'Roboto-Bold',
                                        fontSize: 18,
                                        color: '#fff',

                                        borderBottomColor:'#000981'
                                }}
                                labelStyle={{
                                    fontFamily:'Roboto-Bold',
                                    fontSize: 20,
                                    color: '#584DAD',
                            
                                }}
                                onChangeText={text => setEmail(text)}
                                value={email}
                    />
                    <Input
                        label='Mot de passe'
                                placeholder='•••••••••'
                                secureTextEntry={true}
                                type='password'
                                containerStyle={{
                                        color:'#fff', 
                                        width: '100%', 
                                        marginTop:'3%'
                                    }}
                                inputStyle={{
                                        fontFamily:'Roboto-Bold',
                                        fontSize: 18,
                                        color: '#fff',

                                        borderBottomColor:'#000981'
                                }}
                                labelStyle={{
                                    fontFamily:'Roboto-Bold',
                                    fontSize: 20,
                                    color: '#584DAD',
                            
                                }}
                                onChangeText={text => setPassword(text)}
                                value={password}
                    />

            <Text style={{ textDecorationLine: 'underline', color: '#584DAD', fontFamily:'Roboto-Bold', marginBottom:'10%', textAlign:'center'}}>Mot de passe oublié?</Text>
            <Button 
                        title="Continuer" 
                        onPress={()=>
                            handleSignIn()
                        }
                        buttonStyle={{
                            backgroundColor: '#584DAD',
                            borderRadius: 10,
                       
                        }}
                    /> 
        </KeyboardAwareScrollView>
    </View>
  );
}


var styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#131313',
       
    },
    main: {
        backgroundColor: '#131313',
        alignContent:'center',
        textAlign: 'center',
        height: '100%',
        width: '100%',
        marginTop:'10%'
        
      },
    
})


export default SignIn;