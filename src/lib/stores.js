import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const user = writable(undefined);
export const currentCategorires = writable('');
