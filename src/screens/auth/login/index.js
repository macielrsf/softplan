import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
    AContainer,
    AButton,
    AInput
} from '~/components';

import styles from './styles';

import {
    changeUser,
    changePassword
} from './actions';

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    _login = async () => {
        try {
            await AsyncStorage.setItem('@auth', 'true');
            this.props.navigation.navigate('App');
        }
        catch(e) {
            console.warn(e);
        }
    }

    _checkLogin() {
        try {
            if ( this.props.user && this.props.user.length > 0 ) {
                if ( /[A-Z]/.test(this.props.user[0]) ) {
                    return true;
                }

                return false;
            } 

            return true;
        }
        catch(e) {
            console.warn(e);
        }

        return true;
    }

    render() {
        return (
            <AContainer form={true}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        TAREFA FÁCIL
                    </Text>
                </View>
                <View style={styles.content}>
                    <Image 
                        style={styles.image}
                        source={require('~/assets/todo.png')}
                        resizeMode="contain"
                    />
                    <View style={styles.input}>
                        <AInput 
                            placeholder="Nome" 
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            returnKeyType="next"
                            onChangeText={text => this.props.changeUser(text)}
                            value={this.props.user}
                        />
                    </View>
                    <View style={styles.button}>
                        <AButton 
                            disabled={this._checkLogin()}
                            onPress={this._login}>
                            ENTRAR
                        </AButton>
                    </View>
                </View>
            </AContainer>
        );
    }
}

const actions = {
    changeUser,
    changePassword
}

const mapStateToProps = (state) => {
    return ({
        user: state.LoginReducer.user,
        password: state.LoginReducer.password
    })
}

export default connect(mapStateToProps, actions)(Login);
