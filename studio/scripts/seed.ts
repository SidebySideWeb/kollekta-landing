import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

let blockKey = 0
const nextBlockKey = () => `blk${++blockKey}`

function span(text: string, marks: string[] = []) {
  return {_type: 'span' as const, _key: nextBlockKey(), text, marks}
}

function block(
  children: ReturnType<typeof span>[],
  options: {style?: string; listItem?: string; level?: number} = {},
) {
  return {
    _type: 'block' as const,
    _key: nextBlockKey(),
    style: options.style ?? 'normal',
    markDefs: [] as {_key: string; _type: string; href?: string}[],
    ...(options.listItem ? {listItem: options.listItem, level: options.level ?? 1} : {}),
    children,
  }
}

function paragraph(...parts: ReturnType<typeof span>[]) {
  return block(parts)
}

function bullet(...parts: ReturnType<typeof span>[]) {
  return block(parts, {listItem: 'bullet'})
}

function callout(text: string) {
  return {_type: 'contentCallout' as const, _key: nextBlockKey(), text}
}

function infoGrid(items: {_key: string; title?: string; text?: string}[]) {
  return {_type: 'contentInfoGrid' as const, _key: nextBlockKey(), items}
}

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Kollekta',
  tagline: 'B2B MEDIA SUITE',
  footerDescription:
    'Η επαγγελματική πλατφόρμα διαμοιρασμού ψηφιακών συλλογών για τη σύγχρονη χονδρική μόδα.',
  navLinks: [
    {_key: 'nav-features', label: 'Λειτουργίες', href: '#features'},
    {_key: 'nav-how', label: 'Πώς λειτουργεί', href: '#how-it-works'},
    {_key: 'nav-pricing', label: 'Τιμές', href: '#pricing'},
    {_key: 'nav-contact', label: 'Επικοινωνία', href: '#contact'},
  ],
  headerCtaLabel: 'Εκδήλωσε ενδιαφέρον',
  headerCtaHref: '#contact',
  productLinks: [
    {_key: 'prod-features', label: 'Λειτουργίες', href: '#features'},
    {_key: 'prod-pricing', label: 'Τιμές', href: '#pricing'},
    {_key: 'prod-security', label: 'Ασφάλεια', href: '#how-it-works'},
  ],
  companyLinks: [{_key: 'co-contact', label: 'Επικοινωνία', href: '#contact'}],
  legalLinks: [
    {_key: 'legal-terms', label: 'Όροι χρήσης', href: '/terms'},
    {_key: 'legal-privacy', label: 'Πολιτική απορρήτου', href: '/terms#section-5'},
  ],
  copyright: '© 2026 Kollekta. Με επιφύλαξη κάθε δικαιώματος.',
  studioCredit: 'Side by Side Web Studio',
  studioCreditHref: 'https://sidebysideweb.gr',
}

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroBadge: 'B2B MEDIA SUITE ΓΙΑ ΕΠΙΧΕΙΡΗΣΕΙΣ ΧΟΝΔΡΙΚΗΣ ΜΟΔΑΣ',
  heroTitle:
    'Σταμάτα να στέλνεις τη φωτογράφιση της συλλογής έναν-έναν στους πελάτες σου.',
  heroDescription:
    'Ανέβασε τη συλλογή μία φορά. Κάθε πελάτης σου μπαίνει από το κινητό, βλέπει ό,τι του αναλογεί, κατεβάζει στο σωστό μέγεθος — και δεν σε ξαναρωτάει «μου το ξαναστέλνεις;»',
  heroPrimaryCta: 'Εκδήλωσε ενδιαφέρον',
  heroSecondaryCta: 'Δες τα πακέτα',
  heroTrustLine:
    'Χωρίς εγκατάσταση για τους πελάτες σου. Με το δικό σου λογότυπο, όχι το δικό μας.',
  heroMockupDomain: 'portal.anemone-fashion.gr',
  heroMockupCollection: 'Spring / Summer 2025',
  problemEyebrow: 'ΤΟ ΠΡΟΒΛΗΜΑ',
  problemTitle: 'Ξέρεις ήδη πώς πάει αυτό.',
  problemCards: [
    {
      _key: 'problem-1',
      icon: 'link_off',
      title: 'WeTransfer / Google Drive',
      description:
        'Links που λήγουν σε 7 μέρες. Φάκελοι στο Drive που κάποιος πελάτης δεν βλέπει επειδή δεν του δόθηκε σωστά το permission. Καμία ιδέα ποιος κατέβασε τι.',
      footer: 'Ληγμένο link 404',
      footerTone: 'rose',
    },
    {
      _key: 'problem-2',
      icon: 'mark_email_unread',
      title: 'Το ατελείωτο email thread',
      description:
        '«Καλησπέρα, μπορείτε να μου ξαναστείλετε τις φωτογραφίες της collection; Το link έληξε.» Τρεις φορές τη βδομάδα, από τρεις διαφορετικούς πελάτες, για την ίδια συλλογή.',
      footer: 'Re: FW: Φωτογραφίες',
      footerTone: 'amber',
    },
    {
      _key: 'problem-3',
      icon: 'photo_size_select_actual',
      title: 'Λάθος μέγεθος αρχείου',
      description:
        'Στέλνεις την πλήρη ανάλυση (15MB/φωτό) σε κάποιον που απλά θέλει να τη βάλει στο eshop του. Ή στέλνεις μικρή ανάλυση σε κάποιον που τη χρειάζεται για εκτύπωση καταλόγου.',
      footer: 'Μη συμβατό αρχείο',
      footerTone: 'rose',
    },
  ],
  solutionEyebrow: 'Η ΛΥΣΗ',
  solutionTitle: 'Ανεβάζεις μία φορά. Το Kollekta κάνει τα υπόλοιπα.',
  solutionSteps: [
    {
      _key: 'step-1',
      number: '01',
      title: 'Ανεβάζεις τη συλλογή',
      description:
        'Σύρε και άφησε τις φωτογραφίες. Το Kollekta φτιάχνει αυτόματα 4 εκδοχές μεγέθους για κάθε μία — εσύ δεν κάνεις τίποτα παραπάνω.',
    },
    {
      _key: 'step-2',
      number: '02',
      title: 'Οι πελάτες σου μπαίνουν με το κινητό τους',
      description:
        'Τηλέφωνο + μόνιμος κωδικός πρόσβασης. Χωρίς εγκατάσταση εφαρμογής, χωρίς νέο λογαριασμό να θυμούνται.',
    },
    {
      _key: 'step-3',
      number: '03',
      title: 'Κατεβάζουν ό,τι χρειάζονται, στο σωστό μέγεθος',
      description:
        'Επιλέγουν φωτογραφίες, διαλέγουν «για eshop» ή «για εκτύπωση», κατεβάζουν. Εσύ βλέπεις ποιος κατέβασε τι.',
    },
  ],
  featuresEyebrow: 'ΛΕΙΤΟΥΡΓΙΚΟΤΗΤΕΣ',
  featuresTitle: 'Χτισμένο για το πώς δουλεύει πραγματικά η χονδρική μόδα.',
  features: [
    {
      _key: 'feat-1',
      code: '01',
      category: 'ΟΡΑΤΟΤΗΤΑ',
      title: 'Ομαδοποίηση πελατών & ελεγχόμενη ορατότητα',
      description:
        'Δεν έχουν όλοι οι πελάτες σου πρόσβαση στις ίδιες συλλογές. Με το Kollekta κατηγοριοποιείς τους αγοραστές σου με ετικέτες (π.χ. «Χονδρική Ελλάδα», «VIP Showroom», «Εξωτερικό») και καθορίζεις με ένα κλικ ποιος βλέπει ποιον κατάλογο. Μια συλλογή μπορεί να είναι δημόσια σε όλους τους ενεργούς πελάτες ή διαθέσιμη αποκλειστικά σε συγκεκριμένους επιλεγμένους κωδικούς.',
      visual: 'tags',
    },
    {
      _key: 'feat-2',
      code: '02',
      category: 'ΠΑΡΑΓΓΕΛΙΕΣ',
      badge: 'Pro / Business',
      title: 'Κάθε πελάτης βλέπει (και κατεβάζει) τη δική του παραγγελία',
      description:
        'Αντί να ψάχνει ο πελάτης ανάμεσα σε 300 κωδικούς της σεζόν ποιους παρήγγειλε για το μαγαζί του, το Kollekta μπορεί να φιλτράρει τη συλλογή βάσει του linesheet της παραγγελίας του. Ο πελάτης βλέπει άμεσα διαθέσιμα για λήψη μόνο τα προϊόντα που αγόρασε, ενώ τα υπόλοιπα εμφανίζονται σε κατάσταση προεπισκόπησης χωρίς δυνατότητα λήψης πλήρους αρχείου.',
      visual: 'orders',
    },
    {
      _key: 'feat-3',
      code: '03',
      category: 'ΠΡΟΣΒΑΣΗ',
      title: 'Πρόσβαση σε δευτερόλεπτα — για πελάτες ΚΑΙ συνεργάτες',
      description:
        'Τέρμα τα χαμένα emails με ξεχασμένους κωδικούς και οι περίπλοκες διαδικασίες εγγραφής. Οι πελάτες χονδρικής συνδέονται απευθείας με τον αριθμό του κινητού τους τηλεφώνου και έναν μόνιμο τετραψήφιο κωδικό που παραμένει σταθερός για όλες τις σεζόν. Μπορούν επίσης να λάβουν άμεσα νέο σύνδεσμο πρόσβασης μέσω SMS ή Viber με ένα πάτημα.',
      visual: 'auth',
    },
    {
      _key: 'feat-4',
      code: '04',
      category: 'RESIZING',
      title: 'Αυτόματο resizing — το σωστό αρχείο για τη σωστή χρήση',
      description:
        'Κάθε φορά που ανεβάζεις μια φωτογραφία υψηλής ανάλυσης (RAW ή TIFF), το σύστημα δημιουργεί αυτόματα βελτιστοποιημένες εκδοχές: πλήρες αρχείο εκτύπωσης 300 DPI, συμπιεσμένο WebP για το ηλεκτρονικό κατάστημα (eshop), και ελαφριές διαστάσεις για social media και lookbook previews. Ο αγοραστής διαλέγει με διακόπτη το μέγεθος που χρειάζεται και κατεβάζει ακριβώς αυτό — ούτε byte παραπάνω.',
      visual: 'resize',
    },
    {
      _key: 'feat-5',
      code: '05',
      category: 'ΑΠΟΔΟΣΗ',
      title: 'Ο χρόνος που κερδίζεις — μετρημένος σε ώρες, όχι σε αόριστη «ευκολία»',
      description:
        'Κάθε νέα σεζόν συνοδεύεται από δεκάδες επαναλαμβανόμενα τηλεφωνήματα, χαμένα links και χειροκίνητες αποστολές αρχείων σε μεμονωμένους πελάτες. Το Kollekta εξαλείφει αυτόν τον χαμένο χρόνο: οι πελάτες εξυπηρετούνται αυτόνομα όλο το 24ωρο, βρίσκουν πάντα ενεργά τα αρχεία τους και η ομάδα σου αφιερώνει τον χρόνο της στις πωλήσεις αντί στην τεχνική υποστήριξη φωτογραφιών.',
      visual: 'none',
    },
  ],
  statEyebrow: 'Ο ΧΡΟΝΟΣ ΠΟΥ ΧΑΝΕΤΑΙ',
  statValue: '100+',
  statLabel: 'εργατοώρες τον χρόνο',
  statDescription:
    'Τόσο ενδεικτικά κοστίζει σε μια επιχείρηση χονδρικής μόδας με δεκάδες ενεργούς αγοραστές η διαχείριση αιτημάτων γύρω από φωτογραφίες συλλογής — αναζήτηση αρχείου, επανάληψη αποστολής, re-upload σε WeTransfer, ατελείωτα emails «μου το ξαναστέλνεις;». Καμία από αυτές τις ώρες δεν χρειάζεται να ξοδεύεται.',
  statDisclaimer:
    'Ενδεικτική εκτίμηση βάσει τυπικού όγκου request σε επιχειρήσεις χονδρικής μόδας με αντίστοιχο μέγεθος πελατολογίου — όχι μετρημένο αποτέλεσμα συγκεκριμένου πελάτη.',
  whiteLabelEyebrow: 'ΤΟ ΔΙΚΟ ΣΟΥ BRAND',
  whiteLabelTitle: 'Οι πελάτες σου βλέπουν εσένα. Όχι εμάς.',
  whiteLabelDescription:
    'Το δικό σου λογότυπο σε εμφανή σημεία και το δικό σου subdomain. Η αξιόπιστη, ενιαία αισθητική και τα χρώματα του Kollekta παραμένουν σταθερά — αναδεικνύοντας τις φωτογραφίες σου με την ταυτότητα της επιχείρησής σου σε πρώτο πλάνο.',
  securityEyebrow: 'ΑΣΦΑΛΕΙΑ',
  securityTitle: 'Τα δεδομένα σου, δικά σου.',
  securityItems: [
    {
      _key: 'sec-1',
      icon: 'shield',
      title: 'Απομονωμένη υποδομή ανά πελάτη',
      description: 'Καμία διασταύρωση δεδομένων ανάμεσα σε επιχειρήσεις.',
    },
    {
      _key: 'sec-2',
      icon: 'backup',
      title: 'Καθημερινά αντίγραφα ασφαλείας',
      description: 'Με δοκιμασμένη διαδικασία ανάκτησης.',
    },
    {
      _key: 'sec-3',
      icon: 'download_for_offline',
      title: 'Πλήρης εξαγωγή δεδομένων όποτε το χρειαστείς',
      description: 'Δικά σου δεδομένα, δικός σου έλεγχος.',
    },
  ],
  pricingEyebrow: 'ΤΙΜΟΛΟΓΗΣΗ',
  pricingTitle: 'Απλή τιμολόγηση, χωρίς κρυφά κόστη.',
  pricingPlans: [
    {
      _key: 'plan-basic',
      name: 'Basic',
      price: '300 €',
      period: '/έτος',
      billingNote: 'ή 30 €/μήνα · setup 150 € εφάπαξ',
      tagline: 'Για να ξεκινήσεις να στέλνεις συλλογές σωστά.',
      features: [
        {_key: 'basic-f1', text: '10 GB χώρος'},
        {_key: 'basic-f2', text: 'Διατήρηση πλήρους ανάλυσης: 12 μήνες'},
        {_key: 'basic-f3', text: 'Email αποστολής με το δικό σου subdomain'},
        {_key: 'basic-f4', text: 'Υποστήριξη email, Δευ–Παρ, SLA 24 ωρών'},
      ],
      ctaLabel: 'Επίλεξε Basic',
      highlighted: false,
    },
    {
      _key: 'plan-pro',
      name: 'Pro',
      price: '600 €',
      period: '/έτος',
      billingNote: 'ή 60 €/μήνα · setup 150 € εφάπαξ',
      tagline: 'Ομαδοποίηση πελατών και πρόσβαση βάσει παραγγελίας.',
      features: [
        {_key: 'pro-f1', text: '25 GB χώρος', emphasize: true},
        {_key: 'pro-f2', text: 'Διατήρηση πλήρους ανάλυσης: 24 μήνες'},
        {_key: 'pro-f3', text: 'Ετικέτες & ελεγχόμενη ορατότητα ανά ομάδα πελατών'},
        {_key: 'pro-f4', text: 'Κωδικοί & φιλτράρισμα βάσει παραγγελίας', soonBadge: true},
        {_key: 'pro-f5', text: 'Υποστήριξη email, Δευ–Παρ, SLA 24 ωρών'},
      ],
      ctaLabel: 'Επίλεξε Pro',
      highlighted: true,
      highlightLabel: 'Δημοφιλές',
    },
    {
      _key: 'plan-business',
      name: 'Business',
      price: '1.100 €',
      period: '/έτος',
      billingNote: 'ή 110 €/μήνα · setup 150 € εφάπαξ',
      tagline: 'Χωρίς όριο διατήρησης, τηλεφωνική υποστήριξη.',
      features: [
        {_key: 'biz-f1', text: '60 GB χώρος', emphasize: true},
        {_key: 'biz-f2', text: 'Διατήρηση πλήρους ανάλυσης: χωρίς όριο'},
        {_key: 'biz-f3', text: 'Ετικέτες & ελεγχόμενη ορατότητα ανά ομάδα πελατών'},
        {_key: 'biz-f4', text: 'Κωδικοί & φιλτράρισμα βάσει παραγγελίας', soonBadge: true},
        {_key: 'biz-f5', text: 'Υποστήριξη τηλέφωνο + email, Δευ–Παρ, SLA 24 ωρών'},
      ],
      ctaLabel: 'Επίλεξε Business',
      highlighted: false,
    },
  ],
  foundingEyebrow: 'ΙΔΡΥΤΙΚΟΙ ΠΕΛΑΤΕΣ',
  foundingTitle:
    'Το Kollekta χτίζεται μαζί με τις πρώτες επιχειρήσεις που το εμπιστεύονται.',
  foundingDescription:
    'Δεν είμαστε ακόμα χίλιοι πελάτες — και αυτό είναι το σημείο. Οι πρώτες επιχειρήσεις που μπαίνουν διαμορφώνουν το προϊόν μαζί μας, με άμεση γραμμή επικοινωνίας μαζί μας, όχι support ticket queue.',
  contactTitle: 'Έτοιμος να σταματήσεις να στέλνεις φωτογραφίες με το χέρι;',
  contactDescription:
    'Συμπλήρωσε τα στοιχεία σου — θα επικοινωνήσουμε μαζί σου εντός 1 εργάσιμης ημέρας για να ενεργοποιήσουμε τον λογαριασμό σου.',
  contactSuccessTitle: 'Ευχαριστούμε! Θα επικοινωνήσουμε μαζί σου σύντομα.',
  contactSuccessDescription:
    'Λάβαμε τα στοιχεία σου. Ένας εκπρόσωπος του Kollekta θα επικοινωνήσει εντός 1 εργάσιμης ημέρας για την ενεργοποίηση του δοκιμαστικού λογαριασμού σου.',
  seo: {
    title: 'Kollekta — B2B Media Suite για Επιχειρήσεις Χονδρικής Μόδας',
    description:
      'Ανέβασε τη συλλογή μία φορά. Κάθε πελάτης σου μπαίνει από το κινητό, βλέπει ό,τι του αναλογεί, κατεβάζει στο σωστό μέγεθος — χωρίς WeTransfer, χωρίς επαναλαμβανόμενα emails.',
  },
}

