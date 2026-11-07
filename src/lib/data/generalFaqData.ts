export interface GeneralFAQItem {
  id: number
  qEn: string
  qUr: string
  aEn: string
  aUr: string
}

export interface GeneralFAQCategory {
  id: string
  titleEn: string
  titleUr: string
  emoji: string
  color: string
  items: GeneralFAQItem[]
}

export const GENERAL_FAQ_DATA: GeneralFAQCategory[] = [
  {
    id: 'about',
    titleEn: 'About WISE Lab',
    titleUr: 'وائز لیب کے بارے میں',
    emoji: '💡',
    color: 'bg-teal/10 text-teal border-teal/20',
    items: [
      {
        id: 1,
        qEn: '1. What is WISE Lab?',
        qUr: 'وائز لیب کیا ہے؟',
        aEn: 'WISE Lab supports women-led startups and MSMEs through technology, mentorship, business development, market access and funding opportunities.',
        aUr: 'وائز لیب ٹیکنالوجی، رہنمائی (مینٹورشپ)، کاروباری ترقی، مارکیٹ تک رسائی اور فنڈنگ کے مواقع کے ذریعے خواتین کے زیرِ قیادت اسٹارٹ اپس اور چھوٹے و درمیانے درجے کے کاروباروں (MSMEs) کی مدد کرتی ہے۔',
      },
      {
        id: 2,
        qEn: '2. Who is behind WISE Lab?',
        qUr: 'وائز لیب کے پیچھے کون ہے؟',
        aEn: 'WISE Lab is funded by Ignite – National Technology Fund under the Ministry of IT and Telecommunication, and implemented by Jazz, Mobilink Bank and Change Mechanics.',
        aUr: 'وائز لیب وزارتِ آئی ٹی اور ٹیلی کام کے تحت اگنائٹ - نیشنل ٹیکنالوجی فنڈ کا فنڈ کردہ پروگرام ہے، جس پر جاز (Jazz)، موبی لنک بینک اور چینج میکینکس مل کر عمل درآمد کر رہے ہیں۔',
      },
      {
        id: 3,
        qEn: '3. What programmes does WISE Lab offer?',
        qUr: 'وائز لیب کون سے پروگرام پیش کرتا ہے؟',
        aEn: 'WISE Lab offers a Women-Led Startup Incubation track and an MSME Development track for women entrepreneurs.',
        aUr: 'وائز لیب خواتین انٹرپرینیورز کے لیے ویمن لیڈ اسٹارٹ اپ انکیوبیشن ٹریک اور مائیکرو و ایس ایم ای (MSME) ڈویلپمنٹ ٹریک پیش کرتا ہے۔',
      },
      {
        id: 4,
        qEn: '4. Is WISE Lab only for technology startups?',
        qUr: 'کیا وائز لیب صرف ٹیکنالوجی اسٹارٹ اپس کے لیے ہے؟',
        aEn: 'Technology is central to both tracks. The startup track supports technology-enabled ventures, while the MSME track helps women adopt e-commerce, digital tools and digital financial services to grow their businesses.',
        aUr: 'ٹیکنالوجی دونوں ٹریکس کا بنیادی حصہ ہے۔ اسٹارٹ اپ ٹریک ٹیکنالوجی پر مبنی کاروباروں کی مدد کرتا ہے، جبکہ مائیکرو انٹرپرینیورشپ ٹریک خواتین کو اپنے کاروبار بڑھانے کے لیے ای کامرس، ڈیجیٹل ٹولز اور ڈیجیٹل مالیاتی خدمات اپنانے میں مدد دیتا ہے۔',
      },
      {
        id: 5,
        qEn: '5. Where is WISE Lab located?',
        qUr: 'وائز لیب کہاں واقع ہے؟',
        aEn: 'WISE Lab is based in Islamabad and supports participants from across Pakistan through a hybrid model.',
        aUr: 'وائز لیب اسلام آباد میں قائم ہے اور ایک ہائبرڈ ماڈل کے ذریعے پورے پاکستان سے شرکاء کو رہنمائی اور تربیت فراہم کرتا ہے۔',
      },
    ],
  },
  {
    id: 'eligibility',
    titleEn: 'Eligibility',
    titleUr: 'اہلیت کا معیار',
    emoji: '✅',
    color: 'bg-coral/10 text-coral border-coral/20',
    items: [
      {
        id: 6,
        qEn: '6. Who can apply?',
        qUr: 'کون درخواست دے سکتا ہے؟',
        aEn: 'Women founders, co-founders, entrepreneurs and business owners from across Pakistan can apply.',
        aUr: 'پورے پاکستان سے خواتین فاؤنڈرز، کو-فاؤنڈرز، انٹرپرینیورز اور کاروباری مالکان درخواست دے سکتی ہیں۔',
      },
      {
        id: 7,
        qEn: '7. Can women from anywhere in Pakistan apply?',
        qUr: 'کیا پاکستان بھر سے کہیں سے بھی خواتین درخواست دے سکتی ہیں؟',
        aEn: 'Yes. Applications are welcomed from all regions of Pakistan.',
        aUr: 'جی ہاں۔ پاکستان کے تمام صوبوں، آزاد کشمیر، گلگت بلتستان اور اسلام آباد سے درخواستیں خوش آمدید کہی جاتی ہیں۔',
      },
      {
        id: 8,
        qEn: '8. Do I need a registered company?',
        qUr: 'کیا میرے پاس رجسٹرڈ کمپنی ہونا ضروری ہے؟',
        aEn: 'Registration requirements may vary by track and business stage. Applicants should accurately state their current registration status.',
        aUr: 'رجسٹریشن کی شرائط ٹریک اور کاروباری مرحلے کے لحاظ سے مختلف ہو سکتی ہیں۔ درخواست گزاروں کو اپنی موجودہ رجسٹریشن کی صحیح حیثیت بتانی چاہیے۔',
      },
      {
        id: 9,
        qEn: '9. Can I apply at the idea stage?',
        qUr: 'کیا میں ابتدائی آئیڈیا کی سطح پر درخواست دے سکتی ہوں؟',
        aEn: 'Yes. Women with an idea, prototype, MVP, early-stage startup or growth-ready venture may apply.',
        aUr: 'جی ہاں۔ وہ خواتین جن کے پاس نیا آئیڈیا، پروٹوٹائپ، کم از کم قابلِ عمل پروڈکٹ (MVP)، ابتدائی اسٹارٹ اپ یا ترقی کے لیے تیار کاروبار ہو، سبھی درخواست دے سکتی ہیں۔',
      },
      {
        id: 10,
        qEn: '10. Can an existing business apply?',
        qUr: 'کیا پہلے سے موجود کاروبار درخواست دے سکتا ہے؟',
        aEn: 'Yes. Existing women-led startups and MSMEs can apply to the relevant track.',
        aUr: 'جی ہاں۔ پہلے سے موجود خواتین کے زیرِ انتظام اسٹارٹ اپس اور چھوٹے کاروبار اپنے متعلقہ ٹریک کے لیے درخواست دے سکتے ہیں۔',
      },
      {
        id: 11,
        qEn: '11. Can students apply?',
        qUr: 'کیا طالبات درخواست دے سکتی ہیں؟',
        aEn: 'Yes, provided they meet the eligibility criteria and can commit to the programme.',
        aUr: 'جی ہاں، بشرطیکہ وہ اہلیت کے معیار پر پورا اترتی ہوں اور پروگرام کے لیے مطلوبہ وقت دے سکیں۔',
      },
      {
        id: 12,
        qEn: '12. Can a startup with a male co-founder apply?',
        qUr: 'کیا مرد کو-فاؤنڈر والا اسٹارٹ اپ درخواست دے سکتا ہے؟',
        aEn: 'Yes. The woman founder must hold at least 50% equity in the startup.',
        aUr: 'جی ہاں۔ لیکن اسٹارٹ اپ میں خاتون فاؤنڈر کے پاس کم از کم 50 فیصد حصص (ایکویٹی) ہونا لازمی ہے۔',
      },
      {
        id: 13,
        qEn: '13. Is there an age limit?',
        qUr: 'کیا اس میں عمر کی کوئی حد ہے؟',
        aEn: 'No. There is no age limit for the startup incubation track.',
        aUr: 'جی نہیں۔ اسٹارٹ اپ انکیوبیشن ٹریک کے لیے عمر کی کوئی حد نہیں ہے۔',
      },
      {
        id: 14,
        qEn: '14. Can I apply to both tracks?',
        qUr: 'کیا میں دونوں ٹریکس کے لیے درخواست دے سکتی ہوں؟',
        aEn: 'Apply to the track that best matches your venture and support needs. The WISE Lab team may guide you toward the more suitable track.',
        aUr: 'اس ٹریک کے لیے درخواست دیں جو آپ کے کاروبار اور ضروریات کے عین مطابق ہو۔ وائز لیب کی ٹیم آپ کو زیادہ موزوں ٹریک کی طرف رہنمائی بھی کر سکتی ہے۔',
      },
    ],
  },
  {
    id: 'support',
    titleEn: 'Programme Support',
    titleUr: 'پروگرام کی معاونت',
    emoji: '🚀',
    color: 'bg-plum/10 text-plum border-plum/20',
    items: [
      {
        id: 15,
        qEn: '15. What support will selected participants receive?',
        qUr: 'منتخب شرکاء کو کیا معاونت فراہم کی جائے گی؟',
        aEn: 'Support includes mentorship, business development, technical guidance, market access, investor readiness and ecosystem connections.',
        aUr: 'معاونت میں ون آن ون مینٹورشپ، کاروباری ترقی، تکنیکی رہنمائی، مارکیٹ تک رسائی، سرمایہ کاروں سے ملاقات کی تیاری اور متعلقہ اداروں سے رابطے شامل ہیں۔',
      },
      {
        id: 16,
        qEn: '16. How long is the Startup Incubation?',
        qUr: 'اسٹارٹ اپ انکیوبیشن کا دورانیہ کتنا ہے؟',
        aEn: 'The Startup Incubation runs for six months.',
        aUr: 'اسٹارٹ اپ انکیوبیشن چھ ماہ پر محیط ہے۔',
      },
      {
        id: 17,
        qEn: '17. Is the programme online or in person?',
        qUr: 'کیا یہ پروگرام آن لائن ہے یا ان پرسن؟',
        aEn: 'WISE Lab follows a hybrid model combining virtual and in-person activities.',
        aUr: 'وائز لیب ایک ہائبرڈ ماڈل پر عمل پیرا ہے جس میں آن لائن سیشنز اور بالمشافہ (ان پرسن) سرگرمیاں دونوں شامل ہیں۔',
      },
      {
        id: 18,
        qEn: '18. Do I need to relocate to Islamabad?',
        qUr: 'کیا مجھے اسلام آباد منتقل ہونا پڑے گا؟',
        aEn: 'No. However, selected participants may need to attend specific in-person activities in Islamabad.',
        aUr: 'جی نہیں۔ تاہم، منتخب شرکاء کو اسلام آباد میں ہونے والی مخصوص اہم ان پرسن سرگرمیوں میں شرکت کرنی ہو سکتی ہے۔',
      },
      {
        id: 19,
        qEn: '19. Does WISE Lab support mothers in business?',
        qUr: 'کیا وائز لیب کاروباری ماؤں کی مدد کرتی ہے؟',
        aEn: 'Yes. The programme includes hybrid coaching and daycare assistance during relevant activities.',
        aUr: 'جی ہاں۔ پروگرام میں ہائبرڈ کوچنگ اور مخصوص سرگرمیوں کے دوران بچوں کی ڈے کیئر کی سہولت شامل ہے۔',
      },
      {
        id: 20,
        qEn: '20. Will WISE Lab help me connect with investors?',
        qUr: 'کیا وائز لیب مجھے سرمایہ کاروں سے ملوانے میں مدد کرے گی؟',
        aEn: 'WISE Lab supports investor readiness and may facilitate introductions. Investment is not guaranteed.',
        aUr: 'وائز لیب سرمایہ کاروں کے لیے پچ ڈیک تیار کرنے اور ممکنہ تعارف کروانے میں مدد کرتی ہے۔ البتہ فنڈنگ ملنے کی کوئی پہلے سے ضمانت نہیں ہوتی۔',
      },
      {
        id: 21,
        qEn: '21. Will WISE Lab help my business access markets?',
        qUr: 'کیا وائز لیب مارکیٹ تک رسائی میں مدد دے گی؟',
        aEn: 'Yes. Support may include e-commerce guidance, corporate linkages, showcases and ecosystem referrals.',
        aUr: 'جی ہاں۔ اس میں ای کامرس پلیٹ فارمز پر شمولیت، کارپوریٹ روابط، پروڈکٹ نمائش اور متعلقہ مارکیٹ پلیسز کے ساتھ نیٹ ورکنگ شامل ہے۔',
      },
    ],
  },
  {
    id: 'cost',
    titleEn: 'Cost, Equity & Grants',
    titleUr: 'فیس، ایکویٹی اور گرانٹس',
    emoji: '💰',
    color: 'bg-amber-500/10 text-amber-700 border-amber-200',
    items: [
      {
        id: 22,
        qEn: '22. Is there a participation fee?',
        qUr: 'کیا اس میں شرکت کی کوئی فیس ہے؟',
        aEn: 'No. Participation is free for selected applicants.',
        aUr: 'جی نہیں۔ منتخب ہونے والے تمام شرکاء کے لیے یہ پروگرام بالکل مفت ہے۔',
      },
      {
        id: 23,
        qEn: '23. Does WISE Lab take equity?',
        qUr: 'کیا وائز لیب کاروبار میں حصہ (ایکویٹی) لیتی ہے؟',
        aEn: 'No. WISE Lab does not take equity in participating businesses.',
        aUr: 'جی نہیں۔ وائز لیب شرکت کرنے والے کسی بھی کاروبار میں کوئی ایکویٹی یا منافع کا حصہ نہیں لیتی ہے۔',
      },
      {
        id: 24,
        qEn: '24. Does every participant receive a grant?',
        qUr: 'کیا ہر شریک کو گرانٹ ملتی ہے؟',
        aEn: 'No. Grants are awarded to qualifying, high-performing participants based on programme criteria.',
        aUr: 'جی نہیں۔ گرانٹس پروگرام کے طے شدہ معیار کے مطابق نمایاں کارکردگی دکھانے والے اور اہل شرکاء کو میرٹ پر دی جاتی ہیں۔',
      },
      {
        id: 25,
        qEn: '25. What grants are available?',
        qUr: 'کون سی گرانٹس دستیاب ہیں؟',
        aEn: 'Up to five qualifying startups may receive up to PKR 2 million each, while up to 50 qualifying micro-entrepreneurs may receive up to PKR 500,000 each.',
        aUr: '5 بہترین اسٹارٹ اپس کو 20 لاکھ (PKR 2,000,000) روپے فی کس تک گرانٹ مل سکتی ہے، جبکہ 50 تک مائیکرو انٹرپرینیورز کو 5 لاکھ (PKR 500,000) روپے تک مالی معاونت دی جا سکتی ہے۔',
      },
      {
        id: 26,
        qEn: '26. What can the grant be used for?',
        qUr: 'گرانٹ کی رقم کس کام میں استعمال ہو سکتی ہے؟',
        aEn: 'Grant funds must be used for approved business-growth activities and will be subject to programme guidelines.',
        aUr: 'گرانٹ کے فنڈز صرف منظور شدہ کاروباری ترقی اور ضروریات کے لیے استعمال کیے جا سکتے ہیں جو پروگرام کے رہنما اصولوں کے مطابق ہوں۔',
      },
    ],
  },
  {
    id: 'application',
    titleEn: 'Application & Selection',
    titleUr: 'درخواست اور انتخاب کا طریقہ',
    emoji: '📋',
    color: 'bg-sky-500/10 text-sky-700 border-sky-200',
    items: [
      {
        id: 27,
        qEn: '27. How do I apply?',
        qUr: 'میں درخواست کیسے دوں؟',
        aEn: 'Complete and submit the relevant application form on our website at www.wiselab.org.pk.',
        aUr: 'ہماری ویب سائٹ www.wiselab.org.pk پر جائیں اور متعلقہ آن لائن درخواست فارم پر کر کے جمع کروائیں۔',
      },
      {
        id: 28,
        qEn: '28. Are Cohort 1 applications open?',
        qUr: 'کیا کوہورٹ 1 کی درخواستیں کھلی ہیں؟',
        aEn: 'No. Applications for Cohort 1 are currently closed. Stay connected with us to be the first to know when admissions open for upcoming cohorts and initiatives.',
        aUr: 'نہیں، کوہورٹ 1 کے لیے درخواستیں فی الحال بند ہو چکی ہیں۔ آنے والے کوہورٹس اور پروگرامز سے باخبر رہنے کے لیے ہمارے ساتھ جڑے رہیں۔',
      },
      {
        id: 29,
        qEn: '29. What information will I need to provide?',
        qUr: 'مجھے کون سی معلومات فراہم کرنا ہوں گی؟',
        aEn: 'You may be asked about your team, problem, solution, business stage, market, progress and support needs.',
        aUr: 'آپ سے آپ کی ٹیم، مسئلے اور حل، کاروباری مرحلے، مارکیٹ، موجودہ پیش رفت اور درکار تعاون کے بارے میں پوچھا جائے گا۔',
      },
      {
        id: 30,
        qEn: '30. Do I need a pitch deck?',
        qUr: 'کیا مجھے پچ ڈیک جمع کروانا ضروری ہے؟',
        aEn: 'Upload a pitch deck or supporting document only if requested in the application form.',
        aUr: 'پچ ڈیک یا کوئی دستاویزی ثبوت صرف تب اپ لوڈ کریں جب فارم میں اس کی مانگ کی گئی ہو۔',
      },
      {
        id: 31,
        qEn: '31. How will participants be selected?',
        qUr: 'شرکاء کا انتخاب کس طرح کیا جائے گا؟',
        aEn: 'Selection may include application screening, evaluation, interviews and pitching.',
        aUr: 'انتخاب میں درخواستوں کی اسکریننگ، ماہرین کا جائزہ، انٹرویوز اور پچنگ پینل شامل ہو سکتے ہیں۔',
      },
      {
        id: 32,
        qEn: '32. How many participants will be selected?',
        qUr: 'کتنے شرکاء کا انتخاب کیا جائے گا؟',
        aEn: 'WISE Lab will select 10 startups per cohort and train 200 women entrepreneurs annually through the MSME track.',
        aUr: 'وائز لیب ہر کوہورٹ میں 10 اسٹارٹ اپس کا انتخاب کرے گی اور مائیکرو انٹرپرینیورشپ ٹریک کے ذریعے سالانہ 200 خواتین کو تربیت دے گی۔',
      },
      {
        id: 33,
        qEn: '33. Does applying guarantee selection?',
        qUr: 'کیا درخواست دینے سے انتخاب کی ضمانت مل جاتی ہے؟',
        aEn: 'No. All applications are evaluated through a competitive selection process.',
        aUr: 'جی نہیں۔ تمام درخواستوں کا جائزہ ایک مسابقتی اور میرٹ پر مبنی انتخابی عمل کے تحت لیا جاتا ہے۔',
      },
      {
        id: 34,
        qEn: '34. How will shortlisted applicants be contacted?',
        qUr: 'شارٹ لسٹ ہونے والی امیدواروں سے کیسے رابطہ ہوگا؟',
        aEn: 'Shortlisted applicants will be contacted through the email address or phone number provided in their application.',
        aUr: 'شارٹ لسٹ ہونے والی خواتین سے ان کے فارم میں فراہم کردہ ای میل ایڈریس یا فون نمبر پر رابطہ کیا جائے گا۔',
      },
      {
        id: 35,
        qEn: '35. Can I edit my application after submitting it?',
        qUr: 'کیا جمع کروانے کے بعد درخواست میں ترمیم ہو سکتی ہے؟',
        aEn: 'Contact the WISE Lab team with your application details. Changes will be subject to feasibility.',
        aUr: 'اپنی درخواست کی تفصیلات کے ساتھ وائز لیب کی ٹیم سے رابطہ کریں۔ ممکن ہونے کی صورت میں ضروری ترمیم کر دی جائے گی۔',
      },
      {
        id: 36,
        qEn: '36. What happens if my application is incomplete?',
        qUr: 'اگر میری درخواست نامکمل ہوئی تو کیا ہوگا؟',
        aEn: 'Incomplete applications may not proceed to evaluation. Complete all required sections before the deadline.',
        aUr: 'نامکمل درخواستیں جانچ کے اگلے مرحلے پر نہیں جا سکتیں۔ اس لیے ڈیڈ لائن سے پہلے تمام ضروری خانے پر کریں۔',
      },
    ],
  },
  {
    id: 'participation',
    titleEn: 'Participation & Contact',
    titleUr: 'شرکت اور رابطہ',
    emoji: '🤝',
    color: 'bg-rose-500/10 text-rose-700 border-rose-200',
    items: [
      {
        id: 37,
        qEn: '37. What commitment is expected?',
        qUr: 'شرکاء سے کس عزم کی توقع کی جاتی ہے؟',
        aEn: 'Selected participants must attend required sessions, engage with mentors and work toward agreed business milestones.',
        aUr: 'منتخب شرکاء کو تمام ضروری سیشنز میں شرکت، مینٹورز کے ساتھ سرگرم رابطہ اور طے شدہ کاروباری سنگ میل حاصل کرنے کے لیے مسلسل محنت کرنی ہوگی۔',
      },
      {
        id: 38,
        qEn: '38. Can I participate while working or studying?',
        qUr: 'کیا میں ملازمت یا تعلیم کے ساتھ حصہ لے سکتی ہوں؟',
        aEn: "Yes, provided you can meet the programme's attendance and participation requirements.",
        aUr: 'جی ہاں، بشرطیکہ آپ پروگرام کی حاضری اور ضروری سرگرمیوں کے تقاضے پورے کر سکیں۔',
      },
      {
        id: 39,
        qEn: '39. Will I receive a certificate?',
        qUr: 'کیا مجھے سرٹیفکیٹ ملے گا؟',
        aEn: "Participants who meet the programme's completion requirements may receive a certificate.",
        aUr: 'وہ شرکاء جو پروگرام کی تمام شرائط اور حاضری کامیابی سے مکمل کریں گے انہیں سرٹیفکیٹ دیا جائے گا۔',
      },
      {
        id: 40,
        qEn: '40. Who can I contact for assistance?',
        qUr: 'رہنمائی یا مدد کے لیے کس سے رابطہ کیا جائے؟',
        aEn: 'Contact WISE Lab through Instagram @wise.labpk, our official Facebook page, or email mahnoor.fatima@changemechanics.pk.',
        aUr: 'انسٹاگرام (@wise.labpk)، ہمارے آفیشل فیس بک پیج، یا ای میل mahnoor.fatima@changemechanics.pk پر وائز لیب کی ٹیم سے رابطہ کیا جا سکتا ہے۔',
      },
    ],
  },
]

