import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  gu: {
    translation: {
      "brand": "વી-ટાઇલ્સ",
      "tagline": "માટીમાંથી સર્જાયેલ, ભવ્યતાનું પ્રતીક",
      "curated_by": "વિજય સોની દ્વારા ક્યુરેટ કરવામાં આવ્યું છે",
      "hero_title": "પ્રીમિયમ ફ્લોર અને વોલ ટાઇલ્સ",
      "tile_lab": "ટાઇલ લેબ - તમારો ફ્લોર ડિઝાઇન કરો",
      "materials": "ફ્લોરિંગ સામગ્રી",
      "basaltic_clay": "બેસાલ્ટિક માટી",
      "gold_mineral": "સુવર્ણ ખનિજ",
      "emerald_dust": "પન્નાની ધૂળ",
      "technical_grade": "વિજયનું ફ્લોરિંગ ગ્રેડ",
      "water_absorption": "પાણી પ્રતિરોધકતા",
      "mohs_hardness": "મોહ્સ કઠિનતા",
      "curator_title": "ક્યુરેટર વિશે",
      "warehouse_location": "વેરહાઉસ લોકેશન",
      "visit_us_desc": "મોરબીના હૃદયમાં સ્થિત અમારા પ્રીમિયમ વેરહાઉસની મુલાકાત લો. લાઈવ ડેમો અને એક્સક્લુઝિવ કલેક્શન માટે પધારો.",
      "morbi_address": "નેશનલ હાઈવે, મોરબી, ગુજરાત",
      "project_estimator": "ફ્લોરિંગ અંદાજક",
      "contact_us": "સંપર્ક કરો",
      "whatsapp_msg": "નમસ્તે વિજયભાઈ, મને મારા ઘર માટે વી-ટાઇલ્સના પ્રીમિયમ કલેક્શન વિશે વધુ જાણવામાં રસ છે.",
      "send_message": "સંદેશ મોકલો",
      "dimensions": "ફ્લોર પરિમાણો (લંબાઈ x પહોળાઈ)",
      "estimate": "અંદાજ મેળવો",
      "obsidian_mirror": "ઓબ્સિડિયન મિરર",
      "royal_gold": "રોયલ ગોલ્ડ 24K",
      "carrara_marble": "કારારા માર્બલ ફિનિશ",
      "emerald_onyx": "પન્ના ઓનિક્સ લક્ઝરી",
      "golden_portoro": "ગોલ્ડન પોર્ટોરો ફ્લોર",
    }
  },
  hi: {
    translation: {
      "brand": "वी-टाइल्स",
      "tagline": "मिट्टी से निर्मित, भव्यता का प्रतीक",
      "curated_by": "विजय सोनी द्वारा क्यूरेट किया गया",
      "hero_title": "प्रीमियम फ्लोर और वॉल टाइल्स",
      "tile_lab": "टाइल लैब - अपना फ्लोर डिजाइन करें",
      "materials": "फ्लोरिंग सामग्री",
      "basaltic_clay": "बेसाल्टिक मिट्टी",
      "gold_mineral": "स्वर्ण खनिज",
      "emerald_dust": "पन्ना की धूल",
      "technical_grade": "विजय का फ्लोरिंग ग्रेड",
      "water_absorption": "जल प्रतिरोध",
      "mohs_hardness": "मोह कठोरता",
      "curator_title": "क्यूरेटर के बारे में",
      "warehouse_location": "वेयरहाउस स्थान",
      "visit_us_desc": "मोरबी के हृदय में स्थित हमारे प्रीमियम वेयरहाउस का दौरा करें। लाइव डेमो और विशेष संग्रह के लिए पधारें।",
      "morbi_address": "नेशनल हाईवे, मोरबी, गुजरात",
      "project_estimator": "फ्लोरिंग अनुमानक",
      "contact_us": "संपर्क करें",
      "whatsapp_msg": "नमस्ते विजय भाई, मुझे अपने घर के लिए वी-टाइल्स के प्रीमियम संग्रह के बारे में अधिक जानने में रुचि है।",
      "send_message": "संदेश भेजें",
      "dimensions": "फ्लोर आयाम (लंबाई x चौड़ाई)",
      "estimate": "अनुमान प्राप्त करें",
      "obsidian_mirror": "ओब्सीडियन मिरर",
      "royal_gold": "रॉयल गोल्ड 24K",
      "carrara_marble": "कारारा मार्बल फिनिश",
      "emerald_onyx": "पन्ना गोमेद लक्जरी",
      "golden_portoro": "गोल्डन पोर्टोरो फ्लोर",
    }
  },
  en: {
    translation: {
      "brand": "V-Tiles",
      "tagline": "Crafted from Earth, a Symbol of Elegance",
      "curated_by": "Curated by Vijay Soni",
      "hero_title": "Premium Floor & Wall Tiles",
      "tile_lab": "Tile Lab - Design Your Floor",
      "materials": "Flooring Materials",
      "basaltic_clay": "Basaltic Clay",
      "gold_mineral": "Gold Mineral",
      "emerald_dust": "Emerald Dust",
      "technical_grade": "Vijay's Flooring Grade",
      "water_absorption": "Water Resistance",
      "mohs_hardness": "Mohs Hardness",
      "curator_title": "About the Curator",
      "warehouse_location": "Warehouse Location",
      "visit_us_desc": "Visit our premium warehouse located in the heart of Morbi. Explore live demos and exclusive collections.",
      "morbi_address": "National Highway, Morbi, Gujarat",
      "project_estimator": "Flooring Estimator",
      "contact_us": "Contact Us",
      "whatsapp_msg": "Hello Vijay Bhai, I am interested in knowing more about V-Tiles premium floor collection for my home.",
      "send_message": "Send Message",
      "dimensions": "Floor Dimensions (Length x Width)",
      "estimate": "Get Estimate",
      "obsidian_mirror": "Obsidian Mirror",
      "royal_gold": "Royal Gold 24K",
      "carrara_marble": "Carrara Marble Finish",
      "emerald_onyx": "Emerald Onyx Luxury",
      "golden_portoro": "Golden Portoro Floor",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "gu", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
