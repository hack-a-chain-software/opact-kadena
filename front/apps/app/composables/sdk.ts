// TODO: FIX CIRCOMLIBSJS WITH SERVER SIDE
import { Buffer } from 'buffer'

globalThis.Buffer = Buffer

let sdk: any = null

export const getSdk = async () => {
  if (sdk) {
    return sdk
  }

  sdk = await import('opact-sdk')

  return sdk
}
