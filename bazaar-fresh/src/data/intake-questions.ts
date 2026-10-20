/**
 * Questions for the store owner, shown at /questions. Only things the developer
 * can't find out alone and the owner can't change later in the admin dashboard.
 * Question ids are stored with the answers, so don't rename them once answers exist.
 */

export type IntakeQuestionType = "text" | "long" | "one" | "many" | "files";

export interface IntakeOption {
  id: string;
  label: string;
}

export interface IntakeQuestion {
  id: string;
  type: IntakeQuestionType;
  label: string;
  hint?: string;
  options?: IntakeOption[];
  /** Label for an extra free-text box under a choice question. */
  note?: string;
  /** "image" limits the file picker to photos. */
  accept?: "image" | "any";
  inputMode?: "text" | "tel" | "url" | "email";
}

export interface IntakeSection {
  id: string;
  title: string;
  intro?: string;
  questions: IntakeQuestion[];
}

const yesNoUnsure: IntakeOption[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "unsure", label: "Not sure" },
];

export const intakeSections: IntakeSection[] = [
  {
    id: "demo",
    title: "The demo",
    intro: "Open the demo website on your phone and try it: add items to the cart, log in, place an order and track it.",
    questions: [
      { id: "demo_change", type: "long", label: "What should I change, add or remove?" },
      { id: "demo_screens", type: "files", accept: "image", label: "Screenshots of anything you want changed" },
    ],
  },
  {
    id: "business",
    title: "Your business",
    questions: [
      {
        id: "legal_name",
        type: "text",
        label: "What is the business's official registered name?",
        hint: "Needed for the app stores, payment providers and the domain.",
      },
      {
        id: "license",
        type: "one",
        label: "Does the business have a trade license?",
        options: [
          { id: "yes", label: "Yes" },
          { id: "progress", label: "In progress" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "brand_name",
        type: "one",
        label: "What should the website and app be called?",
        options: [
          { id: "keep", label: "Keep “Bazaar Fresh”" },
          { id: "store", label: "Use our supermarket's name" },
          { id: "new", label: "A new name" },
        ],
        note: "If it's your store's name or a new name, write it here",
      },
      {
        id: "logo",
        type: "files",
        accept: "any",
        label: "Your logo",
        hint: "The original file is best (PNG, SVG or PDF). Skip this if you don't have one.",
      },
      {
        id: "contacts",
        type: "long",
        label: "Who else should I talk to? (for example your POS/IT person or store manager)",
        hint: "Name, role and phone number",
      },
    ],
  },
  {
    id: "stores",
    title: "Stores & delivery",
    questions: [
      { id: "stores_setup", type: "long", label: "How many stores do you have, in which cities, and which ones should go online first?" },
      {
        id: "shared_stock",
        type: "one",
        label: "Do all your stores sell the same products at the same prices?",
        options: [
          { id: "same", label: "Yes, same products and prices everywhere" },
          { id: "own", label: "No, each store has its own stock and prices" },
          { id: "mixed", label: "Same prices, but each store has its own stock" },
        ],
      },
      {
        id: "speed",
        type: "one",
        label: "How fast can you really deliver an order?",
        options: [
          { id: "30min", label: "20–30 minutes" },
          { id: "1h", label: "About 1 hour" },
          { id: "3h", label: "2–3 hours" },
          { id: "sameday", label: "Same day" },
          { id: "nextday", label: "Next day" },
        ],
      },
      {
        id: "riders",
        type: "one",
        label: "Who will deliver the orders?",
        options: [
          { id: "own", label: "Our own delivery staff" },
          { id: "hire", label: "We need to hire them" },
          { id: "company", label: "A delivery company" },
          { id: "pickup", label: "Customers collect from the store" },
        ],
      },
    ],
  },
  {
    id: "products",
    title: "Products & POS",
    questions: [
      {
        id: "pos_name",
        type: "text",
        label: "What is the name of the program at your cash counter (POS)?",
        hint: "If you don't know, add a photo of its screen in the next question.",
      },
      { id: "pos_photos", type: "files", accept: "image", label: "Photos of the POS screen and a printed receipt" },
      {
        id: "pos_vendor",
        type: "text",
        label: "Who installed or supports the POS? (company name and phone)",
        hint: "I may need to ask them how to connect the website to it.",
      },
      { id: "pos_export", type: "one", label: "Can your POS export the product list to Excel or CSV?", options: yesNoUnsure },
      {
        id: "pos_stock",
        type: "one",
        label: "Does your POS keep live stock levels (it knows how many of each item are left)?",
        options: yesNoUnsure,
      },
      {
        id: "product_count",
        type: "one",
        label: "About how many products do you sell?",
        options: [
          { id: "lt500", label: "Under 500" },
          { id: "500-2000", label: "500 – 2,000" },
          { id: "2000-5000", label: "2,000 – 5,000" },
          { id: "gt5000", label: "More than 5,000" },
        ],
      },
      {
        id: "product_file",
        type: "files",
        accept: "any",
        label: "Your product list with prices",
        hint: "An Excel, CSV or PDF export from your POS, or photos of the list.",
      },
      {
        id: "weighed",
        type: "one",
        label: "How do you sell meat, fruit and vegetables?",
        options: [
          { id: "kilo", label: "By the kilo (price depends on weight)" },
          { id: "packs", label: "In fixed packs (for example a 1 kg bag)" },
          { id: "both", label: "Both" },
        ],
      },
      {
        id: "photos_have",
        type: "one",
        label: "Do you have photos of your products?",
        options: [
          { id: "most", label: "Yes, for most products" },
          { id: "some", label: "For some products" },
          { id: "none", label: "No, we need to take them" },
        ],
      },
    ],
  },
  {
    id: "payments",
    title: "Orders & payments",
    questions: [
      {
        id: "order_receive",
        type: "many",
        label: "How should new orders reach your store?",
        options: [
          { id: "app", label: "An app on the manager's phone" },
          { id: "screen", label: "A screen or tablet in the store" },
          { id: "whatsapp", label: "A WhatsApp message" },
          { id: "call", label: "A phone call or SMS" },
        ],
      },
      {
        id: "pay_methods",
        type: "many",
        label: "How should customers be able to pay?",
        options: [
          { id: "cod", label: "Cash on delivery" },
          { id: "hesabpay", label: "HesabPay" },
          { id: "mpaisa", label: "M-Paisa" },
          { id: "mymoney", label: "My Money (AWCC)" },
          { id: "bank", label: "Bank transfer" },
          { id: "card", label: "Visa / Mastercard" },
        ],
      },
      {
        id: "wallet_account",
        type: "one",
        label: "Does the business already have a merchant account with HesabPay, M-Paisa or another mobile money service?",
        options: yesNoUnsure,
        note: "Which ones?",
      },
      {
        id: "notify",
        type: "many",
        label: "How should customers get login codes and order updates?",
        options: [
          { id: "sms", label: "SMS" },
          { id: "whatsapp", label: "WhatsApp" },
          { id: "app", label: "Inside the app only" },
        ],
      },
      {
        id: "sms_provider",
        type: "one",
        label: "Do you already use a company that sends SMS messages for you?",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No, please find one for us" },
          { id: "unsure", label: "Not sure" },
        ],
        note: "Which company?",
      },
    ],
  },
  {
    id: "access",
    title: "Accounts & costs",
    intro: "These accounts should be in the business's name, so you own them. I'll help set up anything that's missing. Don't type passwords here.",
    questions: [
      {
        id: "domain",
        type: "one",
        label: "Do you own a website address (domain)?",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No, please help us buy one" },
          { id: "unsure", label: "Not sure" },
        ],
        note: "Which address, and where was it bought?",
      },
      {
        id: "business_email",
        type: "one",
        label: "Does the business have its own email address (not a personal one)?",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No, please help us set one up" },
        ],
        note: "Which address?",
      },
      {
        id: "app_accounts",
        type: "many",
        label: "Which app store developer accounts does the business have?",
        options: [
          { id: "google", label: "Google Play" },
          { id: "apple", label: "Apple App Store" },
          { id: "none", label: "None yet, please help us create them" },
        ],
      },
      {
        id: "running_costs",
        type: "one",
        label: "How will the business pay for monthly running costs (hosting, SMS messages, app store fees)?",
        options: [
          { id: "card", label: "We have an international card (Visa / Mastercard)" },
          { id: "dev", label: "The developer pays and we pay him back" },
          { id: "unsure", label: "Not sure" },
        ],
      },
    ],
  },
  {
    id: "timing",
    title: "Timing",
    questions: [
      {
        id: "launch_date",
        type: "text",
        label: "When do you want to open the website to customers?",
        hint: "For example: after Eid, or in 2 months",
      },
      {
        id: "apps_when",
        type: "one",
        label: "When do you want the Android and iPhone apps?",
        options: [
          { id: "with_web", label: "At the same time as the website" },
          { id: "after", label: "A few months after the website" },
          { id: "unsure", label: "Not sure yet" },
        ],
      },
    ],
  },
  {
    id: "other",
    title: "Anything else",
    questions: [
      { id: "other_notes", type: "long", label: "Anything else I should know?" },
      { id: "other_files", type: "files", accept: "any", label: "Any other photos or files" },
    ],
  },
];

export const intakeQuestions = intakeSections.flatMap((s) => s.questions.map((q) => ({ ...q, section: s.id })));
