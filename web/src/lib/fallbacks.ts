import type {
  ContentPage,
  HomePage,
  NotFoundPage,
  PortableBlock,
  SiteSettings,
} from './types';

let blockKey = 0;
const nextKey = () => `fb${++blockKey}`;

function span(text: string, marks: string[] = []) {
  return { _type: 'span' as const, _key: nextKey(), text, marks };
}

function block(
  children: ReturnType<typeof span>[],
  options: { style?: string; listItem?: string; level?: number } = {},
) {
  return {
    _type: 'block' as const,
    _key: nextKey(),
    style: options.style ?? 'normal',
    markDefs: [] as { _key: string; _type: string; href?: string }[],
    ...(options.listItem
      ? { listItem: options.listItem, level: options.level ?? 1 }
      : {}),
    children,
  };
}

function paragraph(...parts: ReturnType<typeof span>[]): PortableBlock {
  return block(parts);
}

export const defaultSiteSettings: SiteSettings = {
  siteName: 'Kollekta',
  tagline: 'CURATED MEDIA DELIVERY',
  footerDescription: 'Curated media delivery για επιχειρήσεις και επαγγελματίες.',
  navLinks: [
    { label: 'Λειτουργίες', href: '#features' },
    { label: 'Πώς λειτουργεί', href: '#how' },
    { label: 'Για ποιον είναι', href: '#who' },
    { label: 'Τιμές', href: '#pricing' },
  ],
  headerCtaLabel: 'Εκδήλωσε ενδιαφέρον',
  headerCtaHref: '#interest',
  productLinks: [
    { label: 'Λειτουργίες', href: '#features' },
    { label: 'Τιμές', href: '#pricing' },
    { label: 'Ασφάλεια', href: '#security' },
  ],
  companyLinks: [{ label: 'Επικοινωνία', href: '#interest' }],
  legalLinks: [
    { label: 'Όροι χρήσης', href: '/terms' },
    { label: 'Πολιτική απορρήτου', href: '/privacy' },
  ],
  copyright: '© 2026 Kollekta. Με επιφύλαξη κάθε δικαιώματος.',
  studioCredit: 'Product by Side by Side Web →',
  studioCreditHref: 'https://www.sidebysideweb.gr',
};

