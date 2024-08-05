import { writable } from 'svelte/store';

export const taskUploadStates = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error'
}

export const isLoggedIn = writable(false);
export const user = writable(undefined);
export const currentCategorires = writable();
export const taskUpload = writable(taskUploadStates.idle)
