export interface Comment {
  id: string
  username: string
  avatar: string
  text: string
  likes: number
  timeAgo: string
}

export interface NewsPost {
  id: string
  image: string
  authorName: string
  authorAvatar: string
  tags: string[]
  headline: string
  description: string
  isFake: boolean
  explanation: string
  comments: Comment[]
}

export type Verdict = 'fact' | 'fake'

export const NEWS_POSTS: NewsPost[] = [
  // ── Level 1: Easy ──────────────────────────────────────────────
  {
    id: '1',
    image: 'https://picsum.photos/seed/tech1/800/1200',
    authorName: 'TechCrunch Daily',
    authorAvatar: 'https://i.pravatar.cc/80?img=1',
    tags: ['Technology', 'AI'],
    headline: 'Scientists develop AI that can detect lies with 94% accuracy',
    description:
      'A team at MIT claims to have built a machine-learning model that analyzes micro-expressions and voice patterns to detect deception nearly as well as a trained polygraph examiner — but in real time via a smartphone camera.',
    isFake: true,
    explanation:
      "Fake! No AI has achieved 94% lie-detection accuracy. Real polygraphs only hover around 80% and are inadmissible in most courts. This headline exploits our fear of surveillance tech to generate clicks.",
    comments: [
      { id: 'c1', username: 'skeptic_sam', avatar: 'https://i.pravatar.cc/40?img=11', text: "94%? That's suspiciously precise. Smells fake to me 🚨", likes: 342, timeAgo: '2h' },
      { id: 'c2', username: 'AI_believer', avatar: 'https://i.pravatar.cc/40?img=12', text: "MIT is top-tier, I totally believe this could be real!", likes: 89, timeAgo: '1h' },
      { id: 'c3', username: 'dr_neural', avatar: 'https://i.pravatar.cc/40?img=13', text: "As an ML researcher — this is nonsense. Micro-expressions are not reliable lie indicators.", likes: 521, timeAgo: '45m' },
      { id: 'c4', username: 'paranoid_pete', avatar: 'https://i.pravatar.cc/40?img=14', text: "They're training AI on us RIGHT NOW through our phones!", likes: 44, timeAgo: '30m' },
    ],
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/space2/800/1200',
    authorName: 'NASA Science',
    authorAvatar: 'https://i.pravatar.cc/80?img=2',
    tags: ['Space', 'Astronomy'],
    headline: 'The Moon is slowly drifting away from Earth at 3.8 cm per year',
    description:
      'Using laser retroreflectors placed on the lunar surface during the Apollo missions, scientists have confirmed that the Moon recedes from Earth by approximately 3.8 centimeters annually — a phenomenon caused by tidal interactions that transfer angular momentum from Earth\'s rotation to the Moon\'s orbit.',
    isFake: false,
    explanation:
      "True! This is a well-established scientific fact confirmed by decades of laser ranging experiments. The Moon has been slowly drifting away since it formed ~4.5 billion years ago.",
    comments: [
      { id: 'c1', username: 'astro_nerd', avatar: 'https://i.pravatar.cc/40?img=21', text: "Classic Apollo science — this is 100% verified fact ✅", likes: 678, timeAgo: '3h' },
      { id: 'c2', username: 'flat_earther99', avatar: 'https://i.pravatar.cc/40?img=22', text: "If the moon is leaving, why can I still see it the same size every night? 🤔", likes: 12, timeAgo: '2h' },
      { id: 'c3', username: 'physics_prof', avatar: 'https://i.pravatar.cc/40?img=23', text: "Tidal locking + angular momentum transfer. Textbook stuff.", likes: 203, timeAgo: '1h' },
    ],
  },

  // ── Level 2 ─────────────────────────────────────────────────────
  {
    id: '3',
    image: 'https://picsum.photos/seed/health3/800/1200',
    authorName: 'HealthTrend News',
    authorAvatar: 'https://i.pravatar.cc/80?img=3',
    tags: ['Health', 'Nutrition'],
    headline: 'Drinking coffee before bed actually improves deep sleep quality, study finds',
    description:
      'A new study published in the journal Sleep Medicine claims that a small cup of espresso 30 minutes before bedtime increased participants\' deep sleep duration by 18% over four weeks. The researchers suggest caffeine may suppress a specific stress hormone during REM cycles in certain individuals.',
    isFake: true,
    explanation:
      "Fake! Caffeine is a well-studied stimulant that consistently delays and reduces sleep quality. No credible study supports this claim. Always check if a study was peer-reviewed and replicated before sharing.",
    comments: [
      { id: 'c1', username: 'coffee_addict', avatar: 'https://i.pravatar.cc/40?img=31', text: "This is what I WANT to believe 😂 but my body says otherwise", likes: 891, timeAgo: '5h' },
      { id: 'c2', username: 'sleep_doc', avatar: 'https://i.pravatar.cc/40?img=32', text: "Absolutely false. Caffeine has a 5-6 hour half-life and disrupts sleep architecture.", likes: 1200, timeAgo: '4h' },
      { id: 'c3', username: 'nightowl_2am', avatar: 'https://i.pravatar.cc/40?img=33', text: "I drink coffee at midnight and sleep fine... or do I? 🤔", likes: 234, timeAgo: '3h' },
    ],
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/ocean4/800/1200',
    authorName: 'Ocean Science Journal',
    authorAvatar: 'https://i.pravatar.cc/80?img=4',
    tags: ['Nature', 'Marine Biology'],
    headline: 'Octopuses have three hearts and blue blood',
    description:
      'Octopuses possess three hearts: two branchial hearts pump blood through the gills, while a systemic heart circulates it throughout the body. Their blood contains hemocyanin — a copper-based protein that turns blue when oxygenated — unlike the iron-based hemoglobin found in most vertebrates. Interestingly, the systemic heart stops beating when an octopus swims, which is why they prefer crawling.',
    isFake: false,
    explanation:
      "True! Octopuses really do have 3 hearts and blue blood (hemocyanin). This is a fascinating, well-documented biological fact — a great reminder that truth can be stranger than fiction.",
    comments: [
      { id: 'c1', username: 'bio_queen', avatar: 'https://i.pravatar.cc/40?img=41', text: "I learned this in 6th grade! Pure fact. 💙", likes: 445, timeAgo: '6h' },
      { id: 'c2', username: 'skeptic_always', avatar: 'https://i.pravatar.cc/40?img=42', text: "Sounds too wild to be true... but then again, biology is wild", likes: 88, timeAgo: '5h' },
      { id: 'c3', username: 'marine_bio_nerd', avatar: 'https://i.pravatar.cc/40?img=43', text: "The part about the systemic heart stopping during swimming is also real!", likes: 312, timeAgo: '4h' },
    ],
  },

  // ── Level 3 ─────────────────────────────────────────────────────
  {
    id: '5',
    image: 'https://picsum.photos/seed/city5/800/1200',
    authorName: 'GlobalPolicy Watch',
    authorAvatar: 'https://i.pravatar.cc/80?img=5',
    tags: ['Politics', 'Digital Rights'],
    headline: 'EU proposes mandatory "digital sobriety breaks" — 15 minutes offline every 2 hours',
    description:
      'The European Commission is reportedly drafting legislation that would require all app developers to forcibly disconnect users after two consecutive hours of scrolling, citing mental health concerns and digital addiction studies. Critics argue this would violate personal autonomy, while supporters say it mirrors existing tobacco regulation frameworks.',
    isFake: true,
    explanation:
      "Fake! The EU has proposed various digital regulations (DSA, DMA), but no such 'mandatory offline break' law exists or has been drafted. This plays on real EU digital regulation anxiety to seem plausible.",
    comments: [
      { id: 'c1', username: 'eu_watcher', avatar: 'https://i.pravatar.cc/40?img=51', text: "I can see the EU doing this honestly... but I haven't seen any official source 🤔", likes: 567, timeAgo: '8h' },
      { id: 'c2', username: 'lib_freedom', avatar: 'https://i.pravatar.cc/40?img=52', text: "GOVERNMENT CONTROLLING MY SCREEN TIME — this is tyranny!!!", likes: 234, timeAgo: '7h' },
      { id: 'c3', username: 'policy_analyst', avatar: 'https://i.pravatar.cc/40?img=53', text: "This would never survive a legal challenge under ECHR Article 10. Fiction.", likes: 412, timeAgo: '6h' },
      { id: 'c4', username: 'app_dev_mk', avatar: 'https://i.pravatar.cc/40?img=54', text: "As a developer in the EU — ZERO official communication about this.", likes: 678, timeAgo: '5h' },
    ],
  },
  {
    id: '6',
    image: 'https://picsum.photos/seed/brain6/800/1200',
    authorName: 'Neuroscience Today',
    authorAvatar: 'https://i.pravatar.cc/80?img=6',
    tags: ['Science', 'Neuroscience'],
    headline: 'Humans use only 10% of their brain at any given time',
    description:
      'This widely repeated claim has been cited by self-help gurus, Hollywood films, and even some educators for decades. Neuroimaging studies are frequently misinterpreted to suggest large portions of the brain sit dormant — a premise underlying many "unlock your full potential" wellness products and courses.',
    isFake: true,
    explanation:
      "Fake! This is one of the most persistent neuroscience myths. Brain imaging shows we use virtually all of our brain — different regions activate at different times, but no area is permanently idle. The origin of the myth is unclear, possibly misattributed to Einstein.",
    comments: [
      { id: 'c1', username: 'movie_lover', avatar: 'https://i.pravatar.cc/40?img=61', text: "Wait, but the movie Lucy said— oh. OH. 😅", likes: 1102, timeAgo: '10h' },
      { id: 'c2', username: 'neuro_prof', avatar: 'https://i.pravatar.cc/40?img=62', text: "This myth will outlive us all. PET scans debunked this definitively in the 90s.", likes: 890, timeAgo: '9h' },
      { id: 'c3', username: 'wellness_guru', avatar: 'https://i.pravatar.cc/40?img=63', text: "Science can't measure spiritual potential 🌟", likes: 56, timeAgo: '8h' },
    ],
  },

  // ── Level 4 ─────────────────────────────────────────────────────
  {
    id: '7',
    image: 'https://picsum.photos/seed/climate7/800/1200',
    authorName: 'Climate Monitor',
    authorAvatar: 'https://i.pravatar.cc/80?img=7',
    tags: ['Climate', 'Environment'],
    headline: 'Antarctica gained more ice last year than it lost, new satellite data shows',
    description:
      'A new analysis of CryoSat-2 satellite data, quoted in several conservative news outlets, claims that Antarctic ice sheet mass increased by 82 gigatons last year. The report draws on a 2015 NASA study that found snowfall accumulation in East Antarctica temporarily offset losses elsewhere, suggesting the continent\'s ice balance is more complex than previously reported.',
    isFake: true,
    explanation:
      "Misleading/Fake! The 2015 NASA paper is real, but it was widely misrepresented. Overall, Antarctica is losing ice mass at an accelerating rate. Short-term or regional snowfall gains don't negate long-term structural ice loss. This is a classic 'real data, false conclusion' disinformation technique.",
    comments: [
      { id: 'c1', username: 'climate_hawk', avatar: 'https://i.pravatar.cc/40?img=71', text: "This cherry-picks a single year and ignores the 40-year trend. FAKE.", likes: 732, timeAgo: '12h' },
      { id: 'c2', username: 'iceman99', avatar: 'https://i.pravatar.cc/40?img=72', text: "But the NASA study IS real... so how is this fake? Genuine question", likes: 218, timeAgo: '11h' },
      { id: 'c3', username: 'glaciologist', avatar: 'https://i.pravatar.cc/40?img=73', text: "The real study was about snowfall in East Antarctica ONLY. Total ice loss continues accelerating.", likes: 943, timeAgo: '10h' },
      { id: 'c4', username: 'media_skeptic', avatar: 'https://i.pravatar.cc/40?img=74', text: "This is WHY you always check the original source, not just headlines.", likes: 654, timeAgo: '9h' },
    ],
  },
  {
    id: '8',
    image: 'https://picsum.photos/seed/food8/800/1200',
    authorName: 'FoodScience Weekly',
    authorAvatar: 'https://i.pravatar.cc/80?img=8',
    tags: ['Food', 'Science'],
    headline: 'Honey never expires — archaeologists found 3,000-year-old edible honey in Egyptian tombs',
    description:
      'During excavations of ancient Egyptian tombs, archaeologists discovered sealed pottery containing honey estimated to be over 3,000 years old. When tested, the honey was still in edible condition — a result attributed to honey\'s naturally low moisture content, acidic pH (3.2–4.5), and hydrogen peroxide production, which together create an environment hostile to bacteria and microorganisms.',
    isFake: false,
    explanation:
      "True! Honey's unique chemical properties — low water activity, acidity, and antimicrobial compounds — allow it to last virtually indefinitely when stored sealed and dry. Multiple archaeological finds confirm this.",
    comments: [
      { id: 'c1', username: 'history_foodie', avatar: 'https://i.pravatar.cc/40?img=81', text: "I've heard this before and it's absolutely true! Nature's perfect preservative 🍯", likes: 1345, timeAgo: '14h' },
      { id: 'c2', username: 'conspiracy_carl', avatar: 'https://i.pravatar.cc/40?img=82', text: "They would NOT tell us if 3000yo honey killed someone lol", likes: 334, timeAgo: '13h' },
      { id: 'c3', username: 'chem_teacher', avatar: 'https://i.pravatar.cc/40?img=83', text: "The chemistry is solid: water activity below 0.6 prevents microbial growth. This is real.", likes: 567, timeAgo: '12h' },
    ],
  },

  // ── Level 5 ─────────────────────────────────────────────────────
  {
    id: '9',
    image: 'https://picsum.photos/seed/finance9/800/1200',
    authorName: 'Bloomberg Insider',
    authorAvatar: 'https://i.pravatar.cc/80?img=9',
    tags: ['Finance', 'Crypto'],
    headline: 'BlackRock quietly allocated 15% of its flagship fund to Bitcoin in Q3',
    description:
      'According to leaked internal documents reviewed by three unnamed sources familiar with the matter, BlackRock — the world\'s largest asset manager with over $10 trillion AUM — secretly shifted a significant portion of its iShares Core S&P 500 ETF into Bitcoin holdings during the third quarter. If true, this would represent the largest institutional Bitcoin adoption in history.',
    isFake: true,
    explanation:
      "Fake! BlackRock does offer Bitcoin ETFs, which makes this story feel plausible, but the iShares Core S&P 500 ETF cannot hold Bitcoin by regulatory mandate. 'Unnamed sources' and 'leaked documents' are classic red flags for financial disinformation designed to manipulate crypto markets.",
    comments: [
      { id: 'c1', username: 'crypto_bro', avatar: 'https://i.pravatar.cc/40?img=91', text: "TO THE MOON 🚀🚀🚀 this is the signal we've been waiting for!", likes: 2341, timeAgo: '16h' },
      { id: 'c2', username: 'sec_attorney', avatar: 'https://i.pravatar.cc/40?img=92', text: "S&P 500 ETFs have strict mandates. This is legally impossible and obviously fake.", likes: 1102, timeAgo: '15h' },
      { id: 'c3', username: 'retail_investor', avatar: 'https://i.pravatar.cc/40?img=93', text: "I bought more BTC after reading this... should I be worried?", likes: 445, timeAgo: '14h' },
      { id: 'c4', username: 'fin_journalist', avatar: 'https://i.pravatar.cc/40?img=94', text: "'Unnamed sources familiar with the matter' = zero credibility. Always demand names.", likes: 876, timeAgo: '13h' },
    ],
  },
  {
    id: '10',
    image: 'https://picsum.photos/seed/history10/800/1200',
    authorName: 'History Channel',
    authorAvatar: 'https://i.pravatar.cc/80?img=10',
    tags: ['History', 'Myths'],
    headline: 'Napoleon Bonaparte was not actually short — he was 5\'7", average for his era',
    description:
      'The famous image of Napoleon as a diminutive tyrant is largely a British propaganda invention. French records show Napoleon stood approximately 5\'7" (170 cm) — above average for a French man of the 18th century. The confusion arose from a misunderstanding between French and British measurement units: he was 5\'2" in French inches (pouces), which translates to 5\'7" in Imperial inches, but British cartoonists took the smaller figure literally.',
    isFake: false,
    explanation:
      "True! Napoleon's 'short' reputation is one of history's most enduring myths. He was actually of average-to-above-average height for his time. The myth was amplified by British wartime propaganda, especially the caricatures of James Gillray.",
    comments: [
      { id: 'c1', username: 'history_buff', avatar: 'https://i.pravatar.cc/40?img=11', text: "This is one of my favorite historical myths to correct at parties 😂", likes: 2102, timeAgo: '20h' },
      { id: 'c2', username: 'brit_proud', avatar: 'https://i.pravatar.cc/40?img=12', text: "Still not buying it. My textbook says he was short.", likes: 123, timeAgo: '18h' },
      { id: 'c3', username: 'eu_historian', avatar: 'https://i.pravatar.cc/40?img=13', text: "Confirmed by the Archives nationales in Paris. 5'7\" in modern units.", likes: 876, timeAgo: '17h' },
    ],
  },

  // ── Level 6 ─────────────────────────────────────────────────────
  {
    id: '11',
    image: 'https://picsum.photos/seed/pharma11/800/1200',
    authorName: 'MedAlert Daily',
    authorAvatar: 'https://i.pravatar.cc/80?img=11',
    tags: ['Health', 'Pharmaceuticals'],
    headline: 'Major pharma company suppressed 10-year cancer cure study to protect profits',
    description:
      'A whistleblower claiming to be a former Pfizer research director has released documents to a Substack newsletter alleging that a breakthrough treatment eliminating 87% of solid tumors in Phase II trials was shelved after internal analysis showed it would cannibalize $40 billion in annual oncology revenue. The company denies the claims. The documents have not been independently verified.',
    isFake: true,
    explanation:
      "Almost certainly fake. While pharmaceutical companies do make profit-driven decisions, suppressing an 87% effective cancer cure would be logistically impossible — competing companies, academic researchers, and international regulators would replicate the trials. 'Unverified documents' on a Substack from an anonymous source is a classic disinformation pattern.",
    comments: [
      { id: 'c1', username: 'big_pharma_skeptic', avatar: 'https://i.pravatar.cc/40?img=21', text: "We KNOW they do this. I believe every word.", likes: 3421, timeAgo: '1d' },
      { id: 'c2', username: 'oncologist_real', avatar: 'https://i.pravatar.cc/40?img=22', text: "If this worked, researchers in 50 other countries would have replicated it. This is fantasy.", likes: 2109, timeAgo: '23h' },
      { id: 'c3', username: 'conspiracy_queen', avatar: 'https://i.pravatar.cc/40?img=23', text: "The fact that it's unverified is exactly what THEY want you to think 🧐", likes: 567, timeAgo: '22h' },
      { id: 'c4', username: 'bioethics_phd', avatar: 'https://i.pravatar.cc/40?img=24', text: "Also: Phase II trials involve hundreds of patients. You cannot suppress this. People talk.", likes: 1890, timeAgo: '21h' },
    ],
  },
  {
    id: '12',
    image: 'https://picsum.photos/seed/physics12/800/1200',
    authorName: 'CERN Press Office',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    tags: ['Physics', 'Science'],
    headline: 'Time passes slower for people who live at higher altitudes, GPS satellites must correct for this',
    description:
      'General relativity predicts — and GPS technology confirms — that clocks at higher altitudes (farther from Earth\'s gravitational field) tick slightly faster than those at sea level. GPS satellites orbit at ~20,200 km altitude and experience roughly 45 microseconds of extra time per day due to gravitational time dilation, partly offset by ~7 microseconds lost to special relativistic effects from their orbital speed, resulting in a net correction of ~38 microseconds daily applied to all GPS signals.',
    isFake: false,
    explanation:
      "True! This is real, measurable physics. Without relativistic time corrections, GPS would accumulate ~10 km of positional error per day. Einstein's relativity is not just theory — it's embedded in technology we use every day.",
    comments: [
      { id: 'c1', username: 'physics_lover', avatar: 'https://i.pravatar.cc/40?img=31', text: "This is my go-to proof that relativity is real when people say it's 'just theory'", likes: 4532, timeAgo: '2d' },
      { id: 'c2', username: 'flat_logic', avatar: 'https://i.pravatar.cc/40?img=32', text: "GPS works fine for me every day and I don't see any time machines", likes: 34, timeAgo: '1d' },
      { id: 'c3', username: 'engineer_anna', avatar: 'https://i.pravatar.cc/40?img=33', text: "I helped calibrate GPS receivers. The relativistic correction is literally in our codebase.", likes: 3201, timeAgo: '1d' },
    ],
  },

  // ── Level 7 ─────────────────────────────────────────────────────
  {
    id: '13',
    image: 'https://picsum.photos/seed/social13/800/1200',
    authorName: 'Digital Trends',
    authorAvatar: 'https://i.pravatar.cc/80?img=13',
    tags: ['Technology', 'Social Media'],
    headline: 'Meta\'s algorithm intentionally shows users more upsetting content to increase engagement',
    description:
      'Internal Meta research documents, leaked to The Wall Street Journal in 2021 and confirmed in subsequent Congressional testimony, showed that company researchers found Instagram could make body image issues worse for teen girls. Additionally, a 2012 internal experiment deliberately manipulated the emotional tone of 700,000 users\' feeds — reducing positive posts to study whether negative emotions "spread." The study was published in PNAS without user consent notification.',
    isFake: false,
    explanation:
      "True — and disturbing. The emotional contagion study is real (PNAS 2014), the WSJ Instagram files are real, and the Congressional testimony occurred. Meta has long known its algorithms can amplify negative emotions to maximize engagement time. This is verified investigative journalism, not conspiracy theory.",
    comments: [
      { id: 'c1', username: 'journalist_kate', avatar: 'https://i.pravatar.cc/40?img=41', text: "The WSJ Files are PUBLIC RECORD. This is 100% verifiable fact.", likes: 5612, timeAgo: '2d' },
      { id: 'c2', username: 'meta_defender', avatar: 'https://i.pravatar.cc/40?img=42', text: "All platforms do this. At least Meta published the research.", likes: 234, timeAgo: '2d' },
      { id: 'c3', username: 'teen_parent', avatar: 'https://i.pravatar.cc/40?img=43', text: "This is why I'm deleting my daughter's account.", likes: 2341, timeAgo: '1d' },
      { id: 'c4', username: 'tech_ethicist', avatar: 'https://i.pravatar.cc/40?img=44', text: "Experimenting on 700k users without consent violates research ethics. Full stop.", likes: 4102, timeAgo: '1d' },
    ],
  },
  {
    id: '14',
    image: 'https://picsum.photos/seed/neuro14/800/1200',
    authorName: 'Psychological Science',
    authorAvatar: 'https://i.pravatar.cc/80?img=14',
    tags: ['Psychology', 'Neuroscience'],
    headline: 'Stanford study confirms: Multitasking reduces IQ more than smoking marijuana',
    description:
      'A frequently cited "Stanford study" claims that multitasking causes a 10-point IQ drop — greater than the 4-point average drop associated with marijuana intoxication. This statistic has been repeated by productivity books, TED Talks, and business schools worldwide. The comparison has been used to argue that open-plan offices and constant email notifications represent a cognitive crisis in modern workplaces.',
    isFake: true,
    explanation:
      "Misleading. The original 2005 study by Glenn Wilson for HP found a temporary IQ drop during interruptions — not a structural reduction in intelligence. The marijuana comparison was added by journalists and misattributed to Stanford, which did not conduct the study. The actual findings were also never published in a peer-reviewed journal.",
    comments: [
      { id: 'c1', username: 'productivity_coach', avatar: 'https://i.pravatar.cc/40?img=51', text: "I've been citing this in every workshop for 5 years... 😬", likes: 3421, timeAgo: '3d' },
      { id: 'c2', username: 'psych_researcher', avatar: 'https://i.pravatar.cc/40?img=52', text: "The HP study was real but it was a tiny corporate-funded survey, not a Stanford peer-reviewed study.", likes: 2890, timeAgo: '3d' },
      { id: 'c3', username: 'candid_user', avatar: 'https://i.pravatar.cc/40?img=53', text: "Feels true even if the specific numbers are wrong lol", likes: 1102, timeAgo: '2d' },
    ],
  },

  // ── Level 8 ─────────────────────────────────────────────────────
  {
    id: '15',
    image: 'https://picsum.photos/seed/biology15/800/1200',
    authorName: 'Nature Magazine',
    authorAvatar: 'https://i.pravatar.cc/80?img=15',
    tags: ['Biology', 'Genetics'],
    headline: 'Humans share 50% of their DNA with bananas',
    description:
      'Comparative genomics studies have found that approximately 50% of human DNA sequences are shared with banana plants (Musa species). This is because both organisms share fundamental cellular machinery — genes responsible for basic processes like cell division, DNA replication, and energy metabolism have been conserved across hundreds of millions of years of evolution. The shared genes are not random but represent core biological infrastructure common to almost all eukaryotic life.',
    isFake: false,
    explanation:
      "True! This surprising fact reflects the deep evolutionary history of DNA. The 50% figure refers to functional gene sequences, not appearance or behavior. It illustrates how conserved fundamental life processes are across all kingdoms of life.",
    comments: [
      { id: 'c1', username: 'biology_teacher', avatar: 'https://i.pravatar.cc/40?img=61', text: "I use this exact fact to open my genetics unit every year. Students are always shocked!", likes: 4231, timeAgo: '4d' },
      { id: 'c2', username: 'bananaphone', avatar: 'https://i.pravatar.cc/40?img=62', text: "So when I eat a banana am I... committing DNA theft?? 🍌", likes: 5601, timeAgo: '3d' },
      { id: 'c3', username: 'creationist_bob', avatar: 'https://i.pravatar.cc/40?img=63', text: "This is evolutionist propaganda. I am NOT related to a banana.", likes: 234, timeAgo: '3d' },
      { id: 'c4', username: 'genomics_phd', avatar: 'https://i.pravatar.cc/40?img=64', text: "We also share ~60% with fruit flies and ~85% with mice. Evolution is wild.", likes: 3102, timeAgo: '2d' },
    ],
  },
  {
    id: '16',
    image: 'https://picsum.photos/seed/economy16/800/1200',
    authorName: 'Reuters Economy',
    authorAvatar: 'https://i.pravatar.cc/80?img=16',
    tags: ['Economics', 'Policy'],
    headline: 'Finland\'s universal basic income trial showed participants worked MORE, not less',
    description:
      'Finland\'s 2017–2018 UBI experiment provided 2,000 unemployed citizens with €560/month unconditionally for two years. A government-commissioned report found that recipients worked slightly more hours than the control group, reported significantly better wellbeing, mental health, and trust in institutions. Critics note the sample was limited to unemployed individuals and cannot be generalized to employed workers or higher income levels.',
    isFake: false,
    explanation:
      "True! The Finnish experiment results are documented and published. However, the finding that participants worked more is often overstated — the increase was modest and statistically significant mainly in 2018. The wellbeing improvements were more consistently robust. Context matters in policy research.",
    comments: [
      { id: 'c1', username: 'ubi_advocate', avatar: 'https://i.pravatar.cc/40?img=71', text: "The evidence is THERE. Why aren't all governments doing this?!", likes: 6234, timeAgo: '5d' },
      { id: 'c2', username: 'fiscal_hawk', avatar: 'https://i.pravatar.cc/40?img=72', text: "2000 unemployed people ≠ a scalable national policy. The numbers don't work at scale.", likes: 2109, timeAgo: '5d' },
      { id: 'c3', username: 'policy_wonk', avatar: 'https://i.pravatar.cc/40?img=73', text: "The study is real but the conclusions are more nuanced than headlines suggest. Both sides oversimplify.", likes: 3401, timeAgo: '4d' },
    ],
  },

  // ── Level 9 (Expert) ────────────────────────────────────────────
  {
    id: '17',
    image: 'https://picsum.photos/seed/astro17/800/1200',
    authorName: 'Astronomy Now',
    authorAvatar: 'https://i.pravatar.cc/80?img=17',
    tags: ['Astronomy', 'Space'],
    headline: 'The James Webb Space Telescope detected a potential biosignature in the atmosphere of exoplanet K2-18b',
    description:
      'In 2023, NASA announced that JWST detected dimethyl sulfide (DMS) — a molecule on Earth produced almost exclusively by marine phytoplankton — in the atmosphere of K2-18b, a sub-Neptune world 120 light-years away in its star\'s habitable zone. The discovery was published in Nature Astronomy by Cambridge researchers. Scientists cautioned the detection is at 3-sigma confidence (not the 5-sigma gold standard for discovery), the signal could have abiotic sources, and the planet\'s nature remains highly uncertain.',
    isFake: false,
    explanation:
      "True — with important caveats! The JWST detection and the Nature Astronomy paper are real. However, 'potential biosignature' is appropriately tentative language that many headlines dropped. The 3-sigma confidence and the possibility of non-biological DMS sources mean this is exciting, not conclusive.",
    comments: [
      { id: 'c1', username: 'astro_twitter', avatar: 'https://i.pravatar.cc/40?img=81', text: "3-sigma ≠ discovery. Exciting but not confirmed. Media went way too far with this one.", likes: 4521, timeAgo: '6d' },
      { id: 'c2', username: 'aliens_believer', avatar: 'https://i.pravatar.cc/40?img=82', text: "WE ARE NOT ALONE 👽👽👽 FINALLY THEY ADMIT IT", likes: 12045, timeAgo: '6d' },
      { id: 'c3', username: 'cambridge_researcher', avatar: 'https://i.pravatar.cc/40?img=83', text: "I work in this field. The paper is real and careful. The media coverage was irresponsible.", likes: 7823, timeAgo: '5d' },
      { id: 'c4', username: 'patient_scientist', avatar: 'https://i.pravatar.cc/40?img=84', text: "Science at the frontier: real finding + huge uncertainty + irresponsible headlines = public confusion. 🤦", likes: 5102, timeAgo: '5d' },
    ],
  },
  {
    id: '18',
    image: 'https://picsum.photos/seed/ai18/800/1200',
    authorName: 'Wired Magazine',
    authorAvatar: 'https://i.pravatar.cc/80?img=18',
    tags: ['AI', 'Technology'],
    headline: 'GPT-4 secretly passed the bar exam, medical licensing test, and Mensa IQ threshold',
    description:
      'OpenAI\'s GPT-4 Technical Report documented performance on standardized tests: GPT-4 scored in the 90th percentile of the Uniform Bar Exam, outperformed 90% of test-takers on the USMLE (medical licensing), and scored above the Mensa threshold on several IQ proxy assessments. These results are real, verified, and published by OpenAI. The word "secretly" in the framing is, however, inaccurate — OpenAI disclosed all results publicly in its technical report.',
    isFake: false,
    explanation:
      "True (with a framing note)! GPT-4 genuinely passed these benchmarks — it's all in OpenAI's publicly released Technical Report. The performance is real, though experts debate what it means for 'intelligence.' The headline's use of 'secretly' is misleading, since OpenAI published everything openly.",
    comments: [
      { id: 'c1', username: 'ai_researcher', avatar: 'https://i.pravatar.cc/40?img=91', text: "The benchmarks are real and public. The word 'secretly' is the only false part of the headline.", likes: 6102, timeAgo: '7d' },
      { id: 'c2', username: 'lawyer_lisa', avatar: 'https://i.pravatar.cc/40?img=92', text: "I'm studying for the bar right now and this is not making me feel better 😭", likes: 8234, timeAgo: '7d' },
      { id: 'c3', username: 'tech_critic', avatar: 'https://i.pravatar.cc/40?img=93', text: "Benchmark performance ≠ actual competence. These tests weren't designed for LLMs.", likes: 4512, timeAgo: '6d' },
    ],
  },

  // ── Level 10 (Expert — hardest) ──────────────────────────────────
  {
    id: '19',
    image: 'https://picsum.photos/seed/quantum19/800/1200',
    authorName: 'MIT Technology Review',
    authorAvatar: 'https://i.pravatar.cc/80?img=19',
    tags: ['Quantum Computing', 'Cryptography'],
    headline: 'Google\'s quantum computer cracked RSA-2048 encryption in 8 minutes',
    description:
      'Following Google\'s announcement of its Willow quantum chip in December 2024 — which solved a benchmark computation in under 5 minutes that would take classical supercomputers 10 septillion years — several outlets reported that RSA-2048 encryption was now broken. Google\'s actual paper described a random circuit sampling benchmark unrelated to cryptographic tasks. Cracking RSA-2048 would require millions of error-corrected logical qubits; the Willow chip has 105 physical qubits with high error rates.',
    isFake: true,
    explanation:
      "Fake! The Willow chip announcement was real and genuinely impressive — but it did NOT crack RSA-2048. That benchmark was specifically designed to be hard for classical computers, not for real-world cryptographic attacks. Breaking RSA-2048 requires a fault-tolerant quantum computer we don't have and won't have for at least a decade by conservative estimates. This is a perfect example of real news being catastrophically misreported.",
    comments: [
      { id: 'c1', username: 'crypto_dev', avatar: 'https://i.pravatar.cc/40?img=11', text: "I saw this headline and immediately checked my bank app 😂 It's fake. Willow ≠ cryptographic threat.", likes: 8912, timeAgo: '8d' },
      { id: 'c2', username: 'quantum_physicist', avatar: 'https://i.pravatar.cc/40?img=12', text: "Willow is genuinely impressive. But it's solving random circuit sampling, not Shor's algorithm at scale.", likes: 7234, timeAgo: '8d' },
      { id: 'c3', username: 'panic_mode', avatar: 'https://i.pravatar.cc/40?img=13', text: "I transferred all my savings to gold after reading this. Nobody correct me.", likes: 5601, timeAgo: '7d' },
      { id: 'c4', username: 'nist_engineer', avatar: 'https://i.pravatar.cc/40?img=14', text: "NIST has been preparing post-quantum standards for years. Even if a real threat emerged, we'd have time to migrate.", likes: 4102, timeAgo: '7d' },
    ],
  },
  {
    id: '20',
    image: 'https://picsum.photos/seed/consciousness20/800/1200',
    authorName: 'Scientific American',
    authorAvatar: 'https://i.pravatar.cc/80?img=20',
    tags: ['Neuroscience', 'Consciousness'],
    headline: 'Scientists prove consciousness continues for up to 10 minutes after clinical death',
    description:
      'A 2023 study published in PNAS from researchers at NYU Langone tracked brain activity in cardiac arrest patients during CPR. EEG recordings showed surges of gamma wave activity — associated with conscious awareness — in some patients after cardiac arrest, lasting longer than previously recorded. Separately, a 2022 University of Michigan animal study found similar gamma wave surges in dying rats. "Proves consciousness continues" significantly overstates what the studies demonstrate — they document unusual electrical activity, not verified subjective experience.',
    isFake: true,
    explanation:
      "Misleading. The studies are real and fascinating, but 'proves consciousness continues after death' is a massive overstatement. Measuring gamma waves doesn't confirm subjective experience — it detects electrical activity. The researchers themselves explicitly cautioned against over-interpretation. The gap between 'unusual brain activity' and 'conscious experience' is enormous and philosophically contested.",
    comments: [
      { id: 'c1', username: 'neurophilosopher', avatar: 'https://i.pravatar.cc/40?img=21', text: "This is the hard problem of consciousness in action. EEG ≠ subjective experience. The headline is garbage.", likes: 9102, timeAgo: '10d' },
      { id: 'c2', username: 'spiritual_seeker', avatar: 'https://i.pravatar.cc/40?img=22', text: "SCIENCE FINALLY PROVES THE SOUL ✨🙏 I always knew it", likes: 23401, timeAgo: '10d' },
      { id: 'c3', username: 'icu_nurse', avatar: 'https://i.pravatar.cc/40?img=23', text: "The actual NYU study is interesting and careful. The headlines were irresponsible and cruel to grieving families.", likes: 12034, timeAgo: '9d' },
      { id: 'c4', username: 'philosophy_prof', avatar: 'https://i.pravatar.cc/40?img=24', text: "Defining 'consciousness' precisely enough to measure it is itself an unsolved problem. This headline skips 500 years of philosophy.", likes: 7823, timeAgo: '9d' },
      { id: 'c5', username: 'just_curious', avatar: 'https://i.pravatar.cc/40?img=25', text: "I genuinely can't tell anymore what's real and what's hype in neuroscience. This app is actually teaching me something.", likes: 4512, timeAgo: '8d' },
    ],
  },

  // ── Ukrainian / Localized Posts ─────────────────────────────────────────────
  {
    id: 'ua1',
    image: 'https://images.unsplash.com/photo-1584813539806-2538b8d918c6?q=80&w=800&auto=format&fit=crop',
    authorName: 'Breaking News Ukraine ⚡️',
    authorAvatar: 'https://i.pravatar.cc/150?img=11',
    tags: ['#Mobilization', '#Ukraine', '#URGENT'],
    headline: 'OFFICIAL: Conscription Age Lowered to 18 Starting Monday — Law Already Signed!',
    description:
      'A source inside the President\'s Office has confirmed that the new law lowering the draft age to 18 will take effect next week. All young men are prohibited from leaving their region without military registration authority (TCC) permission. Read the details…',
    isFake: true,
    explanation:
      'Classic IPSO (psychological influence operation). The hook: using the word "OFFICIAL" in all-caps to manufacture panic among young people. Real changes to Ukrainian law are always published on the official Parliament (Verkhovna Rada) website — never leaked through anonymous "sources". Always verify on official government sites.',
    comments: [
      { id: 'ua1c1', username: 'ivan_2008', avatar: 'https://i.pravatar.cc/40?img=31', text: 'Wait what?! I just turned 18 in August — is this real??', likes: 214, timeAgo: '3h' },
      { id: 'ua1c2', username: 'olena_m', avatar: 'https://i.pravatar.cc/40?img=32', text: "This is a manipulation. Don't panic — go check the Parliament's official website.", likes: 891, timeAgo: '2h' },
    ],
  },
  {
    id: 'ua2',
    image: 'https://images.unsplash.com/photo-1601224329241-15555d4c8872?q=80&w=800&auto=format&fit=crop',
    authorName: 'EuroNews Live',
    authorAvatar: 'https://i.pravatar.cc/150?img=44',
    tags: ['#Athens', '#Wildfires', '#Climate'],
    headline: 'Disaster in Greece: Athens Surrounded by Fire — Thousands Evacuated Right Now!',
    description:
      'The historic Greek capital faces catastrophic destruction. August wildfires spiraled out of control due to an extreme heat wave, and the fires have reached the outskirts of Athens. Authorities declared mass evacuation of several districts…',
    isFake: false,
    explanation:
      'Fact. Although the headline is very emotional ("disaster", "surrounded by fire"), in August 2026 extreme heat caused wildfires that genuinely reached the outskirts of Athens, leading to large-scale evacuations. An emotional, dramatic headline does not automatically mean it\'s fake news — check the facts first.',
    comments: [
      { id: 'ua2c1', username: 'travel_max', avatar: 'https://i.pravatar.cc/40?img=33', text: 'This is terrifying. I was supposed to fly there this weekend…', likes: 543, timeAgo: '5h' },
      { id: 'ua2c2', username: 'nature_lover', avatar: 'https://i.pravatar.cc/40?img=34', text: 'Climate change in real time. My thoughts are with the people of Greece.', likes: 1102, timeAgo: '4h' },
    ],
  },
  {
    id: 'ua3',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    authorName: 'EU Finance Insider',
    authorAvatar: 'https://i.pravatar.cc/150?img=33',
    tags: ['#Economy', '#Money', '#EU'],
    headline: 'EU Abolishes Cash Entirely from January 1st — What Should Refugees and Expats Do?',
    description:
      'The European Central Bank has decided on a full transition to the digital euro. From January 1st, all paper banknotes will become invalid. Experts urgently advise depositing all cash at banks immediately — otherwise you will lose everything…',
    isFake: true,
    explanation:
      'Fake — designed to trigger financial panic. The hook: exploiting the fear of losing savings. While the European Central Bank IS developing a digital euro, it has repeatedly and explicitly stated that physical cash will remain legal tender. This type of "urgent deadline" story is a classic fear-based manipulation technique.',
    comments: [
      { id: 'ua3c1', username: 'crypto_bro', avatar: 'https://i.pravatar.cc/40?img=35', text: "About time we moved to crypto anyway!", likes: 67, timeAgo: '6h' },
      { id: 'ua3c2', username: 'anna_ukr', avatar: 'https://i.pravatar.cc/40?img=36', text: "I have all my savings at home — what do I do now?!", likes: 312, timeAgo: '5h' },
    ],
  },
  {
    id: 'ua4',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop',
    authorName: 'Tech Insiders USA',
    authorAvatar: 'https://i.pravatar.cc/150?img=55',
    tags: ['#AI', '#USA', '#Deepfake'],
    headline: "Shocking Video: US President Accidentally Admits All His Speeches Are Written by AI!",
    description:
      "A video leaked from a private dinner shows the President laughing and saying: 'I don't even read what they hand me — it's all generated by ChatGPT.' The clip has already reached 10 million views. Is this the end of democracy?…",
    isFake: true,
    explanation:
      'Deepfake. The hook: "shocking leaked video" combined with a conspiracy theory about AI control. If you watch the original clip carefully, the lip movements do not match the words, and the edges of the face are subtly blurred — classic signs of AI-generated video synthesis. Modern deepfake tools can replicate any politician\'s voice in minutes.',
    comments: [
      { id: 'ua4c1', username: 'freedom_eagle', avatar: 'https://i.pravatar.cc/40?img=37', text: "I always knew the machines were in control!", likes: 1230, timeAgo: '1d' },
      { id: 'ua4c2', username: 'pixel_detective', avatar: 'https://i.pravatar.cc/40?img=38', text: "Are you all blind? This is a cheap deepfake — look at the shadows on his chin.", likes: 3870, timeAgo: '22h' },
    ],
  },
  {
    id: 'ua5',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
    authorName: 'Diia — State in a Smartphone',
    authorAvatar: 'https://i.pravatar.cc/150?img=9',
    tags: ['#Diia', '#Technology', '#Ukraine'],
    headline: "You Won't Believe It — You Can Now Officially Get Married via Video Call in Ukraine!",
    description:
      "Forget the registry office. The Ukrainian government app 'Diia' has launched an online marriage feature. Couples can now legally register their relationship from anywhere in the world via a video call, and the digital marriage certificate automatically appears in the app…",
    isFake: false,
    explanation:
      "Fact! The hook: the phrase \"You won't believe it\" usually signals clickbait — but in this case it is genuine. Ukraine became the first country in the world to introduce legally-binding online marriage via its government app Diia. This can be verified through official resources of the Ukrainian Ministry of Digital Transformation.",
    comments: [
      { id: 'ua5c1', username: 'romantik_99', avatar: 'https://i.pravatar.cc/40?img=39', text: "Can you get a divorce over video call too? Asking for a friend.", likes: 2100, timeAgo: '12h' },
      { id: 'ua5c2', username: 'sveta_v', avatar: 'https://i.pravatar.cc/40?img=40', text: "This is perfect for military couples serving abroad. What a great initiative!", likes: 4890, timeAgo: '10h' },
    ],
  },
]

// ── Fisher-Yates shuffle ──────────────────────────────────────────────────────
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
