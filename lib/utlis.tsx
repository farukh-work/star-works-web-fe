export function formatDate(dateString: string): string {
  try {
    // Parse date consistently
    const date = new Date(dateString)

    // Use a consistent format
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch (error) {
    return dateString
  }
}
