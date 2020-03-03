import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, Alert } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.2.9:8080',  {
                query: { user_id },
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            });
        })
    });

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            //averiguar
            let techsArray = storagedTechs.split(', ');

            techsArray.map(tech => tech.trim);

            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30,
    }
});