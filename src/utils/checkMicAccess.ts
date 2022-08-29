export const checkMicAccess = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    return 'denied' as PermissionState;
  }
  const micState = (await navigator.permissions.query({ name: 'microphone' as PermissionName })).state;
  return micState;
};
