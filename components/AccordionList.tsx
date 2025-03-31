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
      title: '¿Cómo ingreso dinero?',
      content: 'Para ingresar dinero, debes ir a la sección de ingreso, situada en la página principal y seguir las instrucciones para realizar un depósito.'
    },
    {
      title: '¿Cómo retiro dinero?',
      content: 'Para retirar dinero, debes ir a la sección de retiro, situada en la página principal y seguir las instrucciones para realizar un retiro.'
    },
    {
      title: '¿Cómo realizo una transferencia?',
      content: 'Para realizar una transferencia, selecciona la opción de transferencia, ingresa el número de cuenta y el monto a transferir.'
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
