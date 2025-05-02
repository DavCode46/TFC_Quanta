import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AccordionProps {
  title: string;
  content: string;
}

const AccordionItem = ({ title, content }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.accordionContentContainer}>
          <Text style={styles.accordionContent}>{content}</Text>
        </View>
      )}
    </View>
  );
}

const AccordionList = () => {
  const faqData = [
    {
      title: '¿Cómo creo una cuenta?',
      content: 'Para crear una cuenta en Quanta, debes de seleccionar el botón Crear cuenta situado en la página principal, a continuación debes introducir tus datos personales y seleccionar Resgistrarse'
    },
    {
      title: '¿Cómo inicio sesión?',
      content: 'Para iniciar sesión, debes de seleccionar el botón Iniciar sesión situado en la página principal, a continuación debes introducir tu correo electrónico y contraseña.'
    },
    {
      title: '¿Cómo recupero la contraseña?',
      content: 'Para restablecer tu contraseña, debes de seleccionar el enlace ¿Has olvidado tu contraseña? Restablercer situado en la página de inicio de sesión, a continuación debes de introducir tu correo electrónico, si este se encuentra en nuestros sistemas recibirás un email con los pasos a seguir. '
    },
    {
      title: '¿Cómo modifico mi perfil?',
      content: 'Para modificar tu perfil (datos personales o imagen de perfil) debes de ir a la sección perfil, botón con tus iniciales situado en la parte superior derecha de la página principal, una vez en tu página de perfil puedes modificar tu email, contraseña o imagen de perfil.'
    },
    {
      title: '¿Cómo ingreso dinero?',
      content: 'Para ingresar dinero, debes ir a la sección de ingreso, icono (+) situado en la página principal y seguir las instrucciones para realizar un depósito.'
    },
    {
      title: '¿Cómo retiro dinero?',
      content: 'Para retirar dinero, debes ir a la sección de retiro, icono (-) situado en la página principal y seguir las instrucciones para realizar un retiro.'
    },
    {
      title: '¿Cómo realizo una transferencia?',
      content: 'Para realizar una transferencia, selecciona la opción de transferencia, icono ⮂, o botón inferiorn del menú, ingresa el número de cuenta y la cantidad a transferir.'
    },
    {
      title: '¿Cómo accedo a mis movimientos?',
      content: 'Para acceder a todos tus movimientos debes de seleccionar el botón con símbolo en espiral situado en la página principal, si solo deseas ver tus últimos movimientos puedes hacerlo desde la página principal, en esta sección solo se verán tus 8 movimientos más recientes.'
    },
    {
      title: '¿Cómo accedo a la sección de cryptomonedas?',
      content: 'Para acceder a la sección de cryptomonedas debes de seleccionar el botón (crypto) situado en el menú inferior.'
    },
  ];

  return (
    <View style={styles.container}>
      {faqData.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  accordionHeader: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  accordionContentContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  accordionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AccordionList
