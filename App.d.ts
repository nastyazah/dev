// src/app.d.ts
import type { User } from '$lib/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user?: User;
        }
        interface PageData {
            user?: User;
        }
        // interface PageState {}
        // interface Platform {}
    }
}

export {};