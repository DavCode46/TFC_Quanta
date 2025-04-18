import Colors from '@/constants/Colors'
import { generalStyles } from '@/constants/Styles'
import { useAssets } from 'expo-asset'
import { Link, Redirect } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {

  // return <Redirect href={'/(auth)/(tabs)/home'} />

  const [assets] = useAssets([require('@/assets/videos/intro.mp4')])
const videoSource = assets ? { uri: assets[0].uri }: null


  const player = useVideoPlayer(videoSource, player => {
      player.loop= true
      player.muted = true
      player.play();
  })


  return (
    <View style={styles.container}>
      {assets && (
        <VideoView
          player={player}
          style={styles.video}
          allowsFullscreen
          allowsPictureInPicture
          contentFit='cover'
          />
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.header} >Tu dinero, tu control, banca sin fronteras</Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonContainer}>
          <Link href={'/Login'} style={[generalStyles.pillButton, { backgroundColor: Colors.dark, flex: 1 }]} asChild>
            <TouchableOpacity>
              <Text style={[styles.textButton, { color: Colors.white }]}>Iniciar sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.buttonContainer}>
          <Link href={'/SignUp'} style={[generalStyles.pillButton, { backgroundColor: Colors.white, flex: 1 }]} asChild>
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
