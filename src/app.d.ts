// src/app.d.ts
declare global {
    namespace App {
        interface Locals {
            user: {
                id: string;
                email: string;
                name: string;
                role: 'ADMIN' | 'JURY' | 'TEAM';
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null;
            } | null;
            session: import('better-auth').Session | null;
        }
    }
}

export {};