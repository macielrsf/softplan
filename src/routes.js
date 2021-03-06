import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import * as Screens from './screens';

const AuthStack = createStackNavigator({
    Login: { screen: Screens.Login }
}, {
    initialRouteName: 'Login'
});

const AppStack = createStackNavigator({
    Tasks: {  screen: Screens.Tasks },
    TaskOwner: {  screen: Screens.TaskOwner }
}, {
    initialRouteName: 'Tasks'
});

export const AppContainer = createAppContainer(
    createSwitchNavigator({
        AuthLoading: Screens.AuthLoading,
        Auth: AuthStack,
        App: AppStack
    }, {
        initialRouteName: 'AuthLoading'
    })
);
