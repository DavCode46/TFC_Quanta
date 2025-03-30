import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 18,
  },
  descriptionText: {
    fontSize: 17,
    color: Colors.gray,
    marginTop: 10
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 40,
  },
  pillButton: {
    padding: 15,
    height: 65,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: Colors.cornflowerBlue,
    fontSize: 16,
    fontWeight: '500',
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  pillButtonSm: {
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 10,
    pointerEvents: 'auto',
  },
  inputContainer: {
    marginVertical: 30,
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    top: 22,
  }
});
