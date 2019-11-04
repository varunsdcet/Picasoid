import PropTypes from 'prop-types'
import {requireNativeComponent, ViewPropTypes} from 'react-native';

var iface = {
    name: 'AgoraRendererView',
    propTypes:  {
        //src: PropTypes.array,
        //borderRadius: PropTypes.number,
        //resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
        width: 375,
        height: 500,
        ...ViewPropTypes, // include the default view properties
    },
};

module.exports = requireNativeComponent('AgoraRendererView', iface);