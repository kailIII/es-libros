let lastScrolledFraction = undefined

export const scrollByFraction = (percentage) => {
  lastScrolledFraction = percentage
}

export const __getLastScrolledFraction = () => lastScrolledFraction

export const __clear = () => { lastScrolledFraction = undefined }
