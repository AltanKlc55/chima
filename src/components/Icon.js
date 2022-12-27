import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { mergeStyles } from '../helpers/index';
import { defaultFontFamilies } from '../config/application';

const familyNames = [
  null,
  "FontAwesome6Pro-Thin",
  "FontAwesome6Pro-Light",
  "FontAwesome6Pro-Regular",
  "FontAwesome6Brands-Regular",
  "FontAwesome6Duotone-Solid",
  "FontAwesome6Pro-Solid"
];


const Icon = ({ code, color, fontSize, style, type, onLayout, fontawesome, ifaicon }) => {
  const defaultStyle = { fontFamily: fontawesome ? familyNames[type ?? 2] : ifaicon ? "MissZenne" : defaultFontFamilies[type??0], fontSize: fontSize ?? 13, color };
  const mergedStyle = mergeStyles(defaultStyle, style);
  return <Text style={mergedStyle} onLayout={onLayout}>{fixedFromCharCode('0x' + code)}</Text>
}

function fixedFromCharCode(codePt) {
  if (codePt > 0xFFFF) {
    codePt -= 0x10000;
    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
  } else {
    return String.fromCharCode(codePt);
  }
}

export const socialMediaIfaIcons = [
  { media: "facebook", code: "e9af" },
  { media: "instagram", code: "e9b3" },
  { media: "linkedin", code: "e992" },
  { media: "twitter", code: "e9a1" },
  { media: "pinterest", code: "e9a9" },
];

Icon.propTypes = {
  code: PropTypes.string.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onLayout: PropTypes.func,
  fontawesome: PropTypes.bool,
  ifaicon: PropTypes.bool
}

Icon.defaultProps = {
  color: '#444444',
  fontSize: 20,
  style: {},
  onLayout: () => { }
}

export default Icon;
