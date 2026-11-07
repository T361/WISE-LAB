export interface BootcampFAQItem {
  id: number
  qEn: string
  qUr: string
  aEn: string
  aUr: string
}

export interface BootcampFAQCategory {
  id: string
  titleEn: string
  titleUr: string
  emoji: string
  color: string
  items: BootcampFAQItem[]
}

export const BOOTCAMP_FAQ_DATA: BootcampFAQCategory[] = [
  {
    id: 'about',
    titleEn: 'About the Bootcamp',
    titleUr: 'بوٹ کیمپ کے بارے میں',
    emoji: '💡',
    color: 'bg-amber-500/10 text-amber-700 border-amber-200',
    items: [
      {
        id: 1,
        qEn: '1. What is the WISE Lab Bootcamp?',
        qUr: 'وائز لیب بوٹ کیمپ کیا ہے؟',
        aEn: 'It is a free, one-month, in-person training for women who run a small business or want to start one. You learn how to plan, price, sell, keep accounts, use your phone for business and prepare a business plan.',
        aUr: 'یہ ایک ماہ کی مفت تربیت ہے جو ان خواتین کے لیے ہے جو چھوٹا کاروبار چلاتی ہیں یا شروع کرنا چاہتی ہیں۔ اس میں آپ کاروبار کی منصوبہ بندی، قیمت طے کرنا، سامان بیچنا، حساب رکھنا، فون کو کاروبار کے لیے استعمال کرنا اور کاروباری منصوبہ بنانا سیکھیں گی۔',
      },
      {
        id: 2,
        qEn: '2. Do I have to pay anything?',
        qUr: 'کیا مجھے کوئی فیس دینی ہوگی؟',
        aEn: 'No. Applying is free and the training is free. Nobody from WISE Lab will ever ask you for money to apply, to be selected or to receive financing.',
        aUr: 'جی نہیں۔ درخواست دینا بھی مفت ہے اور تربیت بھی مفت ہے۔ وائز لیب کی طرف سے کوئی بھی آپ سے درخواست، انتخاب یا مالی معاونت کے لیے پیسے نہیں مانگے گا۔',
      },
      {
        id: 3,
        qEn: '3. Who runs the Bootcamp?',
        qUr: 'یہ بوٹ کیمپ کون چلا رہا ہے؟',
        aEn: 'The Bootcamp is part of WISE Lab, a programme funded by Ignite and led by Jazz. Change Mechanics is the implementation partner for WISE Lab, and Humkaar delivers the training. Business financing after the Bootcamp comes through Mobilink Bank.',
        aUr: 'یہ بوٹ کیمپ وائز لیب پروگرام کا حصہ ہے، جس کی مالی معاونت اگنائٹ (Ignite) نے کی ہے اور قیادت جاز (Jazz) کر رہا ہے۔ چینج میکینکس وائز لیب کا عمل درآمدی شراکت دار ہے، اور ہم کار یہ تربیت فراہم کر رہا ہے۔ بوٹ کیمپ کے بعد کاروباری مالی معاونت موبی لنک بینک کے ذریعے دی جائے گی۔',
      },
    ],
  },
  {
    id: 'eligibility',
    titleEn: 'Who can apply',
    titleUr: 'کون درخواست دے سکتا ہے؟',
    emoji: '👥',
    color: 'bg-teal/10 text-teal border-teal/20',
    items: [
      {
        id: 4,
        qEn: '4. Who can apply?',
        qUr: 'کون درخواست دے سکتا ہے؟',
        aEn: 'Women aged 18 to 50 who already run a small business, or who have a business idea they want to start. The training is in person, so choose a training city you can reach every day.',
        aUr: '18 سے 50 سال کی وہ خواتین جو پہلے سے کوئی چھوٹا کاروبار چلا رہی ہیں، یا جن کے پاس کوئی کاروباری آئیڈیا ہے جسے وہ شروع کرنا چاہتی ہیں۔ چونکہ تربیت میں خود حاضر ہونا ضروری ہے، اس لیے وہ شہر منتخب کریں جہاں آپ روزانہ پہنچ سکیں۔',
      },
      {
        id: 5,
        qEn: '5. I have not started my business yet. Can I still apply?',
        qUr: 'میں نے ابھی کاروبار شروع نہیں کیا، کیا میں پھر بھی درخواست دے سکتی ہوں؟',
        aEn: 'Yes. In Q15a choose "I have a business idea but have not started yet". Answer the business questions about the business you plan to start, and write the name you are thinking of in Q14.',
        aUr: 'جی ہاں۔ سوال 15a میں "میرے پاس کاروبار کا آئیڈیا ہے لیکن ابھی شروع نہیں کیا" منتخب کریں۔ فارم میں کاروباری سوالات کے جواب اس کاروبار کے بارے میں دیں جو آپ شروع کرنا چاہتی ہیں، اور سوال 14 میں وہ نام لکھیں جو آپ نے سوچا ہے۔',
      },
      {
        id: 6,
        qEn: '6. My business is not registered. Can I apply?',
        qUr: 'میرا کاروبار رجسٹرڈ نہیں ہے، کیا میں درخواست دے سکتی ہوں؟',
        aEn: 'Yes. You do not need a registered business to apply. Getting your business registered is good for its growth, and the programme will help participants with registration.',
        aUr: 'جی ہاں۔ درخواست دینے کے لیے کاروبار کا رجسٹرڈ ہونا ضروری نہیں۔ کاروبار رجسٹر کروانا اس کی ترقی کے لیے اچھا ہے، اور پروگرام شرکاء کی رجسٹریشن میں مدد کرے گا۔',
      },
      {
        id: 7,
        qEn: '7. Which cities is the training in?',
        qUr: 'تربیت کن شہروں میں ہو رہی ہے؟',
        aEn: 'The cities open for the current round are listed in Q8 of the form. Choose the one you can attend every day. Other cities will open in later rounds.',
        aUr: 'موجودہ مرحلے میں شامل شہر فارم کے سوال 8 میں دیے گئے ہیں۔ وہ شہر منتخب کریں جہاں آپ روزانہ آ سکیں۔ دیگر شہر اگلے مراحل میں کھولے جائیں گے۔',
      },
      {
        id: 8,
        qEn: '8. Can I apply more than once?',
        qUr: 'کیا میں ایک سے زیادہ بار درخواست دے سکتی ہوں؟',
        aEn: 'No. Send one application only. If the same CNIC or mobile number appears on more than one form, only the first one is kept.',
        aUr: 'جی نہیں۔ صرف ایک ہی درخواست جمع کروائیں۔ اگر ایک ہی شناختی کارڈ یا موبائل نمبر ایک سے زیادہ فارموں پر ہوا تو صرف پہلا فارم ہی شمار ہوگا۔',
      },
    ],
  },
  {
    id: 'filling',
    titleEn: 'Filling in the form',
    titleUr: 'فارم بھرنا',
    emoji: '📝',
    color: 'bg-coral/10 text-coral border-coral/20',
    items: [
      {
        id: 9,
        qEn: '9. How do I apply?',
        qUr: 'میں درخواست کیسے دوں؟',
        aEn: 'Fill in the online form on your phone. It takes only a few minutes. If you need help, call or send a WhatsApp message to the helpline at +92 311 5999592, Monday to Friday, 10:00 am to 6:00 pm, and a team member will help you fill it in over the phone. You can also visit any Mobilink Bank branch or ask our local partners for help, or email at imran.jamil@changemechanics.pk.',
        aUr: 'اپنے فون پر آن لائن فارم بھریں۔ اس میں صرف چند منٹ لگتے ہیں۔ اگر آپ کو مدد چاہیے تو ہیلپ لائن 5999592 311 92+ پر پیر سے جمعہ صبح 10 سے شام 6 بجے تک فون کریں یا واٹس ایپ میسج بھیجیں، ہماری ٹیم کا رکن فون پر فارم بھرنے میں آپ کی مدد کرے گا۔ آپ موبی لنک بینک کی کسی بھی برانچ میں جا کر یا ہمارے مقامی شراکت داروں سے بھی مدد لے سکتی ہیں، یا imran.jamil@changemechanics.pk پر ای میل کر سکتی ہیں۔',
      },
      {
        id: 10,
        qEn: '10. Can someone help me fill in the form?',
        qUr: 'کیا فارم بھرنے میں کوئی میری مدد کر سکتا ہے؟',
        aEn: 'Yes. A family member, a facilitator or the helpline can help you write it. Taking help is fine. The answers should be about your own business and your own plans, in your own words.',
        aUr: 'جی ہاں۔ گھر کا کوئی فرد، کوئی سہولت کار یا ہیلپ لائن آپ کو فارم بھرنے میں مدد دے سکتے ہیں۔ مدد لینا بالکل ٹھیک ہے۔ جوابات آپ کے اپنے کاروبار اور اپنے ارادوں کے بارے میں، آپ کی اپنی بات ہونے چاہئیں۔',
      },
      {
        id: 11,
        qEn: '11. Can I answer in Urdu or Roman Urdu?',
        qUr: 'کیا میں اردو یا رومن اردو میں جواب لکھ سکتی ہوں؟',
        aEn: 'Yes. You can write in Urdu, English or Roman Urdu. All three are treated equally. We look at what you say, not at spelling, grammar or handwriting.',
        aUr: 'جی ہاں۔ آپ اردو، انگریزی یا رومن اردو میں لکھ سکتی ہیں۔ تینوں کو برابر سمجھا جاتا ہے۔ ہم آپ کی بات دیکھتے ہیں، املا، گرامر یا لکھائی کو نہیں۔',
      },
      {
        id: 12,
        qEn: '12. Which questions must I answer?',
        qUr: 'کون سے سوالات کے جواب دینا لازمی ہیں؟',
        aEn: 'Every question marked with * is required. The online form will not submit until these are answered. The two "Other, please specify" boxes are only needed if you chose "Other".',
        aUr: 'جس سوال پر * کا نشان ہے وہ لازمی ہے۔ ان کے جواب کے بغیر آن لائن فارم جمع نہیں ہوگا۔ "Other, please specify" والے دو خانے صرف اسی صورت میں پر کریں اگر آپ نے "Other" منتخب کیا ہو۔',
      },
      {
        id: 13,
        qEn: '13. How long should my written answers be?',
        qUr: 'تحریری جواب کتنا لمبا ہونا چاہیے؟',
        aEn: 'Each written answer (Q24 to Q28c) should be between 10 and 300 words. A longer answer does not get more marks. A short, clear and honest answer is best.',
        aUr: 'ہر تحریری جواب (سوال 24 سے 28c تک) 10 سے 300 الفاظ کے درمیان ہونا چاہیے۔ لمبا جواب لکھنے سے زیادہ نمبر نہیں ملتے۔ ایک مختصر، صاف اور سچا جواب ہی سب سے بہتر ہے۔',
      },
      {
        id: 14,
        qEn: '14. What do I need before I start?',
        qUr: 'فارم شروع کرنے سے پہلے میرے پاس کیا ہونا چاہیے؟',
        aEn: 'Keep your CNIC, your mobile and WhatsApp numbers, an email address and your current and permanent addresses ready. Write your name exactly as it is on your CNIC, and the CNIC number as 13 digits without dashes. Mobile numbers are 11 digits starting with 03.',
        aUr: 'اپنا شناختی کارڈ، موبائل اور واٹس ایپ نمبر، ای میل اور موجودہ و مستقل پتہ تیار رکھیں۔ اپنا نام بالکل ویسا ہی لکھیں جیسا شناختی کارڈ پر ہے، اور شناختی کارڈ نمبر 13 ہندسے بغیر ڈیش کے لکھیں۔ موبائل نمبر 11 ہندسوں کا ہوتا ہے جو 03 سے شروع ہوتا ہے۔',
      },
      {
        id: 15,
        qEn: '15. I do not have an email address. What should I do?',
        qUr: 'میرے پاس ای میل ایڈریس نہیں ہے، میں کیا کروں؟',
        aEn: 'You can make a free Gmail address on your phone in a few minutes, or ask the helpline or a local partner to help you make one. Use an email you can check, because we will contact you there if you are shortlisted.',
        aUr: 'آپ اپنے فون پر چند منٹ میں مفت جی میل اکاؤنٹ بنا سکتی ہیں، یا ہیلپ لائن یا مقامی شراکت دار سے بنوانے میں مدد لے سکتی ہیں۔ وہ ای میل دیں جو آپ دیکھ سکیں، کیونکہ شارٹ لسٹ ہونے کی صورت میں ہم اسی پر رابطہ کریں گے۔',
      },
    ],
  },
  {
    id: 'form-questions',
    titleEn: 'Questions about the form',
    titleUr: 'فارم کے مخصوص سوالات',
    emoji: '🔍',
    color: 'bg-plum/10 text-plum border-plum/20',
    items: [
      {
        id: 16,
        qEn: '16. Why do you ask about a special CNIC (Q2b)?',
        qUr: 'خصوصی شناختی کارڈ کا سوال (سوال 2b) کیوں پوچھا گیا ہے؟',
        aEn: 'The programme wants to include women with disabilities. If you have a NADRA CNIC with the disability logo, choose Yes. If you are selected, you may be asked to show the card. Your answer is kept private.',
        aUr: 'پروگرام معذوری رکھنے والی خواتین کو بھی شامل کرنا چاہتا ہے۔ اگر آپ کے پاس معذوری کے نشان والا نادرا کا شناختی کارڈ ہے تو "ہاں" چنیں۔ منتخب ہونے کی صورت میں آپ سے یہ کارڈ دکھانے کو کہا جا سکتا ہے۔ آپ کا جواب راز میں رکھا جاتا ہے۔',
      },
      {
        id: 17,
        qEn: '17. Why do you ask about religious minority (Q2c)?',
        qUr: 'مذہبی اقلیت کا سوال (سوال 2c) کیوں پوچھا گیا ہے؟',
        aEn: 'It helps us include women from every community. You may choose "Prefer not to say". Your answer is kept private and is never shown on any list or certificate.',
        aUr: 'اس سے ہمیں ہر برادری کی خواتین کو شامل کرنے میں مدد ملتی ہے۔ آپ "بتانا نہیں چاہتی" بھی چن سکتی ہیں۔ آپ کا جواب راز میں رکھا جاتا ہے اور کسی فہرست یا سرٹیفکیٹ پر ظاہر نہیں کیا جاتا۔',
      },
      {
        id: 18,
        qEn: '18. What is the difference between Q10 and Q11?',
        qUr: 'سوال 10 اور سوال 11 میں کیا فرق ہے؟',
        aEn: 'Q10 is the district where you live now. Q11 is the district written on your domicile certificate. If they are the same, choose the same district in both.',
        aUr: 'سوال 10 وہ ضلع ہے جہاں آپ اب رہتی ہیں۔ سوال 11 وہ ضلع ہے جو آپ کے ڈومیسائل پر لکھا ہے۔ اگر دونوں ایک ہی ہیں تو دونوں میں ایک ہی ضلع منتخب کریں۔',
      },
      {
        id: 19,
        qEn: '19. What if I am not sure about my monthly earnings (Q17)?',
        qUr: 'اگر مجھے اپنی ماہانہ آمدن کا صحیح علم نہ ہو (سوال 17) تو؟',
        aEn: 'Give your best honest guess of an average month. If you have not started selling, choose "Not trading yet". Make sure this matches what you said in Q15a.',
        aUr: 'ایک عام مہینے کا اپنا سچا اندازہ لکھیں۔ اگر ابھی فروخت شروع نہیں کی تو "Not trading yet" منتخب کریں۔ دیکھ لیں کہ یہ جواب سوال 15a سے میل کھاتا ہو۔',
      },
      {
        id: 20,
        qEn: '20. In Q18, should I count myself?',
        qUr: 'کیا سوال 18 میں اپنے آپ کو بھی گنوں؟',
        aEn: 'Yes, count yourself as one paid worker. If you have not started the business yet, you may choose 0. Family members who help without pay go in Q19, not Q18.',
        aUr: 'جی ہاں، اپنے آپ کو ایک ملازم شمار کریں۔ اگر ابھی کاروبار شروع نہیں کیا تو آپ 0 چن سکتی ہیں۔ گھر کے وہ افراد جو بغیر تنخواہ کے مدد کرتے ہیں وہ سوال 19 میں لکھیں، سوال 18 میں نہیں۔',
      },
      {
        id: 21,
        qEn: '21. How should I answer Q28a, Q28b and Q28c?',
        qUr: 'سوال 28a، 28b اور 28c کا جواب کیسے دیں؟',
        aEn: 'In Q28a list the things your business needs, such as machinery, stock, raw material, a place, skills training, marketing or registration. In Q28b write roughly how much each item costs. In Q28c explain how each item will help the business earn more. Keep the total within PKR 500,000 and keep it for the business, not for household needs.',
        aUr: 'سوال 28a میں وہ چیزیں لکھیں جو آپ کے کاروبار کو چاہیے ہوں، جیسے مشینری، سامان، خام مال، جگہ، ہنر کی تربیت، مارکیٹنگ یا رجسٹریشن۔ سوال 28b میں ہر چیز کی تقریباً قیمت لکھیں۔ سوال 28c میں بتائیں کہ ہر چیز سے کاروبار کی آمدنی کیسے بڑھے گی۔ رقم 500,000 روپے کے اندر رکھیں اور یہ رقم صرف کاروبار کے لیے ہو، گھریلو ضرورتوں کے لیے نہیں۔',
      },
      {
        id: 22,
        qEn: '22. Does answering Q28 mean I will get the money?',
        qUr: 'کیا سوال 28 کا جواب دینے سے مجھے رقم مل جائے گی؟',
        aEn: 'No. Q28 helps us see how well you have thought about your business. Financing is decided only after the Bootcamp, on merit, for a limited number of participants.',
        aUr: 'جی نہیں۔ سوال 28 سے ہمیں پتہ چلتا ہے کہ آپ نے اپنے کاروبار کے بارے میں کتنا سوچا ہے۔ مالی معاونت کا فیصلہ صرف بوٹ کیمپ کے بعد، میرٹ پر، محدود تعداد میں خواتین کے لیے ہوتا ہے۔',
      },
    ],
  },
  {
    id: 'training',
    titleEn: 'The training',
    titleUr: 'تربیت',
    emoji: '🎓',
    color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    items: [
      {
        id: 23,
        qEn: '23. How long is the training and what are the timings?',
        qUr: 'تربیت کتنی لمبی ہے اور اوقات کیا ہیں؟',
        aEn: 'The training runs for one month, Monday to Friday, for around three hours a day. Sessions normally start at 9:00 am. Exact timings for your city will be shared with selected participants.',
        aUr: 'تربیت ایک ماہ کی ہے، پیر سے جمعہ، روزانہ تقریباً تین گھنٹے۔ عام طور پر کلاس صبح 9 بجے شروع ہوگی۔ آپ کے شہر کے صحیح اوقات منتخب خواتین کو بتا دیے جائیں گے۔',
      },
      {
        id: 24,
        qEn: '24. Do I have to attend every day?',
        qUr: 'کیا روزانہ حاضر ہونا ضروری ہے؟',
        aEn: 'Yes. Full attendance is required. Without it you will not receive the certificate and you will not be eligible for business financing. Apply only if you can attend the whole month.',
        aUr: 'جی ہاں۔ پوری حاضری ضروری ہے۔ اس کے بغیر نہ سرٹیفکیٹ ملے گا اور نہ ہی آپ مالی معاونت کے لیے اہل ہوں گی۔ درخواست صرف تب دیں جب آپ پورا مہینہ آ سکیں۔',
      },
      {
        id: 25,
        qEn: '25. Is the training online?',
        qUr: 'کیا تربیت آن لائن ہے؟',
        aEn: 'No. The training is in person at a training centre in the city you choose in Q8. The centres have women-only washrooms, a prayer space and step-free access.',
        aUr: 'جی نہیں۔ تربیت سوال 8 میں چنے گئے شہر کے تربیتی مرکز میں خود آ کر لی جائے گی۔ مراکز میں خواتین کے لیے الگ واش روم، نماز کی جگہ اور وہیل چیئر کے لیے ہموار راستے موجود ہیں۔',
      },
      {
        id: 26,
        qEn: '26. What will I learn?',
        qUr: 'میں کیا سیکھوں گی؟',
        aEn: 'You will learn business planning, costing and pricing, sales and marketing, record keeping, digital and mobile tools, and how to prepare a business plan and a financing application. You finish with a business plan of your own.',
        aUr: 'آپ کاروباری منصوبہ بندی، لاگت اور قیمت کا تعین، سامان بیچنا اور مارکیٹنگ، حساب رکھنا، ڈیجیٹل اور موبائل ٹولز، اور کاروباری منصوبہ اور مالی معاونت کی درخواست تیار کرنا سیکھیں گی۔ تربیت کے اختتام پر آپ کا اپنا کاروباری منصوبہ تیار ہوگا۔',
      },
    ],
  },
  {
    id: 'financing',
    titleEn: 'Business financing',
    titleUr: 'کاروباری مالی معاونت',
    emoji: '💰',
    color: 'bg-amber-600/10 text-amber-800 border-amber-300',
    items: [
      {
        id: 27,
        qEn: '27. Will every participant get PKR 500,000?',
        qUr: 'کیا ہر خاتون کو 500,000 روپے ملیں گے؟',
        aEn: 'No. Business financing of up to PKR 500,000 may be awarded after the Bootcamp to a limited number of participants who complete it, on merit and subject to the applicable approval process. Roughly one in four women who complete the Bootcamp is selected. Completing the Bootcamp does not by itself entitle you to it.',
        aUr: 'جی نہیں۔ بوٹ کیمپ کے بعد اسے مکمل کرنے والی محدود تعداد میں خواتین کو میرٹ کی بنیاد پر، متعلقہ منظوری کے طریقہ کار کے مطابق، زیادہ سے زیادہ 500,000 روپے تک مالی معاونت دی جا سکتی ہے۔ بوٹ کیمپ مکمل کرنے والی تقریباً ہر چار میں سے ایک خاتون کا انتخاب ہوتا ہے۔ صرف بوٹ کیمپ مکمل کرنا آپ کو اس رقم کا حق دار نہیں بنا دیتا۔',
      },
      {
        id: 28,
        qEn: '28. Is the money a loan or a grant?',
        qUr: 'یہ رقم قرض ہے یا گرانٹ؟',
        aEn: 'Both. At least 50% of any amount awarded is a loan that must be repaid to Mobilink Bank. The rest is a grant that does not have to be repaid.',
        aUr: 'دونوں۔ جو رقم دی جائے گی اس کا کم از کم 50 فیصد حصہ قرض ہوگا جو موبی لنک بینک کو واپس کرنا ہوگا، باقی حصہ گرانٹ ہوگا جو واپس نہیں کرنا ہوگا۔',
      },
      {
        id: 29,
        qEn: '29. How are women chosen for financing?',
        qUr: 'مالی معاونت کے لیے خواتین کا انتخاب کیسے ہوتا ہے؟',
        aEn: 'The choice is based on your attendance, your work during the Bootcamp, the business plan you prepare there, and a review by a selection committee. Mobilink Bank also assesses each loan application.',
        aUr: 'انتخاب کا انحصار بوٹ کیمپ میں آپ کی حاضری، بوٹ کیمپ کے دوران کارکردگی، وہاں تیار کیے گئے کاروباری منصوبے اور ایک انتخابی کمیٹی کے جائزے پر ہوتا ہے۔ موبی لنک بینک بھی ہر قرض کی درخواست کا جائزہ لیتا ہے۔',
      },
      {
        id: 30,
        qEn: '30. What can the money be used for?',
        qUr: 'یہ رقم کس چیز پر خرچ کی جا سکتی ہے؟',
        aEn: 'Only for the business, such as machinery, tools, stock, raw material, a work place, skills training, marketing or registration. It cannot be used for household expenses, paying off old debts or family events.',
        aUr: 'صرف کاروبار کے لیے، جیسے مشینری، اوزار، سامان، خام مال، کام کی جگہ، ہنر کی تربیت، مارکیٹنگ یا رجسٹریشن۔ یہ رقم گھریلو خرچ، پرانے قرضے اتارنے یا خاندانی تقریبات پر خرچ نہیں کی جا سکتی۔',
      },
    ],
  },
  {
    id: 'selection',
    titleEn: 'Selection and after you apply',
    titleUr: 'انتخاب اور درخواست کے بعد',
    emoji: '🎯',
    color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
    items: [
      {
        id: 31,
        qEn: '31. How are participants selected?',
        qUr: 'شرکاء کا انتخاب کیسے ہوتا ہے؟',
        aEn: 'Selection is on merit only. Your form is scored on your motivation, your business, your digital use, your availability and the inclusion of women from every area and community. Shortlisted applicants meet a panel, in person or online. Places are filled in order of merit in each city.',
        aUr: 'انتخاب صرف میرٹ پر ہوتا ہے۔ آپ کے فارم کو آپ کے شوق اور لگن، آپ کے کاروبار، فون اور ایپس کے استعمال، آپ کے دستیاب وقت، اور ہر علاقے اور برادری کی خواتین کی شمولیت کی بنیاد پر نمبر دیے جاتے ہیں۔ شارٹ لسٹ ہونے والی خواتین خود آ کر یا آن لائن ایک پینل سے ملتی ہیں۔ ہر شہر میں نشستیں میرٹ کی ترتیب سے دی جاتی ہیں۔',
      },
      {
        id: 32,
        qEn: '32. Will you contact me after I apply?',
        qUr: 'کیا درخواست کے بعد آپ مجھ سے رابطہ کریں گے؟',
        aEn: 'Shortlisted and selected applicants are contacted on the mobile, WhatsApp and email given in the form. Keep your phone on and check your email. You may also get a phone call if we need to clarify something in your form.',
        aUr: 'شارٹ لسٹ اور منتخب ہونے والی خواتین سے فارم میں دیے گئے موبائل، واٹس ایپ اور ای میل پر رابطہ کیا جاتا ہے۔ اپنا فون آن رکھیں اور ای میل دیکھتی رہیں۔ اگر آپ کے فارم میں کسی بات کی وضاحت درکار ہو تو آپ کو فون بھی کیا جا سکتا ہے۔',
      },
      {
        id: 33,
        qEn: '33. What happens if I am selected?',
        qUr: 'انتخاب کی صورت میں کیا ہوگا؟',
        aEn: 'You will be told the date, time and place of the first day. Bring your original CNIC. On the first day your details are checked and you sign a simple undertaking to attend the full training. You will also be asked to join the network for women who complete the training.',
        aUr: 'آپ کو پہلے دن کی تاریخ، وقت اور جگہ بتا دی جائے گی۔ اپنا اصل شناختی کارڈ ساتھ لائیں۔ پہلے دن آپ کی معلومات کی تصدیق ہوگی اور آپ پوری تربیت میں حاضر رہنے کا ایک سادہ وعدہ نامہ دستخط کریں گی۔ آپ کو تربیت مکمل کرنے والی خواتین کے نیٹ ورک میں بھی شامل ہونے کو کہا جائے گا۔',
      },
      {
        id: 34,
        qEn: '34. What if I gave wrong information by mistake?',
        qUr: 'اگر غلطی سے غلط معلومات دے دی ہوں تو؟',
        aEn: 'Call the helpline as soon as possible and tell us. Information found to be false at any stage may lead to your application or your selection being cancelled.',
        aUr: 'جلد از جلد ہیلپ لائن پر فون کر کے بتا دیں۔ کسی بھی مرحلے پر غلط معلومات سامنے آنے پر آپ کی درخواست یا انتخاب منسوخ کیا جا سکتا ہے۔',
      },
    ],
  },
  {
    id: 'privacy',
    titleEn: 'Privacy, safety and contact',
    titleUr: 'رازداری، حفاظت اور رابطہ',
    emoji: '🛡️',
    color: 'bg-rose-500/10 text-rose-700 border-rose-200',
    items: [
      {
        id: 35,
        qEn: '35. Who will see my information?',
        qUr: 'میری معلومات کون دیکھے گا؟',
        aEn: 'Only the WISE Lab team handling your application. Your information is used only for this programme. Answers to Q2b and Q2c are seen only by the core selection team.',
        aUr: 'صرف وائز لیب کی وہ ٹیم جو آپ کی درخواست پر کام کر رہی ہے۔ آپ کی معلومات صرف اس پروگرام کے لیے استعمال ہوتی ہیں۔ سوال 2b اور 2c کے جواب صرف انتخابی ٹیم کے چند ارکان ہی دیکھتے ہیں۔',
      },
      {
        id: 36,
        qEn: '36. Someone asked me for money to get selected. What should I do?',
        qUr: 'کسی نے مجھ سے انتخاب کے لیے پیسے مانگے ہیں، میں کیا کروں؟',
        aEn: 'Do not pay. WISE Lab never charges any fee at any stage. Report it to the helpline straight away.',
        aUr: 'پیسے بالکل نہ دیں۔ وائز لیب کسی بھی مرحلے پر کوئی فیس نہیں لیتی۔ فوراً ہیلپ لائن پر اطلاع دیں۔',
      },
      {
        id: 37,
        qEn: '37. How do I contact WISE Lab?',
        qUr: 'وائز لیب سے رابطہ کیسے کریں؟',
        aEn: 'Helpline: +92 311 5999592 (calls and WhatsApp), Monday to Friday, 10:00 am to 6:00 pm. Email: imran.jamil@changemechanics.pk. You can also visit any Mobilink Bank branch for help.',
        aUr: 'ہیلپ لائن: 5999592 311 92+ (فون اور واٹس ایپ)، پیر سے جمعہ، صبح 10 بجے سے شام 6 بجے تک۔ ای میل: imran.jamil@changemechanics.pk۔ آپ مدد کے لیے موبی لنک بینک کی کسی بھی برانچ میں بھی جا سکتی ہیں۔',
      },
    ],
  },
]

