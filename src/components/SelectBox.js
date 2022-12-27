import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import Icon from './Icon';
import { fontFamily } from './Text';

const SelectBox = ({
  selectedValue,
  onSelectedValueChange,
  disabled,
  list,
  placeholder,
  containerStyle,
  textInputStyle,
  iconStyle,
  buttonStyle,
}) => {
  return (
    <RNPickerSelect
      style={{...styles.container, ...containerStyle}}
      disabled={disabled}
      value={selectedValue}
      onValueChange={onSelectedValueChange}
      items={list}
      placeholder={placeholder}
      touchableWrapperProps={{
        style: {...styles.touchableWrapper(disabled), ...buttonStyle},
      }}
      textInputProps={{
        style: {
          ...styles.textInput(disabled, selectedValue),
          ...textInputStyle,
        },
      }}
      Icon={() => (
        <Icon
          code="f078"
          fontawesome
          type={6}
          style={{...styles.icon(disabled), ...iconStyle}}
        />
      )}
      useNativeAndroidPickerStyle={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableWrapper: disabled => ({
    flex: 1,
    borderWidth: 1,
    borderColor: disabled ? '#ccc' : '#777',
    borderRadius: 5,
    paddingHorizontal: 5,
    height: 40,
  }),
  textInput: (disabled, selectedValue) => ({
    color: disabled ? '#ccc' : selectedValue ? '#444' : '#ccc',
    fontFamily:fontFamily["2"]
  }),
  icon: disabled => ({
    fontSize: 13,
    top: 14,
    right: 5,
    color: disabled ? '#ccc' : '#444',
  }),
});

SelectBox.propTypes = {
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSelectedValueChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string,
  }),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      color: PropTypes.string,
    }),
  ),
  containerStyle: PropTypes.object,
  textInputStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
};

SelectBox.defaultProps = {
  disabled: false,
  list: [],
  containerStyle: {},
  textInputStyle: {},
  iconStyle: {},
  buttonStyle: {},
};

export {SelectBox};