export const defaultHomePage: HomePage = {
  heroBadge: 'Media delivery, χωρίς το χάος του WeTransfer',
  heroTitle: 'Σταμάτα να στέλνεις τις φωτογραφίες σου έναν-έναν σε κάθε πελάτη.',
  heroDescription:
    'Ανέβασέ τες μία φορά. Κάθε πελάτης σου μπαίνει από το κινητό, βλέπει ό,τι του αναλογεί, κατεβάζει στο σωστό μέγεθος — και δεν σε ξαναρωτάει «μου το ξαναστέλνεις;»',
  heroPrimaryCta: 'Εκδήλωσε ενδιαφέρον',
  heroSecondaryCta: 'Δες τα πακέτα',
  heroTrustLine: 'Χωρίς εγκατάσταση για τους πελάτες σου. Με το δικό σου λογότυπο, όχι το δικό μας.',
  heroMockupCollection: 'Summer 2026',

  audienceEyebrow: 'Για ποιον είναι',
  audienceTitle: 'Οτιδήποτε μοιράζεσαι σε φωτογραφίες, με συγκεκριμένους ανθρώπους.',
  audienceCards: [
    {
      icon: '👗',
      title: 'Εταιρείες μόδας',
      description:
        'Χονδρεμπόριο ρούχων και αξεσουάρ που στέλνει τη φωτογράφιση κάθε σεζόν σε δεκάδες ή εκατοντάδες αγοραστές. Το αρχικό και πιο «δοκιμασμένο» use case του Kollekta.',
      footer: 'Κύριο use case',
    },
    {
      icon: '📷',
      title: 'Φωτογράφοι',
      description:
        'Παραδίδεις τις φωτογραφίες eshop ή πορτραίτου ήδη στο σωστό μέγεθος — χωρίς Photoshop πριν την παράδοση.',
    },
    {
      icon: '🔒',
      title: 'Εσωτερικό υλικό',
      description:
        'Φωτογραφικό υλικό που πρέπει να μοιραστεί μόνο με συγκεκριμένα άτομα ή τμήματα — όχι με όλη την εταιρεία.',
    },
    {
      icon: '📣',
      title: 'Social & agencies',
      description:
        'Μοιράζεσαι υλικό καμπάνιας με τον πελάτη σου ή τους creators σου, χωρίς ατελείωτα Drive links.',
    },
  ],

  problemEyebrow: 'Το πρόβλημα',
  problemTitle: 'Ξέρεις ήδη πώς πάει αυτό.',
  problemCards: [
    {
      icon: '📎',
      title: 'WeTransfer / Google Drive',
      description:
        'Links που λήγουν σε 7 μέρες. Φάκελοι που κάποιος δεν βλέπει επειδή δεν του δόθηκε σωστά το permission. Καμία ιδέα ποιος κατέβασε τι.',
    },
    {
      icon: '✉️',
      title: 'Το ατελείωτο email thread',
      description:
        '«Μπορείτε να μου ξαναστείλετε τις φωτογραφίες; Το link έληξε.» Τρεις φορές τη βδομάδα, από τρεις διαφορετικούς πελάτες, για το ίδιο υλικό.',
    },
    {
      icon: '🖼️',
      title: 'Λάθος μέγεθος αρχείου',
      description:
        'Στέλνεις την πλήρη ανάλυση (15MB/φωτό) σε κάποιον που θέλει απλά να τη βάλει στο eshop του. Ή το αντίστροφο, για εκτύπωση καταλόγου.',
    },
  ],
  beforeTitle: 'Πριν',
  beforeSteps: [
    'Φωτογράφιση έτοιμη',
    'Upload σε WeTransfer, ένα link ανά παραλήπτη',
    'Email σε κάθε πελάτη ξεχωριστά',
    'Το link λήγει σε 7 μέρες',
    '«Μου το ξαναστέλνεις;» × πολλές φορές',
    'Επανάληψη του #2–#5 σε κάθε νέα συλλογή',
  ],
  beforeFootnote: '6 βήματα, επαναλαμβανόμενα κάθε φορά',
  afterTitle: 'Με το Kollekta',
  afterSteps: [
    'Ανεβάζεις το υλικό μία φορά',
    'Δημοσίευση — όλοι ειδοποιούνται αυτόματα',
    'Κάθε παραλήπτης μπαίνει μόνος του, μόνιμα',
  ],
  afterFootnote: '3 βήματα, μία φορά — μετά λειτουργεί μόνο του',

  featuresEyebrow: 'Λειτουργικότητες',
  featuresTitle:
    'Χτισμένο για το πώς μοιράζεται πραγματικά φωτογραφικό υλικό μια επιχείρηση.',
  features: [
    {
      code: '01',
      title: 'Ομαδοποίηση παραληπτών & ελεγχόμενη ορατότητα',
      description:
        'Δεν βλέπουν όλοι οι παραλήπτες σου τα πάντα. Οργάνωσέ τους σε ομάδες/tags — πελάτες, συνεργάτες, VIP, εσωτερική ομάδα — και απόφασισε ποιο υλικό είναι ορατό σε ποια ομάδα. Το reach φαίνεται σε πραγματικό χρόνο πριν πατήσεις «Δημοσίευση».',
      visual: 'tags',
    },
    {
      code: '02',
      badge: 'Pro/Business',
      title: 'Κάθε παραλήπτης βλέπει μόνο ό,τι του αναλογεί',
      description:
        'Στη χονδρική μόδα, κάθε αγοραστής βλέπει μόνο τα προϊόντα που παρήγγειλε — ανέβασε το αρχείο παραγγελιών σε Excel και το Kollekta αντιστοιχίζει αυτόματα κάθε κωδικό. Σε άλλες χρήσεις, ο κάθε πελάτης ή συνεργάτης βλέπει μόνο τον δικό του φάκελο υλικού — όχι όλη τη βιβλιοθήκη.',
      visual: 'orders',
    },
    {
      code: '03',
      title: 'Πρόσβαση σε δευτερόλεπτα — για πελάτες, συνεργάτες ΚΑΙ creators',
      description:
        'Τηλέφωνο + μόνιμος 8-ψήφιος κωδικός. Όχι email με link που χάνεται στα spam, όχι νέος λογαριασμός με password που ξεχνιέται. Reset κωδικού με ένα κλικ, όποτε χρειαστεί.',
      visual: 'auth',
    },
    {
      code: '04',
      title: 'Αυτόματο resizing — το σωστό αρχείο για τη σωστή χρήση',
      description:
        'Κάθε φωτογραφία μετατρέπεται αυτόματα σε 4 εκδοχές: πλήρη ανάλυση για εκτύπωση, βελτιστοποιημένη για eshop/social media, και δύο ενδιάμεσες. Ιδανικό ειδικά αν είσαι φωτογράφος — παραδίδεις κατευθείαν το eshop-ready αρχείο, χωρίς Photoshop πριν το στείλεις.',
      visual: 'resize',
    },
    {
      code: '05',
      title: 'Ο χρόνος που κερδίζεις — μετρημένος σε ώρες, όχι σε αόριστη «ευκολία»',
      description:
        'Κάθε «μου το ξαναστέλνεις;» είναι ένα εύρημα αρχείου, ένα re-upload, ένα email. Με το Kollekta, αυτό το αίτημα απλά δεν φτάνει ποτέ σε σένα — ο παραλήπτης σου έχει μόνιμη πρόσβαση, 24/7.',
      visual: 'time',
    },
  ],

  statEyebrow: 'Ο χρόνος που χάνεται',
  statLabel: 'Το κόστο σε ώρες — και σε ευρώ.',
  statValue: '100+',
  statBigNumberLabel: 'εργατοώρες τον χρόνο',
  statMoneyValue: '≈ 1.500 €/έτος σε χαμένο χρόνο εργασίας',
  statDescription:
    'Τόσο ενδεικτικά κοστίζει σε μια επιχείρηση ή επαγγελματία με δεκάδες ενεργούς πελάτες η διαχείριση αιτημάτων γύρω από φωτογραφικό υλικό. Πού πάνε αυτές οι ώρες:',
  statBreakdown: [
    { label: 'Αναζήτηση & εύρεση αρχείων', hours: 35, hoursLabel: '~35ω', percentOfMax: 35 },
    { label: 'Επανάληψη αποστολής / re-upload', hours: 30, hoursLabel: '~30ω', percentOfMax: 30 },
    { label: 'Email αλληλογραφία', hours: 25, hoursLabel: '~25ω', percentOfMax: 25 },
    { label: 'Λάθος μέγεθος / διορθώσεις', hours: 15, hoursLabel: '~15ω', percentOfMax: 15 },
  ],
  statDisclaimer:
    'Ενδεικτική εκτίμηση βάσει τυπικού όγκου request σε επιχειρήσεις/επαγγελματίες με αντίστοιχο μέγεθος πελατολογίου (≈15€/ώρα) — όχι μετρημένο αποτέλεσμα συγκεκριμένου πελάτη.',

  whiteLabelEyebrow: 'Το δικό σου brand',
  whiteLabelTitle: 'Με το δικό σου λογότυπο, στο δικό σου subdomain.',
  whiteLabelDescription:
    'Ανέβασε το λογότυπο της επιχείρησής σου και προσάρμοσε τα χρώματα της σελίδας. Οι πελάτες και οι συνεργάτες σου βλέπουν τις συλλογές μέσα από το δικό σου subdomain, με τη δική σου ταυτότητα.',

  securityEyebrow: 'Ασφάλεια',
  securityTitle: 'Τα δεδομένα σου, δικά σου.',
  securityItems: [
    {
      icon: '🔐',
      title: 'Απομονωμένη υποδομή ανά πελάτη',
      description: 'Καμία διασταύρωση δεδομένων ανάμεσα σε επιχειρήσεις.',
    },
    {
      icon: '💾',
      title: 'Καθημερινά αντίγραφα ασφαλείας',
      description: 'Με δοκιμασμένη διαδικασία ανάκτησης.',
    },
    {
      icon: '📤',
      title: 'Πλήρης εξαγωγή δεδομένων',
      description: 'Όποτε το χρειαστείς — δικά σου δεδομένα, δικός σου έλεγχος.',
    },
  ],

  pricingEyebrow: 'Τιμολόγηση',
  pricingTitle: 'Απλή τιμολόγηση, χωρίς κρυφά κόστη.',
  pricingPlans: [
    {
      name: 'Basic',
      price: '300 €',
      period: '/έτος',
      billingNote: 'ή 30 €/μήνα · setup 150 € εφάπαξ',
      tagline: 'Για να ξεκινήσεις να στέλνεις το υλικό σου σωστά.',
      features: [
        { text: '10 GB χώρος' },
        { text: 'Διατήρηση πλήρους ανάλυσης: 12 μήνες' },
        { text: 'Email αποστολής με το δικό σου subdomain' },
        { text: 'Υποστήριξη email, Δευ–Παρ, SLA 24 ωρών' },
      ],
      ctaLabel: 'Επίλεξε Basic',
    },
    {
      name: 'Pro',
      price: '600 €',
      period: '/έτος',
      billingNote: 'ή 60 €/μήνα · setup 150 € εφάπαξ',
      tagline: 'Ομαδοποίηση παραληπτών και πρόσβαση βάσει παραγγελίας/φακέλου.',
      highlighted: true,
      highlightLabel: 'Δημοφιλές',
      features: [
        { text: '25 GB χώρος' },
        { text: 'Διατήρηση πλήρους ανάλυσης: 24 μήνες' },
        { text: 'Ετικέτες & ελεγχόμενη ορατότητα ανά ομάδα' },
        { text: 'Κωδικοί & φιλτράρισμα βάσει παραγγελίας' },
        { text: 'Υποστήριξη email, Δευ–Παρ, SLA 24 ωρών' },
      ],
      ctaLabel: 'Επίλεξε Pro',
    },
    {
      name: 'Business',
      price: '1.100 €',
      period: '/έτος',
      billingNote: 'ή 110 €/μήνα · setup 150 € εφάπαξ',
      tagline: 'Χωρίς όριο διατήρησης, τηλεφωνική υποστήριξη.',
      features: [
        { text: '60 GB χώρος' },
        { text: 'Διατήρηση πλήρους ανάλυσης: χωρίς όριο' },
        { text: 'Ετικέτες & ελεγχόμενη ορατότητα ανά ομάδα' },
        { text: 'Κωδικοί & φιλτράρισμα βάσει παραγγελίας' },
        { text: 'Υποστήριξη τηλέφωνο + email, SLA 24 ωρών' },
      ],
      ctaLabel: 'Επίλεξε Business',
    },
  ],

  foundingEyebrow: 'Ιδρυτικοί πελάτες',
  foundingTitle: 'Το Kollekta χτίζεται μαζί με τις πρώτες επιχειρήσεις που το εμπιστεύονται.',
  foundingDescription:
    'Δεν είμαστε ακόμα χίλιοι πελάτες — και αυτό είναι το σημείο. Οι πρώτες επιχειρήσεις που μπαίνουν διαμορφώνουν το προϊόν μαζί μας, με άμεση γραμμή επικοινωνίας μαζί μας, όχι support ticket queue.',

  contactTitle: 'Έτοιμος να σταματήσεις να στέλνεις φωτογραφίες με το χέρι;',
  contactDescription:
    'Συμπλήρωσε τα στοιχεία σου — θα επικοινωνήσουμε μαζί σου εντός 1 εργάσιμης ημέρας για να ενεργοποιήσουμε τον λογαριασμό σου.',
  contactConsentText: 'Συναινώ να επικοινωνήσετε μαζί μου σχετικά με το Kollekta. *',
  contactSuccessMessage: 'Ευχαριστούμε! Θα επικοινωνήσουμε μαζί σου σύντομα.',

  seo: {
    title: 'Kollekta — Curated Media Delivery',
    description:
      'Ανέβασέ τες μία φορά. Κάθε πελάτης σου μπαίνει από το κινητό, βλέπει ό,τι του αναλογεί, κατεβάζει στο σωστό μέγεθος — και δεν σε ξαναρωτάει «μου το ξαναστέλνεις;»',
  },
};

