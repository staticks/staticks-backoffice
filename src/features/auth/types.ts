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
