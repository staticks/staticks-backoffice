export enum Authentication {
  STATICKS = 'STATICKS',
}

export interface LoginPayload {
  accountId: string
  password: string
  authentication: Authentication
}

export interface LoginResponse {
  type: string
  token: string
}

export interface SinupPayload {
  email: string
  password: string
  name: string
}
