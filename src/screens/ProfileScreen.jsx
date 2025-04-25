import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, ActivityIndicator, ScrollView } from 'react-native';
import supabase from '../supabaseClient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

const ProfileScreen = ({ route }) => {
  const [profile, setProfile] = useState(null);
  const [client, setClient] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*, clients(*)')
          .eq('id', user.data.user.id)
          .single();
      
        if (data) {
          setProfile(data);
          setClient(data.clients);
        } else {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
      uploadImage(result);
    }
  };

  const uploadImage = async (result) => {
    setUploading(true);
    try {
      const user = await supabase.auth.getUser();
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const fileName = `${user.data.user.id}-${new Date().getTime()}.png`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';

      const { data, error } = await supabase.storage
        .from('fitsl')
        .upload(`avatars/${fileName}`, decode(base64), {
          contentType,
        });

      if (error) throw error;

      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from('fitsl')
        .getPublicUrl(`avatars/${fileName}`);

      if (urlError) throw urlError;

      const { data: updatedProfile, error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.data.user.id)
        .select();

      if (profileError) throw profileError;

      setProfile(updatedProfile[0]);

      const { data: updatedClient, error: clientError } = await supabase
        .from('clients')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.client_id)
        .select();

      if (clientError) throw clientError;
      Alert.alert('Success', 'Profile image is updated');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', 'There was an error uploading the image.');
    } finally {
      setUploading(false);
    }
  };

  if (!profile || !client) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: profile.avatar_url }} style={styles.profileImage} />
      <Text style={styles.name}>{profile.full_name}</Text>
      <Text style={styles.email}>{profile.website}</Text>
      <Text style={styles.heading}>Profile Information</Text>
      <Text style={styles.clientInfo}>Email: {client.email}</Text>
      <Text style={styles.clientInfo}>Age: {client.age}</Text>
      <Text style={styles.clientInfo}>Gender: {client.gender === 1 ? 'Male' : 'Female'}</Text>
      <Text style={styles.clientInfo}>Height: {client.height} cm</Text>
      <Text style={styles.clientInfo}>Current Weight: {client.current_weight} kg</Text>
      <Text style={styles.clientInfo}>Weight Goal: {client.weight_goal} kg</Text>
      <Text style={styles.clientInfo}>Health Issues: {client.health_issues}</Text>
      <Text style={styles.clientInfo}>Restrictions: {client.ristrictions}</Text>
      {uploading ? (
        <ActivityIndicator size="small" color="#000000" />
      ) : (
        <Button title="Upload Profile Image" onPress={pickImage} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  clientImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clientInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default ProfileScreen;
