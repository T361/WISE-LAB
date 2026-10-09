import type { FormSchema } from '../types'

const DISTRICTS = [
  ...['Attock','Bahawalnagar','Bahawalpur','Bhakkar','Chakwal','Chiniot','Dera Ghazi Khan','Faisalabad','Gujranwala','Gujrat','Hafizabad','Jhang','Jhelum','Kasur','Khanewal','Khushab','Kot Addu','Lahore','Layyah','Lodhran','Mandi Bahauddin','Mianwali','Multan','Murree','Muzaffargarh','Nankana Sahib','Narowal','Okara','Pakpattan','Rahim Yar Khan','Rajanpur','Rawalpindi','Sahiwal','Sargodha','Sheikhupura','Sialkot','Talagang','Taunsa','Toba Tek Singh','Vehari','Wazirabad'].map(d => ({ label: `${d} - Punjab`, value: `${d} - Punjab` })),
  ...['Islamabad'].map(d => ({ label: `${d} - ICT`, value: `${d} - ICT` })),
  ...['Badin','Dadu','Ghotki','Hyderabad','Jacobabad','Jamshoro','Karachi Central','Karachi East','Karachi South','Karachi West','Kashmore','Keamari','Khairpur','Korangi','Larkana','Karachi Malir','Matiari','Mirpur Khas','Naushahro Feroze','Qambar Shahdadkot','Sanghar','Shaheed Benazirabad','Shikarpur','Sujawal','Sukkur','Tando Allahyar','Tando Muhammad Khan','Tharparkar','Thatta','Umerkot'].map(d => ({ label: `${d} - Sindh`, value: `${d} - Sindh` })),
  ...['Abbottabad','Bajaur','Bannu','Battamgram','Buner','Central Kurram','Charsadda','Dera Ismail Khan','Hangu','Haripur','Karak','Khyber','Kohat','Kohistan Lower','Kolai Pallas','Kurram','Lakki Marwat','Lower Chitral','Lower Dir','Malakand','Mardan','Mohmand','North Waziristan','Orakzai','Peshawar','Shangla','South Waziristan Lower','South Waziristan Upper','Swabi','Swat','Tank','Torghar','Upper Chitral','Upper Dir','Upper Kohistan','Nowshera','Mansehra'].map(d => ({ label: `${d} - KPK`, value: `${d} - KPK` })),
  ...['Awaran','Barkhan','Chagai','Dera Bugti','Duki','Gwadar','Harnai','Hub','Jafarabad','Jhal Magsi','Kachhi','Kalat','Kech','Kharan','Khuzdar','Killa Abdullah','Killa Saifullah','Kohlu','Lasbela','Loralai','Mastung','Musakhel','Nasirabad','Nushki','Panjgur','Pishin','Quetta City','Quetta Saddar','Rakhni','Sibi','Sohbatpur','Surab','Taftan','Usta Muhammad','Wadh','Washuk','Zhob','Ziarat','Shaheed Sikandarabad','Sherani'].map(d => ({ label: `${d} - Balochistan`, value: `${d} - Balochistan` })),
  ...['Bagh','Bhimber','Hattian Bala','Haveli','Kotli','Mirpur','Muzaffarabad','Neelum','Poonch','Sudhanoti'].map(d => ({ label: `${d} - AJK`, value: `${d} - AJK` })),
  ...['Astore','Darel','Diamer','Ghanche','Ghizer','Gilgit','Gupis - Yasin','Hunza','Kharmang','Nagar','Roundu','Shigar','Skardu','Tangir'].map(d => ({ label: `${d} - GB`, value: `${d} - GB` })),
  { label: 'Other / دیگر', value: 'Other' }
]

