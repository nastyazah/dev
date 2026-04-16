
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/api" | "/api/auth" | "/api/auth/[...all]" | "/api/leaderboard" | "/api/scores" | "/api/submissions" | "/api/tasks" | "/api/tasks/[id]" | "/api/teams" | "/api/teams/[id]" | "/api/tournaments" | "/api/tournaments/[id]" | "/auth" | "/auth/login" | "/auth/register" | "/courses" | "/jury" | "/jury/score" | "/jury/score/[id]" | "/jury/[id]" | "/leaderboard" | "/profile" | "/tourments" | "/tourments/[id]" | "/tourments/[id]/register";
		RouteParams(): {
			"/api/auth/[...all]": { all: string };
			"/api/tasks/[id]": { id: string };
			"/api/teams/[id]": { id: string };
			"/api/tournaments/[id]": { id: string };
			"/jury/score/[id]": { id: string };
			"/jury/[id]": { id: string };
			"/tourments/[id]": { id: string };
			"/tourments/[id]/register": { id: string }
		};
		LayoutParams(): {
			"/": { all?: string; id?: string };
			"/admin": Record<string, never>;
			"/api": { all?: string; id?: string };
			"/api/auth": { all?: string };
			"/api/auth/[...all]": { all: string };
			"/api/leaderboard": Record<string, never>;
			"/api/scores": Record<string, never>;
			"/api/submissions": Record<string, never>;
			"/api/tasks": { id?: string };
			"/api/tasks/[id]": { id: string };
			"/api/teams": { id?: string };
			"/api/teams/[id]": { id: string };
			"/api/tournaments": { id?: string };
			"/api/tournaments/[id]": { id: string };
			"/auth": Record<string, never>;
			"/auth/login": Record<string, never>;
			"/auth/register": Record<string, never>;
			"/courses": Record<string, never>;
			"/jury": { id?: string };
			"/jury/score": { id?: string };
			"/jury/score/[id]": { id: string };
			"/jury/[id]": { id: string };
			"/leaderboard": Record<string, never>;
			"/profile": Record<string, never>;
			"/tourments": { id?: string };
			"/tourments/[id]": { id: string };
			"/tourments/[id]/register": { id: string }
		};
		Pathname(): "/" | "/admin/" | `/api/auth/${string}` & {} | "/api/leaderboard" | "/api/scores" | "/api/submissions" | "/api/tasks" | `/api/tasks/${string}` & {} | "/api/teams" | `/api/teams/${string}` & {} | "/api/tournaments" | `/api/tournaments/${string}` & {} | "/auth/login/" | "/auth/register/" | "/courses/" | "/jury/" | `/jury/score/${string}/` & {} | `/jury/${string}/` & {} | "/leaderboard/" | "/profile/" | `/tourments/${string}/` & {} | `/tourments/${string}/register/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}