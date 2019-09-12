import { Dispatch, SetStateAction, useState } from "react";

export enum ProgressKind {
  STOPPED,
  FAILED,
  RUNNING
}

export interface StoppedProgress {
  kind: ProgressKind.STOPPED;
}

export interface FailedProgress {
  kind: ProgressKind.FAILED;
  error: string;
}

export interface RunningProgress {
  kind: ProgressKind.RUNNING;
}

export type Progress = RunningProgress | FailedProgress | StoppedProgress;

export class ProgressTracker {
  readonly current: Progress;
  private readonly setProgress: Dispatch<SetStateAction<Progress>>;

  constructor(state: [Progress, Dispatch<SetStateAction<Progress>>]) {
    this.current = state[0];
    this.setProgress = state[1];
  }

  start() {
    this.setProgress({
      kind: ProgressKind.RUNNING
    });
  }

  stop(reason?: Error) {
    if (reason) {
      this.setProgress({
        kind: ProgressKind.FAILED,
        error: reason.message
      });
    } else {
      this.setProgress({
        kind: ProgressKind.STOPPED
      });
    }
  }

  isRunning(): boolean {
    return this.current.kind === ProgressKind.RUNNING;
  }

  isError(): string | undefined {
    return this.current.kind === ProgressKind.FAILED ? this.current.error : undefined;
  }
}

export function useProgress(initialProgress?: boolean) {
  const state = useState<Progress>({
    kind: initialProgress ? ProgressKind.RUNNING : ProgressKind.STOPPED
  });
  return new ProgressTracker(state);
}
