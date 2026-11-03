/**
 * BotScreen Component
 * "Ask Vidhilikhit Bot" chat screen matching the exact design:
 * - Top Header: Circular antique back button, serif "Ask Vidhilikhit Bot" title, golden flourish
 * - Subtitle: "Get answers to your questions about astrology, kundali, compatibility and more."
 * - Welcome Card: Large golden-bordered Sage avatar reading manuscript with greeting speech bubble
 * - Chat Stream:
 *   - User messages: Deep forest teal bubbles with timestamp
 *   - Bot messages: Left-aligned warm parchment cards with Sage circular avatar and timestamp
 * - Interactive input bar: Paperclip attachment button, pill input capsule, and circular teal send button
 * - Fixed Vedic Bottom Navigation Bar with "Bot" as the active highlighted tab
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../assets/images';
import { fontFamily } from '../../theme/typography';
import { vw, vh, rem } from '../../theme/responsive';
import { ROUTES } from '../../navigation/navigationTypes';
import {
  IconHomeFilled,
  IconChakra,
  IconHeart,
  IconBotTab,
  IconMenuTab,
  IconPaperclip,
  IconSendPlane,
} from '../../components/common/VedicIcons';

const INITIAL_MESSAGES = [
  {
    id: 'user_1',
    sender: 'user',
    text: 'What does my birth chart say about my career?',
    time: '10:30 AM',
  },
  {
    id: 'bot_1',
    sender: 'bot',
    text:
      "Your birth chart shows a strong inclination towards creative and analytical work. Jupiter's influence supports growth through knowledge, while Mercury indicates good communication skills. A career in design, technology or research can bring success.",
    time: '10:30 AM',
  },
  {
    id: 'user_2',
    sender: 'user',
    text: 'When is a good time for marriage?',
    time: '10:31 AM',
  },
  {
    id: 'bot_2',
    sender: 'bot',
    text:
      'Based on your current planetary transits, 2027–2028 shows favorable indications for marriage. It is always best to consider a detailed analysis with your full kundali.',
    time: '10:31 AM',
  },
];

const BOT_KNOWLEDGE_BASE = [
  {
    keywords: ['career', 'job', 'work', 'profession', 'business'],
    response:
      "Your 10th House (Karma Bhava) indicates leadership and intellectual pursuits. Sun and Mercury's current alignment favors taking initiative, upskilling, and exploring high-impact roles.",
  },
  {
    keywords: ['marriage', 'relationship', 'love', 'partner', 'compatibility'],
    response:
      'Jupiter and Venus transits govern marital harmony. Performing daily Surya Namaskar and keeping your 7th house energies balanced brings auspicious alignment in partnerships.',
  },
  {
    keywords: ['finance', 'wealth', 'money', 'investment', 'dhana'],
    response:
      'Your 2nd and 11th houses reveal promising wealth accumulation over the next lunar cycle. Avoid impulsive expenditures during Rahu Kaal and focus on steady long-term investments.',
  },
  {
    keywords: ['health', 'body', 'energy', 'vitality', 'ayurveda'],
    response:
      'The planetary indicators suggest maintaining a balanced Pitta dosha. Early morning hydration and calming meditation during twilight hours will enhance your vitality.',
  },
  {
    keywords: ['dasha', 'period', 'planetary', 'transit'],
    response:
      'You are currently in an auspicious planetary sub-period that enhances wisdom and spiritual clarity. Favorable events unfold smoothly when grounded in patient effort.',
  },
];

export const BotScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  };

  const formatCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return;
    }

    const newMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: trimmed,
      time: formatCurrentTime(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Generate intelligent contextual response
    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let matchedResponse =
        'According to Vedic astrology, your planetary positions suggest staying focused on your highest purpose. Continue to cultivate mindfulness and balance across all your endeavors.';

      for (const item of BOT_KNOWLEDGE_BASE) {
        if (item.keywords.some((kw) => lower.includes(kw))) {
          matchedResponse = item.response;
          break;
        }
      }

      const botReply = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: matchedResponse,
        time: formatCurrentTime(),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);
  };

  const handleAttachment = () => {
    Alert.alert(
      'Attach Document',
      'Select a document or chart to share with Vidhilikhit Bot:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'My Kundali Chart',
          onPress: () => {
            setInputText('Please analyze my birth chart kundali positions.');
          },
        },
        {
          text: 'Matching Partner Details',
          onPress: () => {
            setInputText('Can you assess compatibility with my partner?');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={images.homeBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Soft Ambient Parchment Scrim */}
        <View style={styles.parchmentScrim} pointerEvents="none" />

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View
            style={[
              styles.mainContent,
              {
                paddingTop: Math.max(insets.top, vh(1.8)),
                paddingBottom: vh(7.4) + Math.max(insets.bottom, vh(1.2)),
              },
            ]}
          >
            {/* Top Header Bar: Circular Back Button & Title */}
            <View style={styles.headerBar}>
              <TouchableOpacity
                style={styles.backButtonCircle}
                onPress={handleBack}
                activeOpacity={0.75}
                hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Ask Vidhilikhit Bot</Text>

              {/* Top Right Corner Floral Flourish Accent */}
              <View style={styles.cornerFlourishBox}>
                <Text style={styles.flourishText}>❧</Text>
              </View>
            </View>

            {/* Subtitle description */}
            <Text style={styles.headerSubtitle}>
              Get answers to your questions about astrology, kundali, compatibility and more.
            </Text>

            {/* Scrollable Chat Area */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.chatScrollView}
              contentContainerStyle={styles.chatScrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: false })
              }
            >
              {/* Top Hero Welcome Card: Large Sage Avatar + Greeting Bubble */}
              <View style={styles.welcomeRow}>
                <View style={styles.welcomeAvatarBox}>
                  <Image
                    source={images.botSageAvatar}
                    style={styles.welcomeAvatarImage}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.welcomeBubble}>
                  <Text style={styles.welcomeTitle}>
                    Namaste, I'm Vidhilikhit Bot
                  </Text>
                  <Text style={styles.welcomeText}>
                    Ask me anything about astrology, kundali, compatibility, remedies or daily guidance.
                  </Text>
                </View>
              </View>

              {/* Messages Stream */}
              {messages.map((item) => {
                const isUser = item.sender === 'user';
                if (isUser) {
                  return (
                    <View key={item.id} style={styles.userMessageRow}>
                      <View style={styles.userBubble}>
                        <Text style={styles.userMessageText}>{item.text}</Text>
                        <Text style={styles.userTimestamp}>{item.time}</Text>
                      </View>
                    </View>
                  );
                }

                // Bot message with small Sage avatar
                return (
                  <View key={item.id} style={styles.botMessageRow}>
                    <View style={styles.botAvatarBox}>
                      <Image
                        source={images.botSageAvatar}
                        style={styles.botAvatarImage}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.botBubble}>
                      <Text style={styles.botMessageText}>{item.text}</Text>
                      <Text style={styles.botTimestamp}>{item.time}</Text>
                    </View>
                  </View>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <View style={styles.botMessageRow}>
                  <View style={styles.botAvatarBox}>
                    <Image
                      source={images.botSageAvatar}
                      style={styles.botAvatarImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={[styles.botBubble, styles.typingBubble]}>
                    <Text style={styles.typingText}>
                      Consulting the sacred Vedic scriptures...
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Bottom Input Capsule Bar */}
            <View style={styles.inputBarRow}>
              {/* Paperclip attachment capsule button */}
              <View style={styles.inputCapsule}>
                <TouchableOpacity
                  style={styles.clipButton}
                  onPress={handleAttachment}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Attach file"
                >
                  <IconPaperclip size={rem(21)} color="#6B4F35" />
                </TouchableOpacity>

                {/* Text input */}
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Ask your question..."
                  placeholderTextColor="#8C6E52"
                  returnKeyType="send"
                  onSubmitEditing={handleSendMessage}
                />
              </View>

              {/* Circular Teal Send Button */}
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Send question"
              >
                <IconSendPlane size={rem(18)} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Fixed Vedic Bottom Navigation Bar with Bot active */}
        <View
          style={[
            styles.bottomNavBar,
            { paddingBottom: Math.max(insets.bottom, vh(1)) + 2 },
          ]}
        >
          {/* Tab 1: Home */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.HOME)}
            activeOpacity={0.7}
          >
            <IconHomeFilled size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Home</Text>
          </TouchableOpacity>

          {/* Tab 2: Kundali */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.MY_KUNDALI)}
            activeOpacity={0.7}
          >
            <IconChakra size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Kundali</Text>
          </TouchableOpacity>

          {/* Tab 3: Match */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.MATCHMAKING)}
            activeOpacity={0.7}
          >
            <IconHeart size={rem(19)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>Match</Text>
          </TouchableOpacity>

          {/* Tab 4: Bot (ACTIVE) */}
          <TouchableOpacity
            style={styles.navTab}
            activeOpacity={0.9}
          >
            <View style={styles.activeNavBadge}>
              <IconBotTab size={rem(20)} color="#FFFFFF" />
            </View>
            <Text style={[styles.navTabLabel, styles.navTabLabelActive]}>
              Bot
            </Text>
          </TouchableOpacity>

          {/* Tab 5: More */}
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => navigation.navigate(ROUTES.PROFILE)}
            activeOpacity={0.7}
          >
            <IconMenuTab size={rem(21)} color="#6B4F35" />
            <Text style={styles.navTabLabel}>More</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5CD',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  parchmentScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 235, 0.05)',
  },
  keyboardContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: vw(4.5),
  },

  // ==================== HEADER BAR ====================
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(0.4),
    paddingHorizontal: vw(0.5),
  },
  backButtonCircle: {
    width: rem(42),
    height: rem(42),
    borderRadius: rem(21),
    backgroundColor: 'rgba(248, 238, 222, 0.92)',
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  backButtonText: {
    fontFamily: fontFamily.title,
    fontSize: rem(22),
    fontWeight: '700',
    color: '#26160C',
    marginTop: -2,
  },
  headerTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(24),
    fontWeight: '700',
    color: '#26160C',
    letterSpacing: 0.2,
    textAlign: 'center',
    flex: 1,
    marginLeft: -vw(2),
  },
  cornerFlourishBox: {
    width: rem(36),
    alignItems: 'flex-end',
    justifyContent: 'center',
    opacity: 0.65,
  },
  flourishText: {
    fontSize: rem(22),
    color: '#8C6636',
  },
  headerSubtitle: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.2),
    fontWeight: '500',
    color: '#6B4F35',
    lineHeight: rem(18),
    textAlign: 'center',
    paddingHorizontal: vw(3),
    marginBottom: vh(1.4),
  },

  // ==================== CHAT STREAM ====================
  chatScrollView: {
    flex: 1,
  },
  chatScrollContent: {
    paddingBottom: vh(1.8),
  },

  // Welcome Greeting Row
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vh(1.6),
  },
  welcomeAvatarBox: {
    width: rem(68),
    height: rem(68),
    borderRadius: rem(34),
    borderWidth: 2,
    borderColor: '#D4A853',
    overflow: 'hidden',
    backgroundColor: '#072427',
    marginRight: vw(3),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeAvatarImage: {
    width: '100%',
    height: '100%',
  },
  welcomeBubble: {
    flex: 1,
    backgroundColor: 'rgba(252, 246, 235, 0.94)',
    borderRadius: rem(15),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.4),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  welcomeTitle: {
    fontFamily: fontFamily.title,
    fontSize: rem(14.8),
    fontWeight: '700',
    color: '#26160C',
    marginBottom: 4,
  },
  welcomeText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.5),
    fontWeight: '500',
    color: '#5C3E25',
    lineHeight: rem(16.5),
  },

  // User Message (Right Aligned Dark Teal Bubble)
  userMessageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: vh(1.4),
  },
  userBubble: {
    maxWidth: '82%',
    backgroundColor: '#082E32',
    borderRadius: rem(12),
    borderTopRightRadius: rem(2),
    borderWidth: 1,
    borderColor: 'rgba(212, 168, 83, 0.35)',
    paddingHorizontal: vw(3.8),
    paddingVertical: vh(1.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
  userMessageText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13),
    color: '#F8EFE3',
    lineHeight: rem(17.5),
  },
  userTimestamp: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(10.2),
    color: '#8EAFAF',
    textAlign: 'right',
    marginTop: 4,
  },

  // Bot Message (Left Aligned Light Parchment Bubble with Avatar)
  botMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vh(1.4),
  },
  botAvatarBox: {
    width: rem(34),
    height: rem(34),
    borderRadius: rem(17),
    borderWidth: 1.5,
    borderColor: '#D4A853',
    overflow: 'hidden',
    backgroundColor: '#072427',
    marginRight: vw(2.2),
    marginTop: 2,
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  botAvatarImage: {
    width: '100%',
    height: '100%',
  },
  botBubble: {
    flex: 1,
    backgroundColor: 'rgba(252, 246, 235, 0.95)',
    borderRadius: rem(14),
    borderTopLeftRadius: rem(2),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.45)',
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1.2),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  botMessageText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12.6),
    color: '#26160C',
    lineHeight: rem(17),
  },
  botTimestamp: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(10.2),
    color: '#8C6E52',
    textAlign: 'right',
    marginTop: 4,
  },
  typingBubble: {
    paddingVertical: vh(1),
  },
  typingText: {
    fontFamily: fontFamily.subtitle,
    fontSize: rem(12),
    fontStyle: 'italic',
    color: '#7A5E48',
  },

  // ==================== BOTTOM INPUT CAPSULE BAR ====================
  inputBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(0.8),
  },
  inputCapsule: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 246, 235, 0.95)',
    borderRadius: rem(24),
    borderWidth: 1.2,
    borderColor: 'rgba(212, 168, 83, 0.55)',
    paddingHorizontal: vw(3),
    height: rem(46),
    marginRight: vw(2.5),
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  clipButton: {
    paddingRight: vw(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamily.subtitle,
    fontSize: rem(13.2),
    color: '#26160C',
    paddingVertical: 0,
  },
  sendButton: {
    width: rem(44),
    height: rem(44),
    borderRadius: rem(22),
    backgroundColor: '#083236',
    borderWidth: 1,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#083236',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  // ==================== BOTTOM NAVIGATION BAR ====================
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: vh(7.4),
    minHeight: rem(56),
    backgroundColor: 'rgba(247, 237, 222, 0.96)',
    borderTopWidth: 1.2,
    borderTopColor: 'rgba(212, 168, 83, 0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#26160C',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeNavBadge: {
    width: rem(30),
    height: rem(30),
    borderRadius: rem(15),
    backgroundColor: '#083236',
    borderWidth: 1,
    borderColor: '#D4A853',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  navTabLabel: {
    fontFamily: fontFamily.bold,
    fontSize: rem(11),
    fontWeight: '600',
    color: '#6B4F35',
    marginTop: 2,
  },
  navTabLabelActive: {
    color: '#083236',
    fontWeight: '700',
  },
});

export default BotScreen;
