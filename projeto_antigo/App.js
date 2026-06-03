import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  FlatList,
  useWindowDimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// --- DADOS DO MENU E CONTEÚDO ---
const SETTINGS_DATA = [
  { title: 'Perfil de saúde', data: ['Meu histórico de saúde'] },
  {
    title: 'Preferências do app',
    data: [
      'Personalizar monitoramento',
      'Lembretes e notificações',
      'Configurações',
      'Guatá Premium',
    ],
  },
  { title: 'Recursos', data: ['Orientações de monitoramento', 'Suporte'] },
];

const CONTENT_DATA = [
  {
    title: 'Saúde Mental',
    data: [
      {
        id: '1',
        title: 'Ansiedade e Procrastinação',
        image: require('./imagens/ansiedade_procrastinacao.jpg'),
      },
      {
        id: '2',
        title: 'O Mito do Amanhã eu Faço',
        image: require('./imagens/mito_amanha.jpg'),
      },
    ],
  },
  {
    title: 'Fortalecendo a Autoeficácia',
    data: [
      {
        id: '5',
        title: 'Aprendendo a tolerar o tédio',
        image: require('./imagens/autoeficacia.jpg'),
      },
      {
        id: '6',
        title: 'O cérebro imediatista no home Office',
        image: require('./imagens/mito_amanha.jpg'),
      },
    ],
  },
];

// --- DADOS DA ABA DE REGISTRO ---
const CALENDAR_STRIP = [
  { day: 'D', date: 17 },
  { day: 'S', date: 18 },
  { day: 'T', date: 19 },
  { day: 'Q', date: 20 },
  { day: 'Q', date: 21 },
  { day: 'S', date: 22 },
  { day: 'S', date: 23 },
];

const TRACKING_CATEGORIES = [
  {
    title: 'Carga Mental',
    color: '#E53935',
    items: [
      { id: 'b1', label: 'Leve', icon: 'check-circle' },
      { id: 'b2', label: 'Médio', icon: 'minus-circle' },
      { id: 'b3', label: 'Intenso', icon: 'close-circle' },
    ],
  },
  {
    title: 'Sentimentos',
    color: '#F57C00',
    items: [
      { id: 'f1', label: 'Oscilações', icon: 'weather-partly-cloudy' },
      { id: 'f2', label: 'Sem controle', icon: 'weather-hurricane' },
      { id: 'f3', label: 'Bem', icon: 'weather-cloudy' },
      { id: 'f4', label: 'Feliz', icon: 'emoticon-outline' },
    ],
  },
  {
    title: 'Foco e Produtividade',
    color: '#3949AB',
    items: [
      { id: 'p1', label: 'Distraído', icon: 'cloud' },
      { id: 'p2', label: 'Alta', icon: 'lightning-bolt' },
      { id: 'p3', label: 'Procrastinando', icon: 'alert' },
    ],
  },
];

// --- DADOS DA ABA PARCEIROS ---
const PARTNERS_DATA = [
  {
    id: '1',
    name: 'Elo Apoio Social Ambiental',
    role: 'ONG',
    description:
      'Programa de Aprendizagem para adolescentes e jovens entre 14 e 24 anos que buscam experiência profissional. Para empresas que querem fazer parte da solução e não apenas cumprir cotas. A Elo conecta quem precisa de uma chance a quem pode oferecê-la.',
    image: require('./imagens/elo.jpg'),
  },
  {
    id: '2',
    name: 'Camila Ferreira Mendes',
    role: 'Psicóloga Clínica',
    description:
      'Sou psicóloga clínica formada pela UFMG e pós-graduanda em Terapias Cognitivo-Comportamentais. Atuo no acompanhamento psicológico de jovens e adultos, oferecendo um espaço acolhedor, ético e humanizado para promover equilíbrio emocional e autoconhecimento.',
    image: require('./imagens/camila.jpg'),
  },
  {
    id: '3',
    name: 'Gabriel Almeida Rocha',
    role: 'Psicólogo Clínico',
    description:
      'Sou psicólogo clínico formado pela PUC-RS e pós-graduando em Terapias Cognitivo-Comportamentais. Meu trabalho é voltado ao acolhimento emocional e ao desenvolvimento da confiança e do equilíbrio mental de cada paciente.',
    image: require('./imagens/gabriel.jpg'),
  },
];

