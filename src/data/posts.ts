export type Verdict = 'fact' | 'fake'

export interface NewsPost {
  id: string
  headline: string
  description: string
  source: string
  category: string
  imageGradient: string
  imageEmoji: string
  verdict: Verdict
  explanation: string
}

export const NEWS_POSTS: NewsPost[] = [
  {
    id: '1',
    headline: 'Вчені виявили новий вид комах, який живе виключно в смартфонах',
    description: 'Дослідники з Оксфорду повідомили про відкриття мікроскопічних комах, які адаптувалися до проживання в тепловому середовищі акумуляторів смартфонів.',
    source: 'NatureWorld Daily',
    category: 'Наука',
    imageGradient: 'from-violet-600 via-purple-700 to-indigo-800',
    imageEmoji: '🦗',
    verdict: 'fake',
    explanation: 'Це повністю вигадана новина! Жоден вид комах не може жити всередині смартфона. Будь уважний до сенсаційних заголовків.',
  },
  {
    id: '2',
    headline: 'НАСА підтвердило: Місяць поступово віддаляється від Землі на 3.8 см на рік',
    description: 'Завдяки лазерному вимірюванню відстані, встановленому під час місій Аполлон, вчені підтвердили, що Місяць дійсно дрейфує від нашої планети.',
    source: 'NASA Science',
    category: 'Космос',
    imageGradient: 'from-slate-700 via-blue-800 to-slate-900',
    imageEmoji: '🌕',
    verdict: 'fact',
    explanation: 'Це правда! Гравітаційна взаємодія між Землею та Місяцем дійсно змушує Місяць повільно віддалятися зі швидкістю ~3.8 см на рік.',
  },
  {
    id: '3',
    headline: 'Вживання кави більше ніж 4 чашки на день підвищує IQ на 15 пунктів',
    description: 'Нове "дослідження" стверджує, що кофеїн безпосередньо стимулює утворення нових нейронів, що призводить до значного підвищення інтелекту.',
    source: 'HealthTrend News',
    category: 'Здоров\'я',
    imageGradient: 'from-amber-600 via-orange-700 to-red-800',
    imageEmoji: '☕',
    verdict: 'fake',
    explanation: 'Фейк! Хоча кофеїн покращує концентрацію, жодне наукове дослідження не підтверджує постійне підвищення IQ від вживання кави.',
  },
  {
    id: '4',
    headline: 'Восьминоги мають три серця та блакитну кров',
    description: 'Восьминоги — унікальні тварини з трьома серцями: два перекачують кров через зябра, а одне — через тіло. Їхня кров містить гемоціанін, що надає їй блакитного кольору.',
    source: 'Ocean Science Journal',
    category: 'Природа',
    imageGradient: 'from-cyan-600 via-teal-700 to-blue-800',
    imageEmoji: '🐙',
    verdict: 'fact',
    explanation: 'Абсолютна правда! Восьминоги справді мають 3 серця та блакитну кров через мідьвмісний гемоціанін замість залізовмісного гемоглобіну.',
  },
  {
    id: '5',
    headline: 'Уряд планує запровадити податок на інтернет-меми з 2025 року',
    description: 'Міністерство цифрової трансформації нібито розробляє законопроект, який зобов\'язує користувачів платити за кожен репост мему в соціальних мережах.',
    source: 'DigitalNews UA',
    category: 'Технології',
    imageGradient: 'from-green-600 via-emerald-700 to-teal-800',
    imageEmoji: '📱',
    verdict: 'fake',
    explanation: 'Фейк! Жоден уряд у світі не ввів і не планує вводити податок на меми. Це типова дезінформація для провокування емоційної реакції.',
  },
]