const notFoundPage = {
  _id: 'notFoundPage',
  _type: 'notFoundPage',
  badge: 'Εκτός καταλόγου',
  title: 'Η σελίδα ή η συλλογή δεν βρέθηκε.',
  description:
    'Ο σύνδεσμος που ακολουθήσατε ενδέχεται να έχει λήξει, να έχει μετακινηθεί ή η συγκεκριμένη συλλογή φωτογραφιών να μην είναι πλέον διαθέσιμη στο B2B showroom σας.',
  statusTag: 'ERR_ASSET_NOT_FOUND',
  errorCode: 'HTTP 404',
  primaryCtaLabel: 'Επιστροφή στην Αρχική',
  primaryCtaHref: '/',
  secondaryCtaLabel: 'Σύνδεση στο Showroom',
  secondaryCtaHref: '/login',
  helpLinks: [
    {
      _key: 'help-collections',
      icon: 'collections',
      title: 'Συλλογές Μόδας',
      description: 'Δείτε τα διαθέσιμα wholesale lookbooks και ψηφιακά linesheets.',
      href: '/',
    },
    {
      _key: 'help-pricing',
      icon: 'sell',
      title: 'Πακέτα & Τιμές',
      description: 'Πλάνα φιλοξενίας και διανομής για βιοτεχνίες & brand showrooms.',
      href: '/#pricing',
    },
    {
      _key: 'help-support',
      icon: 'support_agent',
      title: 'Υποστήριξη',
      description: 'Χρειάζεστε νέο link ή κωδικό πρόσβασης; Επικοινωνήστε μαζί μας.',
      href: '/#contact',
    },
  ],
  seo: {
    title: '404 — Η σελίδα δεν βρέθηκε | Kollekta',
    description:
      'Η σελίδα ή η συλλογή δεν βρέθηκε. Επιστρέψτε στην αρχική ή συνδεθείτε στο B2B showroom σας.',
  },
}

