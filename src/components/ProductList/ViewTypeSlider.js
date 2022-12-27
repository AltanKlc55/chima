import { Slider } from "@miblanchard/react-native-slider";
import { useState } from "react";
import { View } from "react-native";

const ViewTypeSlider = ({ index = 0, values = [], onValueChange = () => { } }) => {

  const [value, setValue] = useState(index);

  return (
    <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
      <Slider
        animationType="spring"
        animateTransitions
        animationConfig={{ useNativeDriver: true }}
        thumbStyle={{ backgroundColor: '#000' }}
        trackStyle={{ height: 1, backgroundColor: '#000' }}
        minimumValue={0}
        maximumValue={values.length ? values.length - 1 : 0}
        value={value}
        onValueChange={newValue => {
          setValue(newValue[0]);
        }}
        onSlidingComplete={newValue => {
          onValueChange(values[Number(value.toFixed(0))]);
          setValue(Number(newValue[0].toFixed(0)));
        }}        
      />
    </View>
  );
};

export default ViewTypeSlider;