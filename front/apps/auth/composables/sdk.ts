// TODO: FIX CIRCOMLIBSJS WITH SERVER SIDE

let sdk: any = null

export const getSdk = async () => {
  if (sdk) {
    return sdk
  }

  sdk = await import('opact-sdk')

  return sdk
}