export default function App() {
  const { width } = useWindowDimensions();
  const [view, setView] = useState('cycle');
  const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);
  const [isTrackingVisible, setIsTrackingVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(20);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const colors = {
    bg: '#121212',
    card: '#1E1E1E',
    accent: '#4DB6AC',
    text: '#FFFFFF',
    textSecondary: '#888',
  };

  const toggleSymptom = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- COMPONENTES DAS ABAS ---
  const CycleView = () => (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.cycleHeader}>
        <Text style={styles.headerTitle}>GUATÁ</Text>
        <TouchableOpacity onPress={() => setIsMoreMenuVisible(true)}>
          <Ionicons name="menu-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainCircleContainer}>
        <Image
          source={require('./imagens/g.png')}
          style={[styles.logoImage, { width: Math.min(width * 0.8, 400) }]}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );

  const renderCalendarMonth = (monthName, year, daysCount) => {
    const days = Array.from({ length: daysCount }, (_, i) => i + 1);
    return (
      <View style={styles.monthContainer}>
        <Text style={styles.monthTitle}>
          {monthName} <Text style={{ color: '#666' }}>{year}</Text>
        </Text>
        <View style={styles.daysGrid}>
          {days.map((day) => (
            <View key={day} style={styles.dayBox}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const CalendarView = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.calendarHeader}>
        <View style={styles.headerLeft}>
          <Feather name="sliders" size={20} color={colors.accent} />
          <Text style={[styles.headerText, { color: colors.accent }]}>
            {' '}
            Filtrar
          </Text>
        </View>
        <MaterialCommunityIcons
          name="calendar-check"
          size={24}
          color={colors.accent}
        />
      </View>
      <ScrollView
        style={styles.calendarScroll}
        showsVerticalScrollIndicator={false}>
        {renderCalendarMonth('Janeiro', 2026, 31)}
        {renderCalendarMonth('Fevereiro', 2026, 28)}
        {renderCalendarMonth('Março', 2026, 31)}
        {renderCalendarMonth('Abril', 2026, 30)}
        {renderCalendarMonth('Maio', 2026, 31)}
        {renderCalendarMonth('Junho', 2026, 30)}
        {renderCalendarMonth('Julho', 2026, 31)}
        {renderCalendarMonth('Agosto', 2026, 30)}
        {renderCalendarMonth('Setembro', 2026, 31)}
        {renderCalendarMonth('Outubro', 2026, 30)}
        {renderCalendarMonth('Novembro', 2026, 31)}
        {renderCalendarMonth('Dezembro', 2026, 30)}
      </ScrollView>
    </View>
  );

  // === ABA PARCEIROS ===
  const PartnersView = () => {
    const partnerImageWidth = Math.min(width * 0.65, 300);
    const partnerImageHeight = partnerImageWidth * 1.25;

    return (
      <View style={styles.partnersContainer}>
        <View style={styles.partnersHeader}>
          <Text style={styles.partnersMainTitle}>
            QUEM VAI CAMINHAR AO SEU LADO
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}>
          {PARTNERS_DATA.map((partner, index) => (
            <View key={partner.id} style={styles.partnerCard}>
              {/* Header e Imagem Decorativa */}
              <View style={styles.partnerProfileWrapper}>
                <View
                  style={[
                    styles.partnerDecorationTopRight,
                    {
                      width: partnerImageWidth * 0.8,
                      height: partnerImageWidth * 0.8,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.partnerDecorationBottomLeft,
                    {
                      width: partnerImageWidth * 0.5,
                      height: partnerImageWidth * 0.5,
                    },
                  ]}
                />
                <Image
                  source={partner.image} // Alterado para receber o require() diretamente
                  style={[
                    styles.partnerImage,
                    { width: partnerImageWidth, height: partnerImageHeight },
                  ]}
                  resizeMode="cover"
                />
              </View>

              {/* Informações do Parceiro */}
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.partnerRole}>{partner.role}</Text>
              <Text style={styles.partnerDescription}>
                {partner.description}
              </Text>

              {/* Botão de Contato Integrado */}
              <TouchableOpacity
                style={styles.partnerContactBtn}
                activeOpacity={0.8}>
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={22}
                  color="white"
                />
                <Text style={styles.partnerContactBtnText}>
                  Entrar em contato
                </Text>
              </TouchableOpacity>

              {/* Divisor entre parceiros (não mostra no último) */}
              {index < PARTNERS_DATA.length - 1 && (
                <View style={styles.partnerDivider} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  // --- DENTRO DO SEU COMPONENTE APP ---

  // ... outros códigos ...

  const ContentView = () => (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <Text style={styles.searchText}>
          Busque artigos ou faça uma pergunta
        </Text>
      </View>
      {CONTENT_DATA.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver tudo {'>'}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={section.data}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              // A estrutura do cartão continua a mesma
              <View
                style={[
                  styles.contentCard,
                  { width: Math.min(width * 0.4, 200) },
                ]}>
                {/* === A MÁGICA ACONTECE AQUI === */}
                {/* Trocamos a <View style={styles.cardImage} /> por: */}
                <Image
                  source={item.image} // Usando o dado que já estava no CONTENT_DATA
                  style={styles.cardImage} // Usando o estilo que já existia
                  resizeMode="cover" // Garante que preencha o quadrado bonitinho
                />
                {/* ============================== */}

                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );

  // ... resto do código ...

  const renderMainView = () => {
    switch (view) {
      case 'cycle':
        return <CycleView />;
      case 'calendar':
        return <CalendarView />;
      case 'analysis':
        return <PartnersView />;
      case 'content':
        return <ContentView />;
      default:
        return <CycleView />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      {renderMainView()}

      {/* Tab Bar Persistente */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setView('cycle')}>
          <Ionicons
            name="home"
            size={24}
            color={view === 'cycle' ? colors.accent : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabLabel,
              view === 'cycle' && { color: colors.accent },
            ]}>
            Ciclo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setView('calendar')}>
          <Ionicons
            name="calendar"
            size={24}
            color={view === 'calendar' ? colors.accent : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabLabel,
              view === 'calendar' && { color: colors.accent },
            ]}>
            Calendário
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setIsTrackingVisible(true)}
          activeOpacity={0.8}>
          <Ionicons name="add" size={32} color="#121212" />
          <Text style={styles.plusLabel}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setView('analysis')}>
          <MaterialCommunityIcons
            name="handshake-outline"
            size={24}
            color={view === 'analysis' ? colors.accent : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabLabel,
              view === 'analysis' && { color: colors.accent },
            ]}>
            Parceiros
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setView('content')}>
          <Ionicons
            name="book-outline"
            size={24}
            color={view === 'content' ? colors.accent : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabLabel,
              view === 'content' && { color: colors.accent },
            ]}>
            Conteúdo
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL MENU DE CONFIGURAÇÕES */}
      <Modal
        visible={isMoreMenuVisible}
        animationType="slide"
        transparent={false}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
          <View style={styles.settingsTopBar}>
            <TouchableOpacity
              onPress={() => setIsMoreMenuVisible(false)}
              style={styles.closeMenuButton}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.userHeader}>
            <Text style={styles.userName}>Usuário</Text>
            <Text style={styles.userEmail}>usuario@gmail.com</Text>
          </View>
          <FlatList
            data={SETTINGS_DATA}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.settingsSection}>
                <Text style={styles.settingsSectionTitle}>{item.title}</Text>
                {item.data.map((subItem, index) => (
                  <TouchableOpacity key={index} style={styles.settingsItem}>
                    <Text style={styles.settingsItemText}>{subItem}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* MODAL REGISTRO DE SINTOMAS */}
      <Modal
        visible={isTrackingVisible}
        animationType="slide"
        transparent={false}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
          <View style={styles.trackingTopBar}>
            <TouchableOpacity onPress={() => setIsTrackingVisible(false)}>
              <Ionicons name="chevron-down" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTrackingVisible(false)}>
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateStripContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}>
              {CALENDAR_STRIP.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDate(item.date)}
                  style={[
                    styles.dateBox,
                    selectedDate === item.date && styles.dateBoxSelected,
                  ]}>
                  <Text style={styles.dateDayText}>{item.day}</Text>
                  <Text
                    style={[
                      styles.dateNumText,
                      selectedDate === item.date && { color: colors.accent },
                    ]}>
                    {item.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.customizeContainer}>
            <TouchableOpacity style={styles.customizeButton}>
              <Text style={styles.customizeText}>Customize ⇌</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {TRACKING_CATEGORIES.map((category, catIndex) => (
              <View key={catIndex} style={styles.trackingCategoryContainer}>
                <View style={styles.trackingCategoryHeader}>
                  <Text style={styles.trackingCategoryTitle}>
                    {category.title}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.learnMoreText}>Learn more {'>'}</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}>
                  {category.items.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom.id);
                    return (
                      <TouchableOpacity
                        key={symptom.id}
                        style={styles.symptomItem}
                        onPress={() => toggleSymptom(symptom.id)}
                        activeOpacity={0.7}>
                        <View
                          style={[
                            styles.symptomIconBox,
                            { borderColor: category.color },
                            isSelected && { backgroundColor: category.color },
                          ]}>
                          <MaterialCommunityIcons
                            name={symptom.icon}
                            size={40}
                            color={isSelected ? '#121212' : category.color}
                          />
                        </View>
                        <Text style={styles.symptomLabel}>{symptom.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            ))}
            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  cycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginLeft: 28,
  },

  // CONTAINER CENTRALIZADO DA LOGO
  mainCircleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },

  logoImage: { height: undefined, aspectRatio: 1, marginBottom: 10 },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: '600' },
  calendarScroll: { flex: 1 },
  monthContainer: { padding: 10 },
  monthTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 15,
  },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayBox: {
    width: '14.28%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 0.5,
    borderColor: '#121212',
  },
  dayText: { color: 'white' },

  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 85 : 70,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0,
  },
  tabItem: { alignItems: 'center', minWidth: 60, flex: 1 },
  tabLabel: { fontSize: 10, marginTop: 4, color: '#888' },
  plusButton: {
    backgroundColor: '#81D4FA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  plusLabel: {
    fontSize: 10,
    color: '#121212',
    marginTop: 2,
    fontWeight: 'bold',
  },

  /* === ESTILOS DA TELA DE PARCEIROS === */
  partnersContainer: { flex: 1 },
  partnersHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  partnersMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
  },
  partnerCard: { marginBottom: 30, alignItems: 'center', width: '100%' },
  partnerProfileWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    position: 'relative',
  },
  partnerDecorationTopRight: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: '#1E1E1E',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  partnerDecorationBottomLeft: {
    position: 'absolute',
    bottom: -20,
    left: -15,
    backgroundColor: 'rgba(77, 182, 172, 0.15)',
    borderBottomLeftRadius: 60,
    borderTopRightRadius: 20,
  },
  partnerImage: {
    backgroundColor: '#333',
    borderRadius: 20,
    borderTopRightRadius: 120,
  },
  partnerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  partnerRole: {
    fontSize: 14,
    color: '#4DB6AC',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  partnerDescription: {
    fontSize: 15,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  partnerContactBtn: {
    flexDirection: 'row',
    backgroundColor: '#25D366',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  partnerContactBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  partnerDivider: {
    width: '70%',
    height: 1,
    backgroundColor: '#333',
    marginTop: 40,
  },

  /* ESTILOS MENU LATERAL */
  settingsTopBar: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeMenuButton: { padding: 4 },
  userHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  userName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  userEmail: { color: '#aaa', fontSize: 14 },
  settingsSection: { marginTop: 20, paddingHorizontal: 20 },
  settingsSectionTitle: {
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  settingsItem: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2a2a2a',
  },
  settingsItemText: { color: '#fff', fontSize: 16 },

  /* ESTILOS DA ABA CONTENT */
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchText: { color: '#888', marginLeft: 10, flex: 1 },
  sectionContainer: { marginBottom: 25 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#4db6ac' },
  contentCard: { marginRight: 15 },
  cardImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 8,
  },
  cardText: { color: 'white', fontSize: 14 },

  /* === ESTILOS DA TELA DE REGISTRO === */
  trackingTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  dateStripContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 15,
  },
  dateBox: {
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  dateBoxSelected: { borderBottomColor: '#4DB6AC' },
  dateDayText: { color: '#888', fontSize: 12, marginBottom: 8 },
  dateNumText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  customizeContainer: { alignItems: 'center', marginVertical: 20 },
  customizeButton: {
    backgroundColor: 'rgba(77, 182, 172, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  customizeText: { color: '#4DB6AC', fontWeight: 'bold' },
  trackingCategoryContainer: { marginBottom: 30 },
  trackingCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  trackingCategoryTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  learnMoreText: { color: '#4DB6AC', fontSize: 12, marginTop: 4 },
  symptomItem: { alignItems: 'center', marginRight: 20 },
  symptomIconBox: {
    width: 85,
    height: 85,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  symptomLabel: { color: 'white', fontSize: 14, fontWeight: '500' },
});
