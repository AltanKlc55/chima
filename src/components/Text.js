import { Text as TextRN } from 'react-native';

export const fontFamily = {
  "1": 'DuttiW-Medium',
  "2": 'DuttiW-Regular',
  "3": 'DuttiW-SemiBold',
  "4": 'DuttiWExtended-Bold',
  "5": 'DuttiWExtended-ExtraBold',
};

const Text = props => {
  const style = { ...props.style, fontFamily: fontFamily[props.weight ?? 2] };
  if (!style.color) style.color = "white";
  if (props.fontSize) style.fontSize = props.fontSize;
  else if (!style.fontSize) style.fontSize = 13;
  if (!style.lineHeight) style.lineHeight = style.fontSize;

  return (
    <TextRN {...props} style={style}>
      {props.value}
      {props.children}
    </TextRN>
  );
};

export default Text;