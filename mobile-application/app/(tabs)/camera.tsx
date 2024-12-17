import { useMutation } from '@tanstack/react-query';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { ApertureIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ActivityIndicator, Button, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExtraHorizon } from '../../providers/ExtraHorizon';

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [facing, _setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const { exh } = useExtraHorizon();
  const uploadPhotoMutation = useMutation({
    mutationFn: async (uri: string) => {
      const { tokens } = await exh.files.create(
        'application-photo',
        {
          uri,
          name: 'application-photo',
          type: 'image/png',
        }
      );
      const pictureFileToken = tokens[0].token;
      const document = await exh.data.documents.create('picture-measurement', {
        pictureFileToken,
      });
      return document.id;
    },
    onSuccess: async result => {
      console.log('Document created:', result);
    },
    onError: e => {
      console.error('An error occurred:', e);
    },
  });
  if (!permission || !exh) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Button onPress={requestPermission} title="grant permission" />
    );
  }
  async function handleTakePhoto() {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    if (!photo) return;
    uploadPhotoMutation.mutate(photo.uri);
  }
  return (
    <SafeAreaView className='flex-1 w-full h-full' edges={['top', 'bottom']}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
        <View className='flex h-full w-full items-center justify-end'>
          <TouchableOpacity className='m-20 bg-white p-0.5 rounded-full' onPress={handleTakePhoto} disabled={uploadPhotoMutation.isPending}>
            { uploadPhotoMutation.isPending ? <ActivityIndicator size={60} color='black' /> : <ApertureIcon size={60} strokeWidth={0.5} color='black' /> }
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}