import type { Bilingual, FlagType } from "@/lib/types";

export const FLAG_LABEL: Record<FlagType, string> = {
  hidden_clause: "Hidden clause",
  unfair_charge: "Unfair charge",
  penalty: "Penalty",
  auto_renewal: "Auto-renewal",
  liability: "One-sided liability",
  other: "Watch out",
};

export const FLAG_ACTION: Record<FlagType, Bilingual> = {
  hidden_clause: {
    en: "Read this clause again before you sign.",
    hi: "साइन करने से पहले यह धारा दोबारा पढ़ें।",
  },
  unfair_charge: {
    en: "Ask for this charge to be removed or explained.",
    hi: "यह शुल्क हटाने या समझाने के लिए पूछें।",
  },
  penalty: {
    en: "Confirm the exact amount and conditions before you commit.",
    hi: "कोई प्रतिबद्धता बनाने से पहले सटीक राशि और शर्तें सुनिश्चित करें।",
  },
  auto_renewal: {
    en: "Note the renewal date and cancel in writing if you plan to leave.",
    hi: "नवीनीकरण तारीख नोट करें और छोड़ने की स्थिति में लिखित में रद्द करें।",
  },
  liability: {
    en: "This clause puts most of the risk on you. Question it before signing.",
    hi: "यह धारा ज़्यादातर जोखिम आप पर डालती है। साइन करने से पहले इसे चुनौती दें।",
  },
  other: {
    en: "Review this point carefully before you proceed.",
    hi: "आगे बढ़ने से पहले इस बिंदु को ध्यान से जांचें।",
  },
};
