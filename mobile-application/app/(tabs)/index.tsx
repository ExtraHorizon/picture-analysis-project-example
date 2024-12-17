import { Image, Text, View } from 'react-native';
import { useExtraHorizon } from '../../providers/ExtraHorizon';

export default function HomeScreen() {
  const { me } = useExtraHorizon();

  return (
    <View className='flex w-full h-full justify-center items-center gap-6 bg-white'>
      <Image
        source={require('@/assets/images/extra-horizon-logo.png')}
        className='w-28 h-28'
      />
      <Text className='text-base font-bold'>{ me?.email }</Text>
    </View>
  );
}
