import React, { useState } from 'react';
import { AppRegistry, View, Dimensions, StyleSheet, ImageBackground, Text, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function enregistrement({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  var logInDenied;
  if (errorMessage === true) {
    logInDenied = <Text style={{ color: 'white' }} >Email et/ou Mot de Passe Incorrect(es)</Text>
  }


  return (
    <View style={styles.backGroundColor}>
      <View style={styles.inscription}>
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <FontAwesomeIcon style={{ color: 'white' }} icon={faArrowLeft}  size={30} />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 30 }}>DJ INVITÉ</Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {logInDenied}
        <Text style={{ color: 'white', alignSelf: 'flex-start' }}>Pseudo:</Text>
        <TextInput style={{ backgroundColor: 'white', width: '90%', borderRadius: 10, marginBottom: "10%", height: '6.5%' }}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Text style={{ color: 'white', alignSelf: 'flex-start' }}>ID de l'évènement:</Text>
        <TextInput style={{ backgroundColor: 'white', width: '90%', borderRadius: 10, marginBottom: "10%", height: '6.5%' }}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Text style={{ color: 'white', alignSelf: 'flex-start' }}>Mot de passe de l'évènement:</Text>
        <TextInput style={{ backgroundColor: 'white', width: '90%', borderRadius: 10, marginBottom: "10%", height: '6.5%' }}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>

      <Button onPress={() => navigation.navigate('Onboarding')} title="Retour"></Button>
      <Button title="Rejoindre la soirée"
        onPress={() => navigation.navigate('Nouveauvote')}
        buttonStyle={{
          backgroundColor: '#584DAD',
          paddingLeft: 120,
          paddingRight: 120,
          paddingTop: 10,
          paddingBottom: 10,
          marginBottom: 20,
        }}></Button>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  wrap: {
    flexDirection: 'column',
    backgroundColor: '#131313',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: hp('100%'), // 70% of height device screen
    width: wp('100%')   // 80% of width device screen 
  },
  header: {
    backgroundColor: '#131313',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",


  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'Staatliches'
  },
  subtitle: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Staatliches',
    textAlign: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 40
  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    paddingRight: 30,
    paddingLeft: 30,
  },
  backGroundColor: {
    backgroundColor: '#131313',
    flex: 1
},
});

export default enregistrement;