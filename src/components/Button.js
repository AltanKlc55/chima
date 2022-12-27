import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { loadingGif } from '../config/application';
import Icon from './Icon';
import Text from './Text';

export const TextButton = ({ weight, fontSize, style, text, textStyle, disabled, onPress, activeOpacity, loading }) => {

  const buttonProps = { disabled, onPress, activeOpacity, style };
  const textProps = { style: textStyle, fontSize, weight, value: text };

  return (
    <TouchableOpacity {...buttonProps}>
      {loading
        ? <FastImage source={loadingGif} style={{ height: "100%", aspectRatio: 1 }} />
        : <Text {...textProps} />
      }
    </TouchableOpacity>
  )
};

export const IconButton = ({ fontSize, style, code, iconStyle, disabled, onPress, activeOpacity, fontawesome }) => {

  const buttonProps = { disabled, onPress, activeOpacity, style };
  const iconProps = { style: iconStyle, fontSize, code, fontawesome };

  return (
    <TouchableOpacity {...buttonProps}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  )
}

export const TextIconButton = ({ iconSize, style, text, iconCode, iconStyle, disabled, onPress, activeOpacity }) => {

  const buttonProps = { disabled, onPress, activeOpacity, style };
  const textProps = { style: textStyle, fontsize, value: text };
  const iconProps = { code: iconCode, style: iconStyle, fontSize: iconSize, value: text };

  return (
    <TouchableOpacity {...buttonProps}>
      <Text {...iconProps} value={"IKON"} />
      <Text {...textProps} />
    </TouchableOpacity>
  )
}