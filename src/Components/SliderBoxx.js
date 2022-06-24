import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

function SliderBoxx() {
  const [image, setImage] = useState([
    'https://thumbs.dreamstime.com/z/water-heater-installation-sd-plumber-tightening-gas-line-using-wrench-tool-newly-installed-tank-great-concept-plumbing-193560467.jpg',
    'https://static.skillshare.com/cdn-cgi/image/quality=85,width=1242,height=839,format=auto/uploads/project/258453/cover_1242_72af164138c6e2cc123a10ad8d9172c4.jpg',
    'https://firebasestorage.googleapis.com/v0/b/mrfix-55775.appspot.com/o/tim-mossholder-V37iTrYZz2E-unsplash.jpg?alt=media&token=cddcc9c8-eccd-45ba-bc3e-928aed9ff6d1',
  ]);

  return (
    <SliderBox
      images={image}
      dotColor="pink"
      inactiveDotColor="white"
      sliderBoxHeight={160}
      dotStyle={{}}
      autoplay
      circleLoop={true}
      resizeMethod={'resize'}
      resizeMode={'cover'}
      ImageComponentStyle={{
        borderRadius: 19,
        borderColor: 'black',
        borderWidth: 0.3,
        width: '80%',
        marginTop: '8%',
      }}
    />
  );
}
export default SliderBoxx;
