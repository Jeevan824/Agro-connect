import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    title: "Agricultural Communication Platform",
    subtitle: "Connecting Farmers & Authorities through IoT and ICT",
    description: "Real-time communication system for agricultural reports, advisories, and IoT sensor data monitoring.",
    loginAsFarmer: "Login as Farmer",
    loginAsAuthority: "Login as Authority",
    features: "Key Features",
    iotMonitoring: "IoT Sensor Monitoring",
    iotDesc: "Real-time soil moisture, temperature, and humidity tracking",
    communication: "Two-way Communication",
    commDesc: "Direct messaging between farmers and agricultural authorities",
    notifications: "Smart Notifications",
    notifDesc: "Weather updates, subsidies, and crop advisories via web and SMS",
    multilingual: "Multilingual Support",
    multiDesc: "Available in Kannada, Hindi, and English for better accessibility"
  },
  hi: {
    title: "कृषि संचार मंच",
    subtitle: "आईओटी और आईसीटी के माध्यम से किसानों और अधिकारियों को जोड़ना",
    description: "कृषि रिपोर्ट, सलाह और आईओटी सेंसर डेटा निगरानी के लिए रियल-टाइम संचार प्रणाली।",
    loginAsFarmer: "किसान लॉगिन",
    loginAsAuthority: "अधिकारी लॉगिन",
    features: "मुख्य विशेषताएं",
    iotMonitoring: "आईओटी सेंसर निगरानी",
    iotDesc: "मिट्टी की नमी, तापमान और आर्द्रता की रियल-टाइम ट्रैकिंग",
    communication: "द्विपक्षीय संचार",
    commDesc: "किसानों और कृषि अधिकारियों के बीच सीधा संदेश",
    notifications: "स्मार्ट सूचनाएं",
    notifDesc: "वेब और एसएमएस के माध्यम से मौसम अपडेट, सब्सिडी और फसल सलाह",
    multilingual: "बहुभाषी समर्थन",
    multiDesc: "बेहतर पहुंच के लिए कन्नड़, हिंदी और अंग्रेजी में उपलब्ध"
  },
  kn: {
    title: "ಕೃಷಿ ಸಂವಹನ ವೇದಿಕೆ",
    subtitle: "ಐಒಟಿ ಮತ್ತು ಐಸಿಟಿ ಮೂಲಕ ರೈತರು ಮತ್ತು ಅಧಿಕಾರಿಗಳನ್ನು ಸಂಪರ್ಕಿಸುವುದು",
    description: "ಕೃಷಿ ವರದಿಗಳು, ಸಲಹೆಗಳು ಮತ್ತು ಐಒಟಿ ಸಂವೇದಕ ಡೇಟಾ ಮೇಲ್ವಿಚಾರಣೆಗಾಗಿ ನೈಜ-ಸಮಯದ ಸಂವಹನ ವ್ಯವಸ್ಥೆ.",
    loginAsFarmer: "ರೈತ ಲಾಗಿನ್",
    loginAsAuthority: "ಅಧಿಕಾರಿ ಲಾಗಿನ್",
    features: "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    iotMonitoring: "ಐಒಟಿ ಸಂವೇದಕ ಮೇಲ್ವಿಚಾರಣೆ",
    iotDesc: "ಮಣ್ಣಿನ ತೇವಾಂಶ, ತಾಪಮಾನ ಮತ್ತು ಆರ್ದ್ರತೆಯ ನೈಜ-ಸಮಯದ ಟ್ರ್ಯಾಕಿಂಗ್",
    communication: "ದ್ವಿಮುಖ ಸಂವಹನ",
    commDesc: "ರೈತರು ಮತ್ತು ಕೃಷಿ ಅಧಿಕಾರಿಗಳ ನಡುವೆ ನೇರ ಸಂದೇಶ",
    notifications: "ಸ್ಮಾರ್ಟ್ ಅಧಿಸೂಚನೆಗಳು",
    notifDesc: "ವೆಬ್ ಮತ್ತು ಎಸ್‌ಎಂಎಸ್ ಮೂಲಕ ಹವಾಮಾನ ನವೀಕರಣಗಳು, ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಬೆಳೆ ಸಲಹೆಗಳು",
    multilingual: "ಬಹುಭಾಷಾ ಬೆಂಬಲ",
    multiDesc: "ಉತ್ತಮ ಪ್ರವೇಶಕ್ಕಾಗಿ ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಲಭ್ಯವಿದೆ"
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};