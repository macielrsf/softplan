import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import {
    AContainer,
    AText
} from '~/components';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        padding: 30,
        flex: 0.5
    },
    mapBox: {
        flex: 1,
        margin: 30,
        borderRadius: 5,
        borderWidth: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    description: {
        fontWeight: 'bold'
    }
});

export default class TaskOwner extends Component {
    static navigationOptions = {
        title: 'Responsável'
    };

    constructor(props) {
        super(props);
        const { item, owner } = this.props.navigation.state.params;

        this.state = {
            item,
            owner
        };
    }

    _renderField(key, value) {
        return (
            <AText style={{  marginTop: 5 }}>
                <AText style={styles.description}>
                    {key}:
                </AText> 
                {value}
            </AText>
        );
    }

    render() {
        const { owner } = this.state;
        const address = `${owner.address.street}, ${owner.address.suite} - ${owner.address.city}`;

        return (
            <AContainer>
                <View style={styles.content}>
                    {this._renderField('Nome', owner.name)}
                    {this._renderField('Email', owner.email)}
                    {this._renderField('Telefone', owner.phone)}
                    {this._renderField('Endereço', address)}
                </View>
                <View style={styles.mapBox}>
                    <MapView 
                        style={styles.map}>
                        <Marker
                            title={`${owner.address.street}, ${owner.address.suite}`}
                            coordinate={{
                                latitude: parseFloat(owner.address.geo.lat),
                                longitude: parseFloat(owner.address.geo.lng)
                            }}
                        />
                    </MapView>
                </View>
            </AContainer>
        );
    }
}
