export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getResultEmoji(result: 'win' | 'draw' | 'loss'): string {
  switch (result) {
    case 'win':
      return '✓'
    case 'draw':
      return '='
    case 'loss':
      return '✗'
  }
}

export function formatScore(teamScore: number, opponentScore: number): string {
  return `${teamScore}–${opponentScore}`
}

export function getWinRate(wins: number, total: number): number {
  return total > 0 ? Math.round((wins / total) * 100) : 0
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
