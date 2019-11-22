import React, { Component, Fragment } from 'react';
import {
    View,
    Button,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {
    load
} from './actions';

import {
    AContainer,
    AInput,
    AText,
    AButton
} from '~/components';

import { 
    tintColor, 
    bgColor,
    primaryColor
} from '~/helpers/theme';

import Task from './components/task';

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        padding: 20
    },
    content: {
        flex: 1
    }
});

class Tasks extends Component {
    static navigationOptions = {
        title: 'Tarefas'
    }

    componentDidMount() {
        this.props.load();
    }

    _logout = async () => {
        try {
            await AsyncStorage.removeItem('@auth'); 
            this.props.navigation.navigate('Login');
        }
        catch(e) {
            console.warn(e);
        }
    }

    _getOwner(item) {
        let owner = '';

        this.props.users.map(user => {
            if ( item.userId === user.id ) {
                owner = user.name;
            }
        });

        return owner;
    }

    _renderItem = ({ item, idx }) => {
        let owner = this._getOwner(item);

        return (
            <Task item={item} owner={owner} /> 
        );
    }

    _renderContent() {
        if ( this.props.loading ) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator
                        size="large"
                        color={tintColor}
                    />
                </View>
            );
        }

        if ( !this.props.loading &&
             this.props.tasks.length <= 0 ) {
            return (
                <View style={styles.loading}>
                    <Icon
                        name="refresh"
                        size={40}
                        color={tintColor}
                        onPress={() => this.props.load()}
                    />
                </View>
            );
        }

        return (
            <FlatList
                keyExtractor={(item, id) => item.id}
                renderItem={this._renderItem}
                data={this.props.tasks}
            />
        );
    }

    render() {
        return (
            <AContainer>
                <View style={styles.header}>
                    <AButton onPress={this._logout}>
                        SAIR
                    </AButton>
                </View>
                <View style={styles.content}>
                    {this._renderContent()}
                </View>
            </AContainer>
        );
    }
}

const actions = {
    load
}

const mapStateToProps = (state) => {
    return ({
        loading: state.TasksReducer.loading,
        tasks: state.TasksReducer.tasks,
        users: state.TasksReducer.users
    });
}

export default connect(mapStateToProps, actions)(Tasks);
