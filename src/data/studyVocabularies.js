const vocabs = {
Biology: [
{ word: "Cell", arabic: "خلية", english: "The cell is the basic unit of life." },
{ word: "Photosynthesis", arabic: "التركيب الضوئي", english: "Plants use photosynthesis to make food." },
{ word: "Organism", arabic: "كائن حي", english: "Humans are complex organisms." },
{ word: "Genetics", arabic: "علم الوراثة", english: "Genetics studies heredity." },
{ word: "DNA", arabic: "حمض نووي", english: "DNA carries genetic information." },
{ word: "Mutation", arabic: "طفرة", english: "Mutations can cause genetic changes." },
{ word: "Evolution", arabic: "تطور", english: "Evolution explains species adaptation." },
{ word: "Enzyme", arabic: "إنزيم", english: "Enzymes speed up chemical reactions." },
{ word: "Protein", arabic: "بروتين", english: "Proteins are building blocks of cells." },
{ word: "Ecology", arabic: "علم البيئة", english: "Ecology studies organisms and their environment." },
{ word: "Metabolism", arabic: "الأيض", english: "Metabolism includes all chemical reactions in organisms." },
{ word: "Homeostasis", arabic: "التوازن الداخلي", english: "Homeostasis maintains internal stability." },
{ word: "Respiration", arabic: "تنفس", english: "Cells need respiration to produce energy." },
{ word: "Chlorophyll", arabic: "كلوروفيل", english: "Chlorophyll captures sunlight in plants." },
{ word: "Nucleus", arabic: "نواة", english: "The nucleus contains DNA." },
{ word: "Mitochondria", arabic: "الميتوكوندريا", english: "Mitochondria generate energy in cells." },
{ word: "Hormone", arabic: "هرمون", english: "Hormones regulate body functions." },
{ word: "Antibody", arabic: "جسم مضاد", english: "Antibodies fight infections." },
{ word: "Vaccine", arabic: "لقاح", english: "Vaccines protect against diseases." }
],

Chemistry: [
{ word: "Atom", arabic: "ذرة", english: "Atoms are the building blocks of matter." },
{ word: "Molecule", arabic: "جزيء", english: "Water is made of H2O molecules." },
{ word: "Compound", arabic: "مركب", english: "Salt is a chemical compound." },
{ word: "Reaction", arabic: "تفاعل", english: "Chemical reactions produce new substances." },
{ word: "Acid", arabic: "حمض", english: "Acids have a sour taste." },
{ word: "Base", arabic: "قاعدة", english: "Bases feel slippery and are bitter." },
{ word: "pH", arabic: "الرقم الهيدروجيني", english: "pH measures acidity or alkalinity." },
{ word: "Electron", arabic: "إلكترون", english: "Electrons orbit the nucleus of an atom." },
{ word: "Proton", arabic: "بروتون", english: "Protons have a positive charge." },
{ word: "Neutron", arabic: "نيوترون", english: "Neutrons are neutral particles in the nucleus." },
{ word: "Covalent", arabic: "تساهمي", english: "Covalent bonds share electrons." },
{ word: "Ionic", arabic: "أيوني", english: "Ionic bonds transfer electrons." },
{ word: "Catalyst", arabic: "عامل محفز", english: "Catalysts speed up reactions without being consumed." },
{ word: "Oxidation", arabic: "أكسدة", english: "Oxidation involves loss of electrons." },
{ word: "Reduction", arabic: "اختزال", english: "Reduction involves gain of electrons." }
],

Physics: [
{ word: "Force", arabic: "قوة", english: "Force causes an object to move." },
{ word: "Energy", arabic: "طاقة", english: "Energy cannot be created or destroyed." },
{ word: "Velocity", arabic: "سرعة", english: "Velocity is speed with direction." },
{ word: "Acceleration", arabic: "تسارع", english: "Acceleration measures change in velocity." },
{ word: "Mass", arabic: "كتلة", english: "Mass measures the amount of matter." },
{ word: "Gravity", arabic: "جاذبية", english: "Gravity pulls objects toward the Earth." },
{ word: "Friction", arabic: "احتكاك", english: "Friction resists motion between surfaces." },
{ word: "Momentum", arabic: "زخم", english: "Momentum equals mass times velocity." },
{ word: "Pressure", arabic: "ضغط", english: "Pressure is force per unit area." },
{ word: "Wave", arabic: "موجة", english: "Waves transfer energy through a medium." },
{ word: "Frequency", arabic: "تردد", english: "Frequency measures the number of waves per second." },
{ word: "Amplitude", arabic: "سعة", english: "Amplitude is the height of a wave." },
{ word: "Reflection", arabic: "انعكاس", english: "Reflection occurs when light bounces off a surface." },
{ word: "Refraction", arabic: "انكسار", english: "Refraction bends light as it passes through materials." },
{ word: "Electricity", arabic: "كهرباء", english: "Electricity powers devices." }
],

Environment: [
{ word: "Climate Change", arabic: "تغير المناخ", english: "Climate change impacts ecosystems." },
{ word: "Biodiversity", arabic: "تنوع حيوي", english: "Biodiversity is essential for life." },
{ word: "Pollution", arabic: "تلوث", english: "Air pollution affects health." },
{ word: "Renewable", arabic: "متجدد", english: "Renewable sources include wind and solar power." },
{ word: "Sustainability", arabic: "استدامة", english: "Sustainability ensures resources last." },
{ word: "Conservation", arabic: "حفظ", english: "Conservation protects natural resources." },
{ word: "Ecosystem", arabic: "نظام بيئي", english: "Ecosystem is the interaction of organisms." },
{ word: "Deforestation", arabic: "إزالة الغابات", english: "Deforestation reduces habitats." },
{ word: "Recycling", arabic: "إعادة التدوير", english: "Recycling reduces waste." },
{ word: "Water Cycle", arabic: "دورة المياه", english: "The water cycle moves water on Earth." }
],

Education: [
{ word: "Curriculum", arabic: "منهج دراسي", english: "The curriculum covers multiple subjects." },
{ word: "Literacy", arabic: "القدرة على القراءة والكتابة", english: "Literacy is crucial for learning." },
{ word: "Scholarship", arabic: "منحة دراسية", english: "He received a scholarship to study abroad." },
{ word: "Assignment", arabic: "واجب", english: "Assignments must be submitted on time." },
{ word: "Graduation", arabic: "تخرج", english: "Graduation marks the end of study." },
{ word: "Research", arabic: "بحث", english: "Research improves knowledge." },
{ word: "Lecture", arabic: "محاضرة", english: "The lecture explained the topic clearly." },
{ word: "Seminar", arabic: "ندوة", english: "The seminar focused on technology." },
{ word: "Professor", arabic: "أستاذ جامعي", english: "The professor teaches physics." },
{ word: "Exam", arabic: "امتحان", english: "The exam tests comprehension." }
],

Economics: [
{ word: "Supply", arabic: "العرض", english: "Supply refers to the quantity available." },
{ word: "Demand", arabic: "الطلب", english: "Demand is how much consumers want a product." },
{ word: "Inflation", arabic: "التضخم", english: "Inflation decreases the purchasing power of money." },
{ word: "GDP", arabic: "الناتج المحلي الإجمالي", english: "GDP measures a country's economic output." },
{ word: "Market", arabic: "سوق", english: "Markets determine prices and trade." },
{ word: "Investment", arabic: "استثمار", english: "Investment grows wealth over time." },
{ word: "Profit", arabic: "ربح", english: "Profit is revenue minus cost." },
{ word: "Revenue", arabic: "إيرادات", english: "Revenue is the total income of a company." },
{ word: "Economy", arabic: "اقتصاد", english: "The economy affects employment and trade." },
{ word: "Currency", arabic: "عملة", english: "Currency is the official money of a country." }
],

Psychology: [
{ word: "Cognition", arabic: "الإدراك", english: "Cognition involves thinking and understanding." },
{ word: "Behavior", arabic: "السلوك", english: "Behavior is how someone acts." },
{ word: "Perception", arabic: "إدراك", english: "Perception is the process of interpreting sensory input." },
{ word: "Memory", arabic: "ذاكرة", english: "Memory allows us to store and recall information." },
{ word: "Emotion", arabic: "عاطفة", english: "Emotions affect decisions and behavior." },
{ word: "Therapy", arabic: "علاج", english: "Therapy helps improve mental health." },
{ word: "Motivation", arabic: "دافع", english: "Motivation drives people to act." },
{ word: "Personality", arabic: "شخصية", english: "Personality shapes behavior and thinking." },
{ word: "Stress", arabic: "ضغط", english: "Stress affects physical and mental health." },
{ word: "Attention", arabic: "انتباه", english: "Attention focuses on important stimuli." }
],
// Add these to your existing vocabs object

History: [
{ word: "Revolution", arabic: "ثورة", english: "A revolution is a major political change." },
{ word: "Empire", arabic: "إمبراطورية", english: "An empire is a group of nations under one ruler." },
{ word: "Colony", arabic: "مستعمرة", english: "A colony is a territory controlled by another country." },
{ word: "Monarchy", arabic: "ملكية", english: "A monarchy is ruled by a king or queen." },
{ word: "Constitution", arabic: "دستور", english: "A constitution defines a country's laws and principles." },
{ word: "Democracy", arabic: "ديمقراطية", english: "Democracy is government by the people." },
{ word: "Civilization", arabic: "حضارة", english: "Civilization is the stage of human social development." },
{ word: "Treaty", arabic: "معاهدة", english: "A treaty is an agreement between countries." },
{ word: "Coliseum", arabic: "كولوسيوم", english: "The Coliseum is an ancient Roman arena." },
{ word: "Artifact", arabic: "أثر", english: "An artifact is an object made by humans." }
],

Literature: [
{ word: "Novel", arabic: "رواية", english: "A novel is a long fictional story." },
{ word: "Poetry", arabic: "شعر", english: "Poetry expresses ideas through verse." },
{ word: "Prose", arabic: "نثر", english: "Prose is ordinary written or spoken language." },
{ word: "Metaphor", arabic: "استعارة", english: "A metaphor compares two things without using 'like'." },
{ word: "Allegory", arabic: "رمزية", english: "An allegory conveys hidden meanings." },
{ word: "Narrative", arabic: "سرد", english: "A narrative tells a story." },
{ word: "Fiction", arabic: "خيال", english: "Fiction is literature created from imagination." },
{ word: "Drama", arabic: "دراما", english: "Drama is literature intended for performance." },
{ word: "Character", arabic: "شخصية", english: "A character is a person in a story." },
{ word: "Theme", arabic: "موضوع", english: "Theme is the central idea of a story." }
],

Geography: [
{ word: "Continent", arabic: "قارة", english: "A continent is a large landmass." },
{ word: "Country", arabic: "دولة", english: "A country is a nation with its own government." },
{ word: "Capital", arabic: "عاصمة", english: "The capital is the main city of a country." },
{ word: "River", arabic: "نهر", english: "A river flows into a larger body of water." },
{ word: "Mountain", arabic: "جبل", english: "A mountain is a large natural elevation of the earth." },
{ word: "Desert", arabic: "صحراء", english: "A desert is a dry, barren region." },
{ word: "Climate", arabic: "مناخ", english: "Climate is the weather in a region over time." },
{ word: "Island", arabic: "جزيرة", english: "An island is land surrounded by water." },
{ word: "Peninsula", arabic: "شبه جزيرة", english: "A peninsula is land surrounded by water on three sides." },
{ word: "Glacier", arabic: "نهر جليدي", english: "A glacier is a large, slow-moving ice mass." }
],

Art: [
{ word: "Painting", arabic: "رسم", english: "Painting is the practice of applying pigment to a surface." },
{ word: "Sculpture", arabic: "تمثال", english: "Sculpture is three-dimensional art." },
{ word: "Canvas", arabic: "قماش", english: "Canvas is the surface for painting." },
{ word: "Gallery", arabic: "معرض", english: "A gallery exhibits artworks." },
{ word: "Abstract", arabic: "مجرد", english: "Abstract art uses shapes and colors instead of realistic images." },
{ word: "Portrait", arabic: "صورة شخصية", english: "A portrait shows the likeness of a person." },
{ word: "Fresco", arabic: "جداري", english: "Fresco is a mural painting technique on wet plaster." },
{ word: "Exhibit", arabic: "عرض", english: "An exhibit displays artworks to the public." },
{ word: "Brushstroke", arabic: "ضربة فرشاة", english: "Brushstrokes show the artist's technique." },
{ word: "Medium", arabic: "وسيط", english: "Medium is the material used in creating art." }
],

Political_Science: [
{ word: "Government", arabic: "حكومة", english: "Government manages a country's affairs." },
{ word: "Policy", arabic: "سياسة", english: "Policy is a set of rules or plans." },
{ word: "Election", arabic: "انتخاب", english: "An election selects leaders." },
{ word: "Diplomacy", arabic: "دبلوماسية", english: "Diplomacy manages international relations." },
{ word: "Legislation", arabic: "تشريع", english: "Legislation refers to laws made by a government." },
{ word: "Constitution", arabic: "دستور", english: "A constitution sets the rules for government." },
{ word: "Citizen", arabic: "مواطن", english: "A citizen is a legally recognized member of a country." },
{ word: "Democracy", arabic: "ديمقراطية", english: "Democracy allows people to vote for leaders." },
{ word: "Autocracy", arabic: "حكم فردي", english: "Autocracy is government by a single ruler." },
{ word: "Judiciary", arabic: "القضاء", english: "The judiciary interprets and applies the law." }
],

Sociology: [
{ word: "Society", arabic: "مجتمع", english: "Society is a group of people living together." },
{ word: "Culture", arabic: "ثقافة", english: "Culture includes customs, beliefs, and art." },
{ word: "Norms", arabic: "معايير", english: "Norms are accepted social behaviors." },
{ word: "Roles", arabic: "أدوار", english: "Roles are expected behaviors in society." },
{ word: "Institution", arabic: "مؤسسة", english: "Institutions organize society, like schools or churches." },
{ word: "Socialization", arabic: "تنشئة اجتماعية", english: "Socialization teaches people norms and values." },
{ word: "Inequality", arabic: "عدم مساواة", english: "Inequality is unequal access to resources." },
{ word: "Demography", arabic: "علم السكان", english: "Demography studies populations and statistics." },
{ word: "Stratification", arabic: "تدرج اجتماعي", english: "Stratification divides society into layers." },
{ word: "Community", arabic: "مجتمع", english: "A community shares common interests or location." }
],

Technology: [
{ word: "Computer", arabic: "حاسوب", english: "A computer processes information electronically." },
{ word: "Software", arabic: "برمجيات", english: "Software controls a computer's operations." },
{ word: "Hardware", arabic: "عتاد", english: "Hardware is the physical part of a computer." },
{ word: "Internet", arabic: "إنترنت", english: "The internet connects computers globally." },
{ word: "Network", arabic: "شبكة", english: "A network links multiple devices." },
{ word: "Algorithm", arabic: "خوارزمية", english: "An algorithm is a set of instructions." },
{ word: "Database", arabic: "قاعدة بيانات", english: "A database stores organized information." },
{ word: "Artificial Intelligence", arabic: "ذكاء اصطناعي", english: "AI enables machines to learn." },
{ word: "Cybersecurity", arabic: "أمن المعلومات", english: "Cybersecurity protects digital data." },
{ word: "Robot", arabic: "روبوت", english: "A robot is a machine that performs tasks automatically." }
],
Law: [
{ word: "Attorney", arabic: "محامي", english: "An attorney represents clients in legal matters." },
{ word: "Trial", arabic: "محاكمة", english: "A trial is the process of examining evidence in court." },
{ word: "Verdict", arabic: "حكم", english: "The verdict is the final decision of a court." },
{ word: "Plaintiff", arabic: "مدعي", english: "The plaintiff brings a case against someone." },
{ word: "Defendant", arabic: "مدعى عليه", english: "The defendant defends against a legal claim." },
{ word: "Legislation", arabic: "تشريع", english: "Legislation consists of laws enacted by a government." },
{ word: "Constitution", arabic: "دستور", english: "The constitution defines the legal framework of a country." },
{ word: "Jury", arabic: "هيئة محلفين", english: "A jury decides the outcome of a trial." },
{ word: "Appeal", arabic: "استئناف", english: "An appeal asks a higher court to review a decision." },
{ word: "Rights", arabic: "حقوق", english: "Rights are legal entitlements guaranteed to individuals." }
],

Medicine: [
{ word: "Diagnosis", arabic: "تشخيص", english: "Diagnosis identifies a disease or condition." },
{ word: "Therapy", arabic: "علاج", english: "Therapy helps treat or manage illnesses." },
{ word: "Vaccine", arabic: "لقاح", english: "Vaccines protect against infections." },
{ word: "Surgery", arabic: "جراحة", english: "Surgery is the treatment of injuries or diseases by operation." },
{ word: "Prescription", arabic: "وصفة طبية", english: "A prescription is a doctor's written order for medicine." },
{ word: "Symptoms", arabic: "أعراض", english: "Symptoms indicate the presence of a disease." },
{ word: "Infection", arabic: "عدوى", english: "Infections are caused by bacteria or viruses." },
{ word: "Pharmacy", arabic: "صيدلية", english: "A pharmacy dispenses medications." },
{ word: "Immunity", arabic: "مناعة", english: "Immunity protects the body from disease." },
{ word: "Chronic", arabic: "مزمن", english: "Chronic diseases last for a long time." }
],

Philosophy: [
{ word: "Ethics", arabic: "أخلاقيات", english: "Ethics is the study of right and wrong." },
{ word: "Logic", arabic: "منطق", english: "Logic is the study of correct reasoning." },
{ word: "Metaphysics", arabic: "ميتافيزيقا", english: "Metaphysics explores the nature of reality." },
{ word: "Epistemology", arabic: "نظرية المعرفة", english: "Epistemology studies knowledge and belief." },
{ word: "Existentialism", arabic: "وجودية", english: "Existentialism focuses on individual freedom and choice." },
{ word: "Utilitarianism", arabic: "نفعية", english: "Utilitarianism evaluates actions by their outcomes." },
{ word: "Ontology", arabic: "علم الكينونة", english: "Ontology studies the nature of being." },
{ word: "Aesthetics", arabic: "جماليات", english: "Aesthetics examines beauty and artistic value." },
{ word: "Rationalism", arabic: "عقلانية", english: "Rationalism emphasizes reason over experience." },
{ word: "Skepticism", arabic: "شك", english: "Skepticism questions the certainty of knowledge." }
],

Astronomy: [
{ word: "Planet", arabic: "كوكب", english: "A planet orbits a star." },
{ word: "Star", arabic: "نجم", english: "A star is a luminous celestial body." },
{ word: "Galaxy", arabic: "مجرة", english: "A galaxy is a system of stars and planets." },
{ word: "Orbit", arabic: "مدار", english: "Planets follow an orbit around stars." },
{ word: "Asteroid", arabic: "كويكب", english: "Asteroids are small rocky objects in space." },
{ word: "Comet", arabic: "مذنب", english: "A comet has a nucleus and a tail." },
{ word: "Telescope", arabic: "تلسكوب", english: "A telescope observes distant celestial objects." },
{ word: "Constellation", arabic: "كوكبة", english: "Constellations are patterns of stars." },
{ word: "Black Hole", arabic: "ثقب أسود", english: "A black hole has gravity so strong that nothing escapes." },
{ word: "Exoplanet", arabic: "كوكب خارجي", english: "Exoplanets orbit stars outside our solar system." }
],

Business: [
{ word: "Entrepreneur", arabic: "رائد أعمال", english: "An entrepreneur starts and manages businesses." },
{ word: "Investment", arabic: "استثمار", english: "Investment involves putting money into assets for profit." },
{ word: "Market", arabic: "سوق", english: "A market is where goods and services are traded." },
{ word: "Revenue", arabic: "إيرادات", english: "Revenue is the income from business activities." },
{ word: "Profit", arabic: "ربح", english: "Profit is revenue minus expenses." },
{ word: "Startup", arabic: "شركة ناشئة", english: "A startup is a newly founded business." },
{ word: "Management", arabic: "إدارة", english: "Management organizes and directs business operations." },
{ word: "Strategy", arabic: "استراتيجية", english: "A strategy is a plan to achieve goals." },
{ word: "Finance", arabic: "تمويل", english: "Finance deals with money and investments." },
{ word: "Negotiation", arabic: "تفاوض", english: "Negotiation is the process of reaching agreements." }
],


// Remaining topics: History, Literature, Geography, Art, Political Science, Sociology, Technology, Law, Medicine, Philosophy, Astronomy, Business
};

export default vocabs;
