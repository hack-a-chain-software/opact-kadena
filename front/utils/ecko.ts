import { getConfig } from "opact-sdk";

export const isInstalled = (): boolean => {
  const { kadena } = window as any;

  return Boolean(kadena && kadena.isKadena && kadena.request);
};

export const isCorrectNetwork = async (): Promise<boolean> => {
  if (!isInstalled()) {
    return false;
  }

  const { networkId } = getConfig()

  const checkStatusResponse =
    await window.kadena?.request({
      method: 'kda_checkStatus',
      networkId,
    }) as any;

  return checkStatusResponse?.status === 'success' 
    || checkStatusResponse.message === 'Not connected';
};


export const isConnected = async (): Promise<boolean> => {
  if (!isInstalled()) {
    return false;
  }

  const { networkId } = getConfig()

  const checkStatusResponse =
    await window.kadena?.request({
      method: 'kda_checkStatus',
      networkId,
    }) as any;

  return checkStatusResponse?.status === 'success';
};
