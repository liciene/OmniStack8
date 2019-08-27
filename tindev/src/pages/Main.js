import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id,
                }
            })

            setUsers(response.data);
        }
        loadUsers();
    }, [id]);

    async function handleLike() {
        const [user, ...rest] = users;

        await api.post(`/devs/${user._id}/Likes`, null, {
            headers: { user: id },
        })
        setUsers(rest);
    }

    async function handleDislike() {
        const [user, ...rest] = users;

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id },
        })
        setUsers(rest);
    }
    
    async function handleLogout(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={{width: 50, height: 100}} >
                <Image style={[styles.logo, {width: 50, height: 50}]} source={logo} resizeMode={"center"} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                { users.length === 0 
                    ? <Text style={styles.empty}>FINISH!</Text>
                    : (
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                                <Image  style={[styles.avatar, {width: "100%"}]} source={{ uri: user.avatar }}/>
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        )) 
                    )}  
            </View>
            
            { users.length > 0 && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={like} style={{width: '100%', height: '100%'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={dislike} style={{width: '100%', height: '100%'}}/>
                    </TouchableOpacity>
                </View>
            ) }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373940',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        marginTop: 25,
    },

    empty: {
        alignSelf: 'center',
        color: '#ccc',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
       
    },
    
    card:{ 
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    avatar: {
        flex: 1,
        height: 200,
    },

    footer: {
        backgroundColor: '#373940',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },

    bio: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 5,
        lineHeight: 18,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#525356',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 5,
    },
})