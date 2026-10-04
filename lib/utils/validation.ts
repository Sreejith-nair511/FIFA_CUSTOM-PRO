export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidUUID(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)
}

export function isValidScore(score: number): boolean {
  return Number.isInteger(score) && score >= 0
}

export function isValidRating(rating: number): boolean {
  return rating >= 0 && rating <= 10
}

export function isValidMinutes(minutes: number): boolean {
  return Number.isInteger(minutes) && minutes >= 0 && minutes <= 120
}

export function isValidJerseyNumber(number: number): boolean {
  return Number.isInteger(number) && number >= 1 && number <= 99
}

export function isValidOVR(ovr: number): boolean {
  return Number.isInteger(ovr) && ovr >= 0 && ovr <= 99
}

export function isValidAge(age: number): boolean {
  return Number.isInteger(age) && age >= 16 && age <= 50
}

export function isValidFileSize(bytes: number, maxMB: number = 5): boolean {
  return bytes <= maxMB * 1024 * 1024
}

export function isValidImageType(mimeType: string): boolean {
  return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(mimeType)
}
