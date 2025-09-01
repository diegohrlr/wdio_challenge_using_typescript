// src/config/environments.ts
export type Environment = 'dev' | 'stg' | 'prd'

interface EnvConfig {
    baseUrl: string
}

export const environments: Record<Environment, EnvConfig> = {
    dev: { baseUrl: 'http://immense-hollows-74271.herokuapp.com' },
    stg: { baseUrl: 'http://immense-hollows-74271.herokuapp.com' },
    prd: { baseUrl: 'http://immense-hollows-74271.herokuapp.com' },
}

export function getEnv(): EnvConfig {
    const env = (process.env.ENV as Environment) || 'stg'
    return environments[env]
}