import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-native-elements';
import Divider from 'react-native-divider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Countdown from '../countdown';
import { connect } from 'react-redux';


function SecondeHomeHost(props) {

  var headerCenter = <Image source={require('../../assets/logoMini.png')} style={{ width: 80, height: 82 }} />


  useEffect(() => {

    const findTIMER = async () => {


      // ----------------------------------------- METTRE A JOUR l'IP --------------------------------------------
      var TIMERdata = await fetch('http://192.168.0.40:3000/afficheTimer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      })


      var timer = await TIMERdata.json();
      setTIMER(timer.reboursFinal)
      console.log("rebours", timer)
    }

    findTIMER()

    console.log('Comptes à rebours FRONT ici ->', TIMER)
    console.log('hostIdState', props.hostId)
    console.log('TokenState', props.token)

  }, [])



  return (
    <View style={styles.container}>
      <View style={{ height: 150 }}>
        <Header
          centerComponent={headerCenter}
          containerStyle={{ backgroundColor: "#131313", height: '20%', alignItems: 'flex-start', borderBottomWidth: 0, justifyContent: 'flex-start' }}
        />

        <Button
          buttonStyle={{
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
          icon={
            <FontAwesomeIcon icon={faBars} size={35} style={{ color: "white" }} onPress={() => props.navigation.openDrawer()} />
          }
        />

      </View>

      <ScrollView style={styles.wrap}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 350, borderTopWidth: 1, borderTopColor: "#fff", borderBottomColor: '#fff', borderBottomWidth: 1 }} >

          <Text style={styles.text} >Aucune soirée en cours maintenant!</Text>

        </View>
        <View>

          <Text style={styles.subtitle} >Mes soirées</Text>

          <View style={styles.box} >

            <View>
              <Text style={styles.subtext}>Ajoute une soirée pour lancer un vote</Text>
            </View>

          </View>

        </View>
        <Button
          title=" Nouvelle soirée"
          onPress={() => props.navigation.navigate('EventCreation')}
          buttonStyle={{
            backgroundColor: '#584DAD',
            borderRadius: 10,
            marginTop: '2%'
          }}
          icon={<FontAwesomeIcon
            icon={faPlus}
            size={15}
            color="white"
          />
          }
        />
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',

  },
  wrap: {
    flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center',
    textAlign: 'center',
    height: hp('100%'), // 70% of height device screen
    width: wp('100%'),  // 80% of width device screen 
    backgroundColor: '#131313',

  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'Staatliches',
    marginTop: '2%'
  },

  subtitle: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Staatliches',
    textAlign: 'left',
    marginTop: '2%',
    marginLeft: '2%'

  },
  subtext: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Staatliches',
    textAlign: 'center',
    marginTop: '5%',
    marginLeft: '2%'

  },
  libelle: {
    color: '#584DAD',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center',
    marginTop: '6%'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginTop: '5%',


  },
  box: {
    flexDirection: 'column',
    // justifyContent: 'center',
    borderWidth: 4,
    padding: '8%',
    borderRadius: 10,
    margin: '2%',
    alignItems: 'stretch',
    borderColor: '#584DAD',
    textAlign: 'center'

  }

});


function mapStateToProps(state) {
  return { hostId: state.hostId }
}

export default connect(
  mapStateToProps,
  null
)(SecondeHomeHost);
