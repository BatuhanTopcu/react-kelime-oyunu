export const checkMicAccess = async (): Promise<PermissionState> => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    return 'denied' as PermissionState;
  }
  const micState = (await navigator.permissions.query({ name: 'microphone' as PermissionName })).state;
  return micState;
};
