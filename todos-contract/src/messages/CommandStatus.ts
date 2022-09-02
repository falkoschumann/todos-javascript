export interface CommandStatus {
  readonly success: boolean;
  readonly errorMessage?: string;
}

export class Success implements CommandStatus {
  readonly success = true;
}

export class Failure implements CommandStatus {
  readonly success = false;

  constructor(public readonly errorMessage: string) {}
}
