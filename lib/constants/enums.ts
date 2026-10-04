export const POSITIONS = ['ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'CDM', 'LM', 'RM', 'LB', 'CB', 'RB', 'GK']

export const RESULT_TYPES = ['win', 'draw', 'loss'] as const

export const TRANSFER_TYPES = ['permanent', 'loan', 'free', 'youth_promotion', 'other'] as const

export const TROPHY_COMPETITIONS = [
  'Premier League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'UEFA Champions League',
  'UEFA Europa League',
  'FA Cup',
  'Coppa Italia',
  'DFB-Pokal',
  'Coupe de France',
  'Copa del Rey',
  'Carabao Cup',
  'Community Shield',
  'FIFA Club World Cup',
  'FIFA World Cup',
  'UEFA European Championship',
  'Copa America',
  'African Cup of Nations',
  'Asian Cup',
]

export const AWARD_CATEGORIES = [
  'Player of the Match',
  'Player of the Month',
  'Player of the Year',
  'Team of the Week',
  'Player of Tournament',
  'Golden Boot',
  'Golden Ball',
  'World XI',
  'Other',
]

export const TIMELINE_TYPES = ['TRANSFER', 'MATCH', 'TROPHY', 'AWARD', 'INTERNATIONAL', 'MILESTONE', 'RECORD', 'CUSTOM']

export const TIMELINE_IMPORTANCE = ['low', 'normal', 'high', 'legendary'] as const

export const MEDIA_CATEGORIES = ['MATCH', 'TRANSFER', 'TROPHY', 'AWARD', 'ATTRIBUTE', 'NEWS', 'WORLD_CUP', 'CAREER', 'OTHER']

export const NEWS_CATEGORIES = ['TRANSFER', 'TROPHY', 'INTERNATIONAL', 'PERFORMANCE', 'AWARD', 'CAREER', 'OTHER']

export const PREFERRED_FOOT = ['left', 'right'] as const

export const COMPETITION_TYPES = ['league', 'cup', 'european', 'international', 'other']
