import ImagePicker from 'react-native-image-picker'
import Freedomen from 'react-native-freedomen';

const photoOptions = {
    title:'请选择',
    quality: 0.8,
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}; 

export default function() {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker(photoOptions, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else { 
            let upload = {
                uri: response.uri,
                type: response.type,
                name: response.fileName
            }
            Freedomen.global.api.upload(upload).then(res =>{
              resolve(res.data.data)
            })
        } 
      });
    })
    
}