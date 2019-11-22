import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    AText
} from '~/components';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    box: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3.0,
        elevation: 5,
        height: 140,
        width: width - 60,
        margin: 10
    },
    boxContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 15
    },
    iconBox: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3.0,
        elevation: 5,
        height: 35,
        width: 35,
        borderRadius: 30
    },
    title: {
        fontWeight: 'bold',
        paddingLeft: 10,
        flex: 1,
        flexWrap: 'wrap'
    },
    owner: {
        paddingLeft: 10,
        flex: 1,
        flexWrap: 'wrap'
    }
});

class Task extends Component {
    _gotoTaskOwner = () => {
        const { item } = this.props;
        this.props.navigation.navigate('TaskOwner', { item });
    }

    _renderIcon() {
        const { item } = this.props;

        if ( item.completed ) {
            return (
                <View style={styles.iconBox}>
                    <Icon 
                        name="check" 
                        color="#71C200" 
                        size={20}
                    />
                </View>
            );
        }

        return (
            <View style={styles.iconBox}>
                <Icon 
                    name="warning" 
                    color="orange" 
                    size={18}
                />
            </View>
        );
    }

    render() {
        const { item, owner } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.box}
                    onPress={this._gotoTaskOwner}>
                    <View style={styles.boxContent}>
                        {this._renderIcon()}
                            <AText style={styles.title}>
                                {item.title}
                            </AText>
                            <AText style={styles.owner}>
                                Responsável: {owner}
                            </AText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(Task);
