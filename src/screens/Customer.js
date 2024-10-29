import { useMediaDevices } from "react-media-devices";
import { useZxing } from "react-zxing";

const constraints = {
  video: true,
  audio: false,
};

export const Customer = () => {
  const { devices } = useMediaDevices({ constraints });
  const deviceId = devices?.[0]?.deviceId;
  const { ref } = useZxing({
    paused: !deviceId,
    deviceId,
  });

  return <video ref={ref} />;
};