export const enterpriseFormSchema: FormSchema = {
  track: 'enterprise',
  title: 'WISE Lab Micro-Entrepreneurship Bootcamp\nوائز لیب مائیکرو انٹرپرینرشپ بوٹ کیمپ',
  subtitle:
    'A free one-month training programme for women-led small and home-based businesses.\nخواتین کے زیرِ انتظام چھوٹے کاروبار کے لیے ایک ماہ کا مفت تربیتی پروگرام۔',
  themeTrack: 'enterprise',
  submitLabel: 'Submit application',
  successTitle: 'Thank you for applying.',
  successBody: 'Your application has been received. Our team will review it and contact you if shortlisted.\nآپ کی درخواست موصول ہو گئی ہے۔ ہماری ٹیم اسے دیکھ کر شارٹ لسٹ ہونے کی صورت میں آپ سے رابطہ کرے گی۔',
  sections: [
    {
      id: 'personal-information',
      title: 'PERSONAL INFORMATION\nذاتی معلومات',
      fields: [
        {
          name: 'email',
          label: 'Personal Email Address\nذاتی ای میل',
          type: 'email',
          helpText: 'We will contact you on this email if shortlisted.\nشارٹ لسٹ ہونے کی صورت میں ہم اسی ای میل پر رابطہ کریں گے۔',
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          patternMessage: 'Please enter a valid email address.',
        },
        {
          name: 'fullName',
          label: 'Q1. Full name (as written on your CNIC)\nمکمل نام (جیسا کہ آپ کے شناختی کارڈ پر درج ہے)',
          type: 'text',
          helpText: 'Letters and spaces only. 3–60 characters.',
          required: true,
          pattern: /^[\p{L} ]{3,60}$/u,
          patternMessage: 'Letters and spaces only, 3–60 characters.',
        },
        {
          name: 'cnic',
          label: 'Q2a. CNIC number (13 digits, no dashes)\nشناختی کارڈ نمبر (13 ہندسے، ڈیش کے بغیر)',
          type: 'text',
          helpText: 'Enter all 13 digits without dashes. Example: 3520212345679',
          required: true,
          numericOnly: true,
          inputMode: 'numeric',
          maxLength: 13,
          pattern: /^[0-9]{13}$/,
          patternMessage: 'Enter exactly 13 digits, no dashes.',
        },
        {
          name: 'disabilityCnic',
          label: 'Q2b. Do you have a NADRA CNIC with the disability logo (special CNIC)?\nکیا آپ کے پاس معذوری کے نشان والا نادرا کا خصوصی شناختی کارڈ ہے؟',
          type: 'radio',
          required: true,
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },
        {
          name: 'minority',
          label: 'Q2c. Do you belong to a religious minority community recognised in Pakistan?\nکیا آپ کا تعلق پاکستان میں تسلیم شدہ کسی مذہبی اقلیتی برادری سے ہے؟',
          type: 'radio',
          helpText: 'This information helps us include women from every community. It will be kept strictly private.\nیہ معلومات ہمیں ہر برادری کی خواتین کو شامل کرنے میں مدد دیتی ہیں اور راز میں رکھی جائیں گی۔',
          required: true,
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ],
        },
        {
          name: 'dob',
          label: 'Q3. Date of birth\nتاریخِ پیدائش',
          type: 'date',
          required: true,
        },
        {
          name: 'mobile',
          label: 'Q4. Mobile number\nموبائل نمبر',
          type: 'tel',
          helpText: '11 digits starting with 03 — e.g. 03001234567. We will call this number if shortlisted.\n03 سے شروع ہونے والے 11 ہندسے — مثلاً 03001234567۔ شارٹ لسٹ ہونے پر اسی نمبر پر رابطہ ہوگا۔',
          required: true,
          numericOnly: true,
          inputMode: 'tel',
          maxLength: 11,
          pattern: /^03[0-9]{9}$/,
          patternMessage: '11 digits, must begin with 03.',
        },
        {
          name: 'whatsapp',
          label: 'Q5. WhatsApp number\nواٹس ایپ نمبر',
          type: 'tel',
          helpText: '11 digits starting with 03 — e.g. 03001234567. We will message this number if shortlisted.\n03 سے شروع ہونے والے 11 ہندسے — مثلاً 03001234567۔ شارٹ لسٹ ہونے پر اسی نمبر پر پیغام بھیجا جائے گا۔',
          required: true,
          numericOnly: true,
          inputMode: 'tel',
          maxLength: 11,
          pattern: /^03[0-9]{9}$/,
          patternMessage: '11 digits, must begin with 03.',
        },
        {
          name: 'maritalStatus',
          label: 'Q6. Marital status\nازدواجی حیثیت',
          type: 'radio',
          required: true,
          options: [
            { label: 'Single', value: 'Single' },
            { label: 'Married', value: 'Married' },
            { label: 'Widowed', value: 'Widowed' },
            { label: 'Divorced', value: 'Divorced' },
            { label: 'Separated', value: 'Separated' },
          ],
        },
        {
          name: 'education',
          label: 'Q7. Highest level of education completed\nآپ کی مکمل کی ہوئی سب سے اعلیٰ تعلیم',
          type: 'radio',
          required: true,
          options: [
            { label: 'No formal schooling', value: 'No formal schooling' },
            { label: 'Primary', value: 'Primary' },
            { label: 'Middle', value: 'Middle' },
            { label: 'Matric', value: 'Matric' },
            { label: 'Intermediate', value: 'Intermediate' },
            { label: "Bachelor's degree", value: "Bachelor's degree" },
            { label: "Master's degree or above", value: "Master's degree or above" },
          ],
        },
        {
          name: 'cityPreference',
          label: 'Q8. In which city would you like to attend the bootcamp?\nآپ کس شہر میں بوٹ کیمپ / ٹریننگ میں شرکت کرنا چاہیں گی؟',
          type: 'radio',
          required: true,
          options: [
            { label: 'Abbottabad', value: 'Abbottabad' },
            { label: 'Quetta', value: 'Quetta' },
          ],
        },
        {
          name: 'language',
          label: 'Q9. Language you speak at home\nگھر میں آپ کون سی زبان بولتی ہیں؟',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      id: 'current-address',
      title: 'Current Address\nموجودہ پتہ',
      fields: [
        {
          name: 'currentDistrict',
          label: 'Q10. District where you currently live\nآپ کس ضلع میں رہتی ہیں؟',
          type: 'select',
          helpText: 'Select the district where you live now.',
          required: true,
          options: DISTRICTS,
        },
        {
          name: 'currentAddress',
          label: 'Complete Current Residential Address\nمکمل موجودہ رہائشی پتہ',
          type: 'textarea',
          helpText: 'House number, street, neighbourhood, area, village/town/city and tehsil.\nمکان نمبر، گلی، محلہ، علاقہ، گاؤں/قصبہ/شہر اور تحصیل لکھیں۔',
          required: true,
        },
      ],
    },
    {
      id: 'permanent-address',
      title: 'Permanent Address\nمستقل پتہ',
      fields: [
        {
          name: 'permanentDistrict',
          label: 'Q11. District of your domicile\nآپ کا ڈومیسائل کس ضلع کا ہے؟',
          type: 'select',
          required: true,
          options: DISTRICTS,
        },
        {
          name: 'urbanRural',
          label: 'Is your home in an urban or a rural area?\nآپ کا گھر شہری علاقے میں ہے یا دیہی علاقے میں؟',
          type: 'radio',
          required: true,
          options: [
            { label: 'Urban', value: 'Urban' },
            { label: 'Rural', value: 'Rural' },
          ],
        },
        {
          name: 'permanentAddress',
          label: 'Complete Permanent Address\nمکمل مستقل پتہ',
          type: 'textarea',
          helpText: 'House number, street, neighbourhood, area, village/town/city and tehsil.\nآپ کے مستقل گھر کا پتہ — مکان نمبر، گلی، محلہ، علاقہ، گاؤں/قصبہ/شہر اور تحصیل لکھیں۔',
          required: true,
        },
      ],
    },
    {
      id: 'digital-readiness',
      title: 'DIGITAL READINESS\nڈیجیٹل رسائی',
      fields: [
        {
          name: 'phoneAccess',
          label: 'Q12. Do you have a phone?\nکیا آپ کے پاس فون ہے؟',
          type: 'radio',
          required: true,
          options: [
            { label: 'My own smartphone', value: 'My own smartphone' },
            { label: 'A smartphone shared with family', value: 'A smartphone shared with family' },
            { label: 'Basic phone only', value: 'Basic phone only' },
            { label: 'No phone', value: 'No phone' },
          ],
        },
        {
          name: 'appsUsed',
          label: 'Q13. Which of these apps do you use?\nآپ ان میں سے کون سی ایپس استعمال کرتی ہیں؟',
          type: 'checkbox',
          helpText: 'Tick all that apply.\nجو بھی استعمال کرتی ہیں سب پر نشان لگائیں۔',
          required: false,
          options: [
            'WhatsApp', 'WhatsApp Business', 'Facebook', 'Instagram', 'Simosa', 'Tamasha', 'JazzCash', 'Alibaba',
            'Easypaisa', 'TikTok', 'YouTube', 'LinkedIn', 'X (Twitter)', 'Email', 'Online banking', 'Daraz',
            'Others', 'None of the above'
          ].map(app => ({ label: app, value: app })),
        },
      ],
    },
    {
      id: 'your-business',
      title: 'YOUR BUSINESS\nآپ کا کاروبار',
      description: 'If you have not started yet, answer for the business you plan to start.\nاگر آپ نے ابھی کاروبار شروع نہیں کیا تو جو کاروبار شروع کرنے کا ارادہ ہے، اس کے بارے میں جواب دیں۔',
      fields: [
        {
          name: 'businessName',
          label: 'Q14. Name of your business\nکاروبار کا نام',
          type: 'text',
          helpText: 'If not started yet, write the name you are thinking of.\nاگر ابھی شروع نہیں کیا تو وہ نام لکھیں جو آپ اپنے کاروبار کے لیے سوچ رہی ہیں۔',
          required: true,
        },
        {
          name: 'businessDuration',
          label: 'Q15a. How long have you been running this business?\nآپ کو یہ کاروبار چلاتے ہوئے کتنا عرصہ ہوا ہے؟',
          type: 'select',
          required: true,
          options: [
            'I have a business idea but have not started yet', 'Less than 6 months', '6 to 11 months', '1 to 3 years', 'More than 3 years'
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'businessRegistration',
          label: 'Q15b. Is your business registered in any form?\nکیا آپ کا کاروبار کسی بھی صورت میں رجسٹرڈ ہے؟',
          type: 'radio',
          required: true,
          options: [
            'Sole proprietorship with NTN', 'Partnership (Registrar of Firms)', 'Company (SECP)', 'Not registered', "Don't know"
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'businessSector',
          label: 'Q16. Main business sector\nآپ کے کاروبار کا بنیادی شعبہ',
          type: 'select',
          required: true,
          options: [
            'Bakery and Confectionery', 'Beauty and Salon Services', 'Childcare and Daycare',
            'Digital Freelancing and IT Services', 'Dry Fruits, Nuts and Natural Produce', 'Education and Tutoring',
            'Events and Gifting', 'Farming, Fisheries and Kitchen Gardening', 'Fashion and Boutique',
            'Gemstones: Cutting, Finishing, Polishing, Jewelery', 'Handicrafts and Home Decor',
            'Health and Care Services', 'Home Kitchen and Catering', 'Jewellery and Accessories',
            'Livestock, Dairy and Poultry', 'Natural Skincare and Wellness Products',
            'Online Reselling and E-commerce', 'Pickles, Preserves and Spices', 'Retail Shop and Trading',
            'Stitching and Tailoring', 'Traditional Textile Crafts', 'Other (please specify)'
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'businessSectorOther',
          label: 'If you selected "Other" above, please describe your sector\nOther کی صورت میں اپنے شعبے کی وضاحت کریں',
          type: 'text',
          helpText: 'Leave blank if you selected a named sector above.',
          required: false,
          conditional: { field: 'businessSector', equals: 'Other (please specify)' },
        },
        {
          name: 'averageEarnings',
          label: 'Q17. Average monthly earnings\nآپ کے کاروبار کی اوسط ماہانہ آمدنی',
          type: 'radio',
          required: true,
          options: [
            'Not trading yet', 'Under PKR 25,000', 'PKR 25,000 – 49,999', 'PKR 50,000 – 99,999',
            'PKR 100,000 – 199,999', 'PKR 200,000 and above'
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'paidWorkers',
          label: 'Q18. Paid workers in the business (count yourself)\nکاروبار میں تنخواہ دار افراد کی تعداد (اپنے آپ کو بھی شمار کریں)',
          type: 'select',
          required: true,
          options: ['0', '1', '2', '3', '4', '5', '6–10', 'More than 10'].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'unpaidWorkers',
          label: 'Q19. Unpaid family members working in the business\nکاروبار میں بغیر تنخواہ کام کرنے والے گھر کے افراد',
          type: 'select',
          required: true,
          options: ['0', '1', '2', '3', '4', '5', '6–10', 'More than 10'].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'equipmentValue',
          label: 'Q20. Estimated value of business tools, equipment and machinery\nآپ کے کاروبار کے اوزار، سامان اور مشینری کی مجموعی قیمت کا اندازہ',
          type: 'radio',
          required: true,
          options: [
            'No, I do not own any tools/equipment/machinery', 'Under PKR 25,000', 'PKR 25,000 – 99,999',
            'PKR 100,000 – 299,999', 'PKR 300,000 and above'
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'salesChannel',
          label: 'Q21. Where do you sell your product or service? (Tick all that apply)\nآپ اپنی مصنوعات یا خدمات کہاں فروخت کرتی ہیں؟ (جو بھی لاگو ہو)',
          type: 'checkbox',
          helpText: 'Tick all that apply.',
          required: true,
          options: [
            'From home', 'Local market or bazaar', 'My own shop', 'Online or social media',
            'Through a middleman or wholesaler', 'Exhibitions and stalls',
            "At the customer's home or workplace", 'Not trading yet'
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'recordKeeping',
          label: 'Q22. Do you keep a written or digital record of income and expenses?\nکیا آپ اپنی آمدنی اور اخراجات کا تحریری یا ڈیجیٹل حساب رکھتی ہیں؟',
          type: 'radio',
          required: true,
          options: ['Yes, regularly', 'Sometimes', 'No'].map(opt => ({ label: opt, value: opt })),
        },
      ],
    },
    {
      id: 'description-goals',
      title: 'DESCRIPTION OF YOUR BUSINESS AND GOALS\nآپ کے کاروبار اور اہداف کی تفصیل',
      fields: [
        {
          name: 'businessPractices',
          label: 'Q23. Which of these do you do for your business? (Tick all that apply)\nآپ اپنے کاروبار کے لیے ان میں سے کیا کیا کرتی ہیں؟',
          type: 'checkbox',
          helpText: 'Tick all that apply.',
          required: true,
          options: [
            'Planning what to make or buy', 'Working out cost before price', 'Setting a sales or income target',
            'Preparing for busy and slow seasons', 'Saving towards something for the business', 'A written plan',
            'I keep it flexible/decide as work comes in'
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'businessDescription',
          label: 'Q24. Briefly describe your business. What do you make, sell or do?\nاپنے کاروبار کے بارے میں مختصراً بتائیں۔ آپ کیا بناتی، بیچتی یا کرتی ہیں؟',
          type: 'textarea',
          helpText: 'If not started yet, describe the business you plan to start. Write between 10 and 300 words.\nاگر ابھی شروع نہیں کیا تو جو کاروبار شروع کرنے کا ارادہ ہے اس کے بارے میں لکھیں۔ 10 سے 300 الفاظ لکھیں۔',
          required: true,
          pattern: /^\s*(\S+\s+){9,299}\S+\s*$/,
          patternMessage: 'Please write between 10 and 300 words.',
        },
        {
          name: 'businessDifference',
          label: 'Q25. What makes your business different from others doing similar work in your area?\nآپ کے علاقے میں اسی طرح کا کام کرنے والوں کے مقابلے میں آپ کے کاروبار میں کیا فرق ہے؟',
          type: 'textarea',
          helpText: 'Write between 10 and 300 words.\n10 سے 300 الفاظ لکھیں۔',
          required: true,
          pattern: /^\s*(\S+\s+){9,299}\S+\s*$/,
          patternMessage: 'Please write between 10 and 300 words.',
        },
        {
          name: 'bootcampReason',
          label: 'Q26. Why do you want to join this bootcamp and what do you hope to gain?\nآپ اس بوٹ کیمپ میں کیوں شامل ہونا چاہتی ہیں اور اس سے کیا حاصل کرنے کی امید رکھتی ہیں؟',
          type: 'textarea',
          helpText: 'Write between 10 and 300 words.\n10 سے 300 الفاظ لکھیں۔',
          required: true,
          pattern: /^\s*(\S+\s+){9,299}\S+\s*$/,
          patternMessage: 'Please write between 10 and 300 words.',
        },
        {
          name: 'businessVision',
          label: 'Q27. Where would you like your business to be two years from now?\nآج سے دو سال بعد آپ اپنا کاروبار کہاں دیکھنا چاہتی ہیں؟',
          type: 'textarea',
          helpText: 'Write between 10 and 300 words.\n10 سے 300 الفاظ لکھیں۔',
          required: true,
          pattern: /^\s*(\S+\s+){9,299}\S+\s*$/,
          patternMessage: 'Please write between 10 and 300 words.',
        },
      ],
    },
    {
      id: 'use-of-grant',
      title: 'USE OF GRANT\nمالی معاونت کا استعمال',
      description: 'Only selected women will receive PKR 500,000 after completing the bootcamp — roughly one in four who complete it. Selection is based on attendance, performance, the business plan prepared during the bootcamp, and a selection committee review. At least half of the amount is a loan that must be repaid to the financial institution; the rest is a grant.\nبوٹ کیمپ مکمل کرنے والی تقریباً ہر چار میں سے ایک خاتون کو 500,000 روپے کی مالی معاونت دی جائے گی۔ یہ انتخاب حاضری، کارکردگی، کاروباری منصوبے اور انتخابی کمیٹی کی بنیاد پر ہوگا۔ اس رقم کا کم از کم آدھا حصہ قرض ہوگا جو واپس کرنا ہوگا۔',
      fields: [
        {
          name: 'grantUse',
          label: 'Q28a. If you receive PKR 500,000, what would you spend it on?\nاگر آپ کو 500,000 روپے ملیں تو یہ رقم کہاں خرچ کریں گی؟',
          type: 'textarea',
          helpText: 'List each item — e.g. machinery, raw materials, workspace, training, marketing, online subscriptions, registration. Write between 10 and 300 words.\nہر چیز کا نام لکھیں جیسے مشینری، خام مال، جگہ، تربیت، مارکیٹنگ، آن لائن سبسکرپشن، رجسٹریشن۔ 10 سے 300 الفاظ لکھیں۔',
          required: true,
          pattern: /^\s*(\S+\s+){9,299}\S+\s*$/,
          patternMessage: 'Please write between 10 and 300 words.',
        },
        {
          name: 'grantExpenses',
          label: 'Q28b. Approximate cost of each item\nہر چیز پر تقریباً کتنی رقم لگے گی',
          type: 'textarea',
          required: true,
        },
        {
          name: 'grantNeed',
          label: 'Q28c. Why does your business need these items?\nآپ کے کاروبار کو ان چیزوں کی ضرورت کیوں ہے؟',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      id: 'how-did-you-hear',
      title: 'HOW DID YOU HEAR ABOUT US?\nآپ نے ہمارے بارے میں کیسے سنا؟',
      fields: [
        {
          name: 'source',
          label: 'Q29. How did you FIRST hear about this bootcamp?\nآپ نے اس بوٹ کیمپ کے بارے میں سب سے پہلے کہاں سے سنا؟',
          type: 'radio',
          helpText: 'Select the single most important source.',
          required: true,
          options: [
            'Facebook', 'Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'X (Twitter)', 'WhatsApp message or group',
            'Message from Jazz', 'Ad on Tamasha App', 'Banner or poster in my area', 'Radio', 'Television',
            'Newspaper or magazine', 'Printed leaflet or flyer', 'A community mobiliser or facilitator',
            "Women's chamber or business association", 'An NGO or welfare organisation',
            'My college or university', 'A friend or family member', 'A past participant',
            'Other — please specify below'
          ].map(opt => ({ label: opt, value: opt })),
        },
        {
          name: 'sourceOther',
          label: '(Optional) If you selected "Other" above, please specify\nOther کی صورت میں وضاحت کریں',
          type: 'text',
          helpText: 'Leave blank if you selected a named source above.',
          required: false,
          conditional: { field: 'source', equals: 'Other — please specify below' },
        },
      ],
    },
    {
      id: 'declaration',
      title: 'DECLARATION\nاقرار نامہ',
      fields: [
        {
          name: 'declarationConsent',
          label: 'I agree to all of the statements below.\nمیں مندرجہ ذیل تمام بیانات سے اتفاق کرتی ہوں۔',
          type: 'consent',
          helpText: [
            'a. The information I have provided in this form is true and accurate. I understand that false or incorrect information may lead to the rejection of my application or the cancellation of my selection.',
            'b. If selected, I will attend the one-month Bootcamp in full — every day from Monday to Friday. I understand that without full attendance I will not be eligible for the certificate or the business financing.',
            'c. I consent to the WISE Lab team contacting me about this application and the Bootcamp on the phone numbers and email address I have provided.',
            'd. I understand that the PKR 500,000 business financing is awarded after the Bootcamp to a limited number of participants selected on merit, and that completing the Bootcamp does not entitle me to it. At least 50% of any amount awarded is a loan that must be repaid.',
          ].join('\n') +
          '\n\n' +
          [
            'ا۔ میں نے اس فارم میں جو معلومات دی ہیں وہ درست اور سچی ہیں۔ مجھے معلوم ہے کہ غلط معلومات کی صورت میں میری درخواست یا انتخاب منسوخ کیا جا سکتا ہے۔',
            'ب۔ اگر میرا انتخاب ہو تو میں ایک ماہ کے بوٹ کیمپ میں پیر سے جمعہ تک روزانہ پوری حاضری دوں گی۔ مکمل حاضری کے بغیر میں سرٹیفکیٹ اور مالی معاونت کے لیے اہل نہیں ہوں گی۔',
            'ج۔ میں اجازت دیتی ہوں کہ وائز لیب کی ٹیم اس درخواست اور بوٹ کیمپ کے بارے میں میرے فون نمبروں اور ای میل پر مجھ سے رابطہ کرے۔',
            'د۔ میں سمجھتی ہوں کہ 500,000 روپے کی مالی معاونت بوٹ کیمپ مکمل کرنے والی چند خواتین کو میرٹ پر دی جائے گی اور صرف بوٹ کیمپ مکمل کرنے سے یہ رقم میرا حق نہیں بنتی۔ دی جانے والی رقم کا کم از کم 50 فیصد قرض ہوگا جو واپس کرنا ہوگا۔',
          ].join('\n'),
          required: true,
        },
      ],
    },
  ],
}
