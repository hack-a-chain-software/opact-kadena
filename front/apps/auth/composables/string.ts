// shorten the checksummed version of the input address to have 4 characters at start and end
export function shortenAddress (
  address: string,
  chars = 4
): string {
  return `${address.slice(0, chars)}...${address.slice(
    -chars
  )}`
}

export const appName = 'opact' || null

export const shortAppName = appName
  ? appName.split(' ')[0]
  : null

export function slug (string: string): string {
  return string
    .replace(' ', '-')
    .toLowerCase()
    .replace('--', '-')
}

export function withAppName (string: string): string {
  return slug(`${shortAppName}.${string}`)
}
