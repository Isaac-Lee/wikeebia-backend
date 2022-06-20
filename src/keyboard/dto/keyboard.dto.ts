export interface ICreateKeyboardDto {
  id: number;
  name: string;
  angle: number;
  frintHeight: string;
  weight: number;
}

export interface IOutputDto {
  ok: boolean;
  error?: string;
}
