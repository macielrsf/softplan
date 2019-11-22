import {
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    bgColor
} from '~/helpers/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
        flex: 1
    },
    input: {
        paddingBottom: 15
    },
    button: {
        paddingTop: 40
    },
    header: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        flex: 1
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'grey'
    },
    image: {
        width: width / 1.2
    }
});
