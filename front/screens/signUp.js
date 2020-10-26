import React, {useState} from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Ionicons from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

 





function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    

    var handleSignUp = async() => {
        console.log(username, email, password)
        await fetch('http://172.17.1.100:3000/sign-up', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `username=${username}&email=${email}&password=${password}`
        })
    }
    
    return (
    <View style={styles.backGroundColor}>
        <View style={styles.inscription}>
            <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                <FontAwesomeIcon style={{color: 'white'}} icon={faArrowLeft} size={30}/>
            </View>
            <View style={{justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 30}}>INSCRIPTION</Text>
            </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: 'white', alignSelf: 'flex-start'}}>Username:</Text>
            <TextInput style={{backgroundColor: 'white', width: '90%', borderRadius: 10, marginBottom: "10%", height: '6.5%'}}
                onChangeText={text => setUsername(text)}
                value={username}
                />
            <Text style={{color: 'white', alignSelf: 'flex-start'}}>Email:</Text>
            <TextInput style={{backgroundColor: 'white', width: '90%', borderRadius: 10, marginBottom: "10%", height: '6.5%'}}
                onChangeText={text => setEmail(text)}
                value={email}
                />
            <Text style={{color: 'white', alignSelf: 'flex-start'}}>Mot de Passe:</Text>
            <TextInput style={{backgroundColor: 'white', width: '90%', borderRadius: 10, marginBottom: "10%", height: '6.5%'}}
                onChangeText={text => setPassword(text)}
                value={password}
                />
            <Text style={{color: 'white', alignSelf: 'flex-start'}}>Confirmation Mot de Passe:</Text>
            <TextInput style={{backgroundColor: 'white', width: '90%', borderRadius: 10, marginBottom: "10%", height: '6.5%'}}/>
            <View style={{width: '90%',height: '6.5%', color: '#584dad'}}>
                <Button title="Continuer" style={styles.button}
                   onPress={()=>handleSignUp()}
                />
            </View>
        </View>
    </View>
  );
}


var styles = StyleSheet.create({
    all: {
        fontFamily: ''
    },
    backGroundColor: {
        backgroundColor: '#131313',
        flex: 1
    },
    inscription: {
        flex: 0.1,
        alignSelf: 'center',
        marginTop: '10%',
        flexDirection: 'row',
        marginBottom: '30%'
    },
    button: {
        borderRadius: 10
    }
})


export default SignUp;