export const defaultNotFoundPage: NotFoundPage = {
  codeLabel: 'Σφάλμα 404',
  title: 'Αυτό το καρέ δεν βγήκε.',
  description:
    'Η σελίδα που ψάχνεις δεν υπάρχει πια, ή ο σύνδεσμος έχει κάποιο λάθος. Το υπόλοιπο φιλμ είναι εντάξει, υπόσχομαι.',
  primaryCtaLabel: 'Πίσω στην αρχική',
  primaryCtaHref: '/',
  secondaryCtaLabel: 'Επικοινωνία',
  secondaryCtaHref: '/#interest',
  seo: {
    title: 'Η σελίδα δεν βρέθηκε — Kollekta',
    noIndex: true,
  },
};

/** Kept for [slug].astro CMS fallback if needed. Primary legal pages are /terms and /privacy. */
export const defaultTermsPage: ContentPage = {
  title: 'Όροι Χρήσης',
  slug: 'terms',
  badge: 'Νομικά',
  lastUpdated: 'Οκτώβριος 2026',
  sections: [
    {
      number: '1',
      title: 'Εισαγωγή',
      body: [
        paragraph(
          span(
            'Η Kollekta (kollekta.gr) είναι υπηρεσία λογισμικού που παρέχεται από την ατομική επιχείρηση Side by Side Web (Δ. Γερονικόλος).',
          ),
        ),
      ],
    },
  ],
  seo: { title: 'Όροι Χρήσης — Kollekta' },
};
