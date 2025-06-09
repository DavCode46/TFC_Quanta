import env from '@/app/config/envConfig';
import { useAuth } from '@/app/context/AuthContext';
import Colors from '@/constants/Colors';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FAQ = { question: string; answer: string };
type Message = { sender: 'user' | 'bot'; text: string };

const AssistantScreen = () => {
  const [faqList, setFaqList] = useState<FAQ[]>([]);
  const [chat, setChat] = useState<Message[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [botTyping, setBotTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { user, reloadFlag } = useAuth();
  const insets = useSafeAreaInsets();

  const faqPages = faqList.slice(1);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${env.API_URL}/faq`);
        setFaqList(res.data);
      } catch (error: any) {
        console.error('Error al cargar las FAQs:', error.message);
        alert('Error cargando FAQs');
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchFaqs();
    else setLoading(false);
  }, [user, reloadFlag]);

  const handleQuestion = (faq: FAQ, idx: number) => {
    setChat(prev => [...prev, { sender: 'user', text: faq.question }]);
    if (idx === 0) setChatStarted(true);
    setBotTyping(true);

    setTimeout(() => {
      setChat(prev => [...prev, { sender: 'bot', text: faq.answer }]);
      setBotTyping(false);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1000);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2196F3" />;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.chatContainer,
          { paddingBottom: insets.bottom  + 200, paddingTop: insets.top + 100},
        ]}
        showsVerticalScrollIndicator={false}
      >
        {chat.map((msg, i) => (
          <View
            key={i}
            style={[styles.message, msg.sender === 'user' ? styles.user : styles.bot]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
        {botTyping && (
          <View style={[styles.message, styles.bot]}>
            <Text style={[styles.messageText, { fontStyle: 'italic', color: '#888' }]}>
              El asistente está escribiendo...
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.controlsWrapper, { bottom: insets.bottom + 45 }]}>
        {!chatStarted ? (
          faqList[0] && (
            <TouchableOpacity
              onPress={() => handleQuestion(faqList[0], 0)}
              style={styles.startButton}
            >
              <Text style={styles.faqText}>{faqList[0].question}</Text>
            </TouchableOpacity>
          )
        ) : (
          <>
            <TouchableOpacity
              disabled={pageIndex === 0}
              onPress={() => setPageIndex(pageIndex - 1)}
              style={[styles.arrowButton, pageIndex === 0 && styles.disabledArrow]}
            >
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>

            {faqPages[pageIndex] && (
              <TouchableOpacity
                onPress={() => handleQuestion(faqPages[pageIndex], pageIndex + 1)}
                style={styles.faqButton}
              >
                <Text style={styles.faqText}>{faqPages[pageIndex].question}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              disabled={pageIndex === faqPages.length - 1}
              onPress={() => setPageIndex(pageIndex + 1)}
              style={[
                styles.arrowButton,
                pageIndex === faqPages.length - 1 && styles.disabledArrow,
              ]}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default AssistantScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  chatContainer: { padding: 16 },
  message: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 18,
    maxWidth: '75%',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  user: {
    backgroundColor: '#c8f2c8',
    alignSelf: 'flex-end'
  },
  bot: {
    backgroundColor: Colors.white,
     alignSelf: 'flex-start'
    },
  messageText: {
    fontSize: 16,
    color: '#333'
  },

  controlsWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    zIndex: 10,
  },
  startButton: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.royalBlue,
  },
  arrowButton: {
    padding: 12,
  },
  disabledArrow: {
    opacity: 0.3,
  },
  arrowText: {
    fontSize: 24,
    color: Colors.royalBlue,
  },
  faqButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.royalBlue,
  },
  faqText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
  },
});
