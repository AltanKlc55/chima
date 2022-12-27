import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import PropTypes from 'prop-types';
import Text from './Text';

const keyboardType = { phone: "phone-pad", email: "email-address", number: "number-pad", iban: "number-pad" };

export const InputField = ({ title, value, onValueChange, type, style, weight, activeWeight, status = "normal", onInputFocus, onInputBlur }) => {

  const translateY = useRef(new Animated.Value(value !== "" ? -35 : 0)).current;
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused) {
      if (onInputFocus) onInputFocus();
    }
    else {
      if (onInputBlur) onInputBlur();
    }
  },[focused])

  const [typeSelection, setTypeSelection] = useState(type);

  const maskInput = useRef();
  const textInput = useRef();

  useEffect(() => {
    if (type !== typeSelection) {
      setTypeSelection(type);
      if (maskInput.current) maskInput.current.focus();
      else if (textInput.current) textInput.current.focus();
    }
  }, [type]);

  useEffect(() => {
    if (value && translateY._value === 0) Animated.spring(translateY, { toValue: -35, useNativeDriver: true }).start();
  }, [value]);

  const onFocus = () => {
    setFocused(true);
    Animated.spring(translateY, { toValue: -35, useNativeDriver: true }).start();
  }
  const onBlur = () => {
    setFocused(false);
    if (value === "") {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
    }
  }

  return (
    <View style={[styles.inputField, styles[`inputField_${status}`], style]}>
      <Animated.View
        style={[styles.inputField_title, { transform: [{ translateY }] }]}
        pointerEvents="none">
        <Text
          weight={focused || value !== "" ? (activeWeight ?? (weight ?? 2)) : (weight ?? 1)}
          style={[
            styles.inputField_text(focused || value !== ""),
            styles[`inputField_text_${status}`]
          ]}>
          {title}
        </Text>
      </Animated.View>
      {type === "phone" && (
        <MaskInput
          ref={maskInput}
          style={styles.inputField_input}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType[type] ?? "default"}
          value={value}
          placeholder={focused ? "0(___) ___ __ __" : ""}
          onChangeText={(masked, unmasked) => { onValueChange(masked); }}
          mask={["0", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/]} />
      )}
      {type === "password" && (
        <TextInput
          ref={textInput}
          style={styles.inputField_input}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={true}
          keyboardType={keyboardType[type] ?? "default"}
          defaultValue={value}
          onChangeText={onValueChange} />
      )}
      {type === "email" && (
        <TextInput
          ref={textInput}
          style={styles.inputField_input}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={true}
          keyboardType={keyboardType[type] ?? "default"}
          defaultValue={value}
          onChangeText={onValueChange} />
      )}
      {(type === "normal" || type === "default" || !type) && (
        <TextInput
          ref={textInput}
          style={styles.inputField_input}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType[type] ?? "default"}
          defaultValue={value}
          onChangeText={onValueChange} />
      )}
      {(type === "number") && (
        <TextInput
          ref={textInput}
          style={styles.inputField_input}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType[type] ?? "default"}
          defaultValue={value}
          onChangeText={onValueChange} />
      )}
      {type === "iban" && (
        <MaskInput
          ref={maskInput}
          style={styles.inputField_input}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType[type] ?? "default"}
          value={value}
          placeholder={focused ? "TR__ ____ ____ ____ ____ ____ __" : ""}
          onChangeText={(masked, unmasked) => { onValueChange(masked); }}
          mask={["T", "R", /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/]} />
      )}

    </View>
  )

}

const styles = StyleSheet.create({

  inputField: { width: "100%", height: 45, flexDirection: "column", alignItems: "flex-start", justifyContent: "center", borderRadius: 3, borderWidth: 1, marginTop: 35 },
  inputField_normal: { borderColor: "#ddd" },
  inputField_successful: { borderColor: "#3c3" },
  inputField_wrong: { borderColor: "red" },
  inputField_title: { position: "absolute", zIndex: 2, paddingHorizontal: 10 },
  inputField_text: active => ({ fontSize: 13, color: active ? "#000" : "#aaa", lineHeight: 20 }),
  inputField_text_normal: {},
  inputField_text_successful: { color: "#3c3" },
  inputField_text_wrong: { color: "red" },
  inputField_input: { flex: 1, width: "100%", paddingHorizontal: 10, borderBottomWidth: 0, fontSize: 13, letterSpacing: 1 },

});

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['phone', 'password', 'email', 'default', 'iban', 'number']),
  style: PropTypes.object,
  status: PropTypes.oneOf(['normal', 'successful', 'wrong'])
}