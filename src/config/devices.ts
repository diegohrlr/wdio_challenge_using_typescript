// src/config/devices.ts
export type Device = 'desktop' | 'mobile'

interface DeviceConfig {
    width: number
    height: number
}

export const devices: Record<Device, DeviceConfig> = {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 412, height: 915 },
}

export function getDevice(): DeviceConfig {
    const device = (process.env.DEVICE as Device) || 'desktop'
    return devices[device]
}