const contentPageTerms = {
  _id: 'contentPage-terms',
  _type: 'contentPage',
  title: 'Όροι Χρήσης & Πολιτική Απορρήτου',
  slug: {_type: 'slug', current: 'terms'},
  badge: 'Νομικά Έγγραφα & Συμμόρφωση',
  intro:
    'Η Kollekta αποτελεί B2B πλατφόρμα διανομής ψηφιακών αρχείων συλλογής για επιχειρήσεις χονδρικής μόδας. Εδώ περιγράφονται με διαφάνεια οι όροι συνεργασίας, η διαχείριση των δεδομένων και τα πνευματικά δικαιώματα.',
  metaChips: [
    {_key: 'chip-date', icon: 'calendar_today', text: 'Τελευταία ενημέρωση: 15 Φεβρουαρίου 2026'},
    {_key: 'chip-gdpr', icon: 'verified_user', text: 'Συμβατό με GDPR (ΕΕ 2016/679)'},
    {_key: 'chip-eu', icon: 'domain', text: 'Υποδομή εντός Ευρωπαϊκής Ένωσης'},
  ],
  tocTitle: 'Περιεχόμενα',
  dpaNoteTitle: 'Χρειάζεστε DPA;',
  dpaNoteText:
    'Υπογράφουμε Data Processing Agreement για επιχειρήσεις χονδρικής με αυξημένες απαιτήσεις συμμόρφωσης.',
  lastUpdated: '2026-02-15',
  sections: [
    {
      _key: 'sec-1',
      anchor: 'section-1',
      number: '1',
      title: 'Εισαγωγή & Ταυτότητα Υπηρεσίας',
      body: [
        paragraph(
          span('Η παρούσα ιστοσελίδα και η πλατφόρμα '),
          span('Kollekta', ['strong']),
          span(
            ' («Υπηρεσία», «Εφαρμογή») λειτουργούν ως B2B εργαλείο υποδομής ψηφιακών μέσων. Σκοπός της είναι να επιτρέπει σε κατασκευαστές, ατελιέ και εμπορικές επιχειρήσεις χονδρικής μόδας («Συνδρομητές» ή «Επιχειρήσεις») να οργανώνουν, προστατεύουν και διανέμουν φωτογραφικό υλικό συλλογών στους εξουσιοδοτημένους εμπορικούς συνεργάτες και αγοραστές τους («Πελάτες» ή «Αγοραστές»).',
          ),
        ),
        paragraph(
          span(
            'Με την πρόσβαση, εγγραφή ή χρήση της Υπηρεσίας, συμφωνείτε ότι δεσμεύεστε από τους παρόντες Όρους Χρήσης. Εάν ενεργείτε εκ μέρους νομικού προσώπου, δηλώνετε ότι διαθέτετε την απαραίτητη εξουσιοδότηση εκπροσώπησης.',
          ),
        ),
      ],
    },
    {
      _key: 'sec-2',
      anchor: 'section-2',
      number: '2',
      title: 'Λογαριασμοί, Πρόσβαση & Εξουσιοδότηση',
      body: [
        paragraph(
          span('Διαχειριστές (Admin Portal):', ['strong']),
          span(
            ' Η δημιουργία λογαριασμού διαχειριστή γίνεται αποκτόμενη μέσω εταιρικής επικύρωσης. Ο διαχειριστής είναι υπεύθυνος για τη διαφύλαξη των διαπιστευτηρίων του και για κάθε δραστηριότητα που λαμβάνει χώρα υπό τον λογαριασμό του.',
          ),
        ),
        paragraph(
          span('Πύλη Πελατών (Customer Portal):', ['strong']),
          span(
            ' Η πρόσβαση των αγοραστών χονδρικής γίνεται μέσω κινητού τηλεφώνου και μοναδικού κωδικού πρόσβασης (passcode) που εκδίδει η εκάστοτε επιχείρηση. Δεν απαιτείται δημιουργία δημόσιου λογαριασμού ούτε εγκατάσταση λογισμικού.',
          ),
        ),
        callout(
          'Η πρόσβαση σε συγκεκριμένες φωτογραφίες ή συλλογές καθορίζεται αποκλειστικά από την επιχείρηση-συνδρομητή (π.χ. βάσει τοποθετημένης παραγγελίας, ετικετών VIP κ.ο.κ.). Η Kollekta λειτουργεί ως ουδέτερος τεχνικός πάροχος.',
        ),
      ],
    },
    {
      _key: 'sec-3',
      anchor: 'section-3',
      number: '3',
      title: 'Πνευματικά Δικαιώματα & Χρήση Φωτογραφιών',
      body: [
        paragraph(
          span('Ιδιοκτησία Περιεχομένου:', ['strong']),
          span(
            ' Το σύνολο των φωτογραφιών, lookbooks, linesheets και εμπορικών σημάτων που αναρτώνται στην πλατφόρμα παραμένει στην αποκλειστική ιδιοκτησία της επιχείρησης ή των νόμιμων δικαιούχων τους. Η Kollekta ',
          ),
          span('δεν αποκτά κανένα δικαίωμα κυριότητας', ['em']),
          span(' ή εκμετάλλευσης επί των αρχείων.'),
        ),
        paragraph(
          span('Άδεια Χρήσης προς την Πλατφόρμα:', ['strong']),
          span(
            ' Παρέχετε στην Kollekta αποκλειστικά την απαραίτητη τεχνική άδεια αποθήκευσης, αυτόματου resizing (δημιουργία εκδόσεων Web, E-shop, Print) και διανομής των αρχείων προς τους δικούς σας εγκεκριμένους πελάτες.',
          ),
        ),
        paragraph(
          span('Χρήση από Αγοραστές:', ['strong']),
          span(
            ' Η λήψη εικόνων από την πύλη πελατών προορίζεται αυστηρά για την προώθηση των επίσημων συλλογών (π.χ. e-shop, social media, έντυπος κατάλογος) σύμφωνα με τους εμπορικούς όρους που ορίζει ο εκάστοτε προμηθευτής. Απαγορεύεται η αναδιανομή σε τρίτους χωρίς έγκριση.',
          ),
        ),
      ],
    },
    {
      _key: 'sec-4',
      anchor: 'section-4',
      number: '4',
      title: 'Διατήρηση Δεδομένων & Πολιτική Χωρητικότητας',
      body: [
        paragraph(
          span(
            'Κάθε συνδρομητικό πακέτο (Basic, Pro, Business) περιλαμβάνει προκαθορισμένο όριο χώρου αποθήκευσης (10 GB, 25 GB, 60+ GB) και περίοδο διατήρησης πλήρους αρχείου (RAW / High-Res):',
          ),
        ),
        bullet(
          span('Αρχειοθέτηση Πλήρους Ανάλυσης:', ['strong']),
          span(
            ' Μετά το πέρας της περιόδου διατήρησης (12 μήνες στο Basic, 24 μήνες στο Pro), τα βαριά αρχεία εκτύπωσης εκκαθαρίζονται αυτόματα για απελευθέρωση χώρου, ενώ οι εκδόσεις web και οι συλλογές παραμένουν προσβάσιμες.',
          ),
        ),
        bullet(
          span('Ειδοποίηση Εκκαθάρισης:', ['strong']),
          span(
            ' Ο συνδρομητής λαμβάνει προειδοποίηση στο Admin panel πριν από οποιαδήποτε αυτόματη διαγραφή αρχείων.',
          ),
        ),
      ],
    },
    {
      _key: 'sec-5',
      anchor: 'section-5',
      number: '5',
      title: 'Προστασία Προσωπικών Δεδομένων (GDPR)',
      body: [
        paragraph(
          span(
            'Η επεξεργασία προσωπικών δεδομένων διεξάγεται σε πλήρη συμμόρφωση με τον Γενικό Κανονισμό για την Προστασία Δεδομένων (ΕΕ 2016/679):',
          ),
        ),
        infoGrid([
          {
            _key: 'gdpr-collect',
            title: 'Ποια δεδομένα συλλέγουμε:',
            text: 'Ονοματεπώνυμο υπευθύνου, επαγγελματικό email, κινητό τηλέφωνο και IP logs πρόσβασης για λόγους ασφαλείας και rate-limiting.',
          },
          {
            _key: 'gdpr-isolation',
            title: 'Απομόνωση & Ασφάλεια:',
            text: 'Κάθε επιχείρηση διαθέτει λογικά απομονωμένη υποδομή δεδομένων. Καμία διασταύρωση δεν πραγματοποιείται μεταξύ διαφορετικών επιχειρήσεων.',
          },
        ]),
        paragraph(
          span(
            'Δεν πωλούμε, δεν εκμισθώνουμε και δεν παραχωρούμε στοιχεία επικοινωνίας πελατών σας σε διαφημιστικά δίκτυα ή τρίτους.',
          ),
        ),
      ],
    },
    {
      _key: 'sec-6',
      anchor: 'section-6',
      number: '6',
      title: 'Διαθεσιμότητα & Επίπεδο Υπηρεσιών (SLA)',
      body: [
        paragraph(
          span(
            'Στοχεύουμε σε αδιάλειπτη διαθεσιμότητα 99.9% για το Customer Portal, ώστε οι πελάτες σας να κατεβάζουν υλικό οποιαδήποτε στιγμή της ημέρας. Προγραμματισμένες συντηρήσεις εκτελούνται εκτός ωρών αιχμής κατόπιν προηγούμενης ειδοποίησης.',
          ),
        ),
        paragraph(
          span(
            'Η τεχνική υποστήριξη παρέχεται μέσω email (Δευ–Παρ, SLA απόκρισης 24 ωρών) ή τηλεφωνικά για συνδρομητές πακέτου Business.',
          ),
        ),
      ],
    },
    {
      _key: 'sec-7',
      anchor: 'section-7',
      number: '7',
      title: 'Τερματισμός & Εξαγωγή Αρχείων',
      body: [
        paragraph(
          span('Δικά σου δεδομένα, δικός σου έλεγχος:', ['strong']),
          span(
            ' Σε περίπτωση λήξης ή διακοπής της συνδρομής, παρέχεται περίοδος χάριτος 30 ημερών κατά την οποία μπορείτε να εξάγετε το σύνολο των αρχείων, φωτογραφιών και καταλόγων σας σε μορφή πλήρους συμπιεσμένου αρχείου (Batch ZIP / S3 export). Μετά το πέρας των 30 ημερών, τα δεδομένα διαγράφονται οριστικά από τους ενεργούς διακομιστές.',
          ),
        ),
      ],
    },
    {
      _key: 'sec-8',
      anchor: 'section-8',
      number: '8',
      title: 'Επικοινωνία & Νομική Υποστήριξη',
      body: [
        paragraph(
          span(
            'Για οποιοδήποτε ερώτημα σχετικά με τους Όρους Χρήσης, τα δικαιώματα GDPR ή την υπογραφή ειδικής σύμβασης επεξεργασίας δεδομένων (DPA), μπορείτε να επικοινωνήσετε μαζί μας:',
          ),
        ),
        callout(
          'Kollekta Legal & Compliance Team — Email: legal@kollekta.gr • Αθήνα, Ελλάδα',
        ),
      ],
    },
  ],
  seo: {
    title: 'Όροι Χρήσης & Πολιτική Απορρήτου — Kollekta',
    description:
      'Όροι χρήσης, πολιτική απορρήτου και GDPR για την B2B πλατφόρμα Kollekta. Διαφανής διαχείριση δεδομένων για επιχειρήσεις χονδρικής μόδας.',
  },
}

const seedDocuments = [siteSettings, homePage, notFoundPage, contentPageTerms]

async function seed() {
  const transaction = client.transaction()
  for (const doc of seedDocuments) {
    transaction.createOrReplace(doc)
  }
  await transaction.commit()

  console.log(`Seeded ${seedDocuments.length} Kollekta documents:`)
  for (const doc of seedDocuments) {
    console.log(`  ✓ ${doc._id} (${doc._type})`)
  }
}

seed()
  .then(() => {
    console.log('\nKollekta seed complete.')
  })
  .catch((error) => {
    console.error('Kollekta seed failed:', error)
    process.exit(1)
  })
