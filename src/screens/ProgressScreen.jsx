import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Modal, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import supabase from '../supabaseClient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

const ProgressScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [client, setClient] = useState(null)
  const [uploading, setUploading] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Get the current authenticated user
      const user = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      let clientId = null
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles') // Replace with your actual profile table name
          .select('*')
          .eq('id', user.data.user.id)
          .single();
      
        clientId = profile.client_id;

      }

      // Insert the weight into the weight-data table
      const { data, error } = await supabase
        .from('weight-data')
        .insert([
          { weight: weight, client_id: clientId}
        ]);

      if (error) throw error;

      setModalVisible(false);
    } catch (error) {
      console.error('Error saving weight:', error.message);
    } finally {
      setLoading(false);
    }
  };

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
          console.log(data);
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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      uploadImage(result);
    }
  };

  const uploadImage = async (result) => {
    setUploading(true)
    try {
      const user = await supabase.auth.getUser();
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const fileName = `${user.data.user.id}-${new Date().getTime()}.png`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';



      const { data, error } = await supabase.storage
        .from('nutrisl')
        .upload(`client-images/${fileName}`, decode(base64), {
          contentType
        });

      if (error) throw error;

      const { data: {publicUrl}, error: urlError } = supabase.storage
        .from('nutrisl')
        .getPublicUrl(`client-images/${fileName}`);

      if (urlError) throw urlError;

      const {data: updatedProfile, error: profileError} = await supabase
        .from('profiles')
        .select()
        .eq('id', user.data.user.id)
        .single()

      if (profileError) throw profileError;


      setProfile(updatedProfile);


      const {data: updatedClient, error: clientError} = await supabase
        .from('clients')
        .update({ body_image1: publicUrl })
        .eq('id', updatedProfile.client_id)
        .select()

        
      if (clientError) throw clientError;
      Alert.alert('Success', 'Image uploaded');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', 'There was an error uploading the image.');
    } finally {
      setUploading(false)
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Progress</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Weight Progress</Text>
        <Button title="Record Weight" onPress={toggleModal} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Upload Body Image</Text>
        
        {uploading ? <ActivityIndicator size="small" color="#000000" /> : <Button title="Upload" onPress={pickImage} />}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  input: {
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProgressScreen;
