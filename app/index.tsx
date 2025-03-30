import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')])
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }} style={styles.video}
        />
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.header} >Tu dinero, tu control, banca sin fronteras</Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonContainer}>
          <Link href={'/login'} style={[generalStyles.pillButton, { backgroundColor: Colors.dark, flex: 1 }]} asChild>
            <TouchableOpacity>
              <Text style={[styles.textButton, { color: Colors.white }]}>Iniciar sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.buttonContainer}>
          <Link href={'/signup'} style={[generalStyles.pillButton, { backgroundColor: Colors.white, flex: 1 }]} asChild>
            <TouchableOpacity>
              <Text style={styles.textButton}>Crear cuenta</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerContainer: {
    marginTop: 80,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: Colors.white,
  },
  textButton: {
    fontSize: 20,
    fontWeight: '400',
  },
  buttonsWrapper: {
    marginBottom: 60,
    paddingHorizontal: 15,
    gap: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  }

})

export default index
