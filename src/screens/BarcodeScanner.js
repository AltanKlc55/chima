import { StyleSheet, Text,View } from 'react-native';
import { useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat,BarcodeValueType, scanBarcodes } from 'vision-camera-code-scanner';
import { useState,useEffect } from "react";
import { runOnJS } from 'react-native-reanimated';


export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [barcodeNumber ,setBarcodeNumber] = useState("");

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });

  // Alternatively you can use the underlying function:
  //
     const frameProcessor = useFrameProcessor(
       frame => {
         // eslint-disable-next-line
         'worklet'
         const barcodes = scanBarcodes(frame, [BarcodeFormat.EAN_13])
         if(barcodes[0]?.content?.data){
           console.log('Ürün Barkodu : ', barcodes[0]?.content?.data);
           runOnJS(setBarcodeNumber)(barcodes[0].content.data);
         }
       },
       []
     )

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();

  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={styles.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />

        <View>
          <Text style={{color:"black"}}>Barkod Numarası : {barcodeNumber}</Text>
        </View>

      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  absoluteFill:{
    width:"100%",
    height:250
  }
});