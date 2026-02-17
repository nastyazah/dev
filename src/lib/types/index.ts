// src/lib/types/index.ts

// ============= Enum types =============
export type Role = 'ADMIN' | 'TEAM' | 'JURY';
export type TournamentStatus = 'DRAFT' | 'REGISTRATION' | 'RUNNING' | 'FINISHED';
export type TaskStatus = 'DRAFT' | 'ACTIVE' | 'SUBMISSION_CLOSED' | 'EVALUATED';

// ============= Entity types =============
export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tournament {
    id: string;
    title: string;
    description: string;
    status: TournamentStatus;
    regStart: Date;
    regEnd: Date;
    maxTeams?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Team {
    id: string;
    name: string;
    captainId: string;
    tournamentId: string;
    city?: string;
    contact?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    teamId: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    techStack?: string;
    startAt: Date;
    deadline: Date;
    status: TaskStatus;
    tournamentId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Submission {
    id: string;
    githubUrl: string;
    videoUrl: string;
    demoUrl?: string;
    description?: string;
    taskId: string;
    teamId: string;
    submittedAt: Date;
    updatedAt: Date;
}

export interface JuryAssignment {
    id: string;
    submissionId: string;
    juryId: string;
    createdAt: Date;
}

export interface Score {
    id: string;
    assignmentId: string;
    backendQuality: number;
    databaseQuality: number;
    frontendQuality: number;
    functionality: number;
    stability: number;
    usability: number;
    comment?: string;
    total: number;
    createdAt: Date;
}

// ============= Extended types =============
export interface TeamWithMembers extends Team {
    captain: User;
    members: TeamMember[];
}

export interface TournamentWithTeams extends Tournament {
    teams: TeamWithMembers[];
    tasks?: Task[];
}

export interface TaskWithSubmissions extends Task {
    submissions: Submission[];
}

export interface JuryAssignmentWithDetails extends JuryAssignment {
    submission: Submission & {
        team: TeamWithMembers;
        task: Task;
    };
    jury: User;
    score?: Score;
}

// ============= DTO types =============
export interface CreateTournamentDto {
    title: string;
    description: string;
    regStart: Date;
    regEnd: Date;
    maxTeams?: number;
}

export interface RegisterTeamDto {
    name: string;
    captainId: string;
    captainEmail: string;
    tournamentId: string;
    members: Array<{
        name: string;
        email: string;
    }>;
    city?: string;
    contact?: string;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    requirements: string[];
    techStack?: string;
    startAt: Date;
    deadline: Date;
    tournamentId: string;
}

export interface CreateSubmissionDto {
    githubUrl: string;
    videoUrl: string;
    demoUrl?: string;
    description?: string;
    taskId: string;
    teamId: string;
}

export interface CreateScoreDto {
    backendQuality: number;
    databaseQuality: number;
    frontendQuality: number;
    functionality: number;
    stability: number;
    usability: number;
    comment?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
    role: Role;
}

// ============= Response types =============
export interface LeaderboardEntry {
    teamId: string;
    teamName: string;
    members: string[];
    averageScore: number;
    breakdown: ScoreBreakdown;
    juryCount: number;
    scores: Score[];
}

export interface ScoreBreakdown {
    backendQuality: number;
    databaseQuality: number;
    frontendQuality: number;
    functionality: number;
    stability: number;
    usability: number;
}

export interface TournamentStats {
    totalTeams: number;
    totalParticipants: number;
    citiesRepresented: number;
}

export interface TaskStats {
    totalSubmissions: number;
    totalScored: number;
    pendingEvaluation: number;
    completionRate: number;
    averageScores: ScoreBreakdown & { total: number };
    totalScores: number;
}

// ============= API Response types =============
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ============= Store types =============
export interface UserStore {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
}

export interface NotificationStore {
    notifications: Notification[];
    add: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
    remove: (id: string) => void;
    clear: () => void;
}

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    createdAt: Date;
    autoClose?: boolean;
}

// ============= Component Props =============
export interface CountdownProps {
    deadline: Date;
    onExpire?: () => void;
}

export interface LeaderboardProps {
    entries: LeaderboardEntry[];
    loading?: boolean;
    showDetails?: boolean;
}

export interface TeamCardProps {
    team: TeamWithMembers;
    showMembers?: boolean;
    showActions?: boolean;
}

export interface ScoreFormProps {
    assignmentId: string;
    submission: JuryAssignmentWithDetails['submission'];
    existingScore?: Score;
    onSubmit: (score: CreateScoreDto) => Promise<void>;
}

// ============= Utility types =============
export type CreateType<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateType<T> = Partial<Omit<T, 'id' | 'createdAt'>>;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ============= Error types =============
export class ValidationError extends Error {
    constructor(
        message: string,
        public field?: string,
        public code?: string
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class AuthorizationError extends Error {
    constructor(message: string = 'Недостатньо прав доступу') {
        super(message);
        this.name = 'AuthorizationError';
    }
}

export class BusinessLogicError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BusinessLogicError';
    }
}

// ============= Constants =============
export const ROLES: Record<Role, string> = {
    ADMIN: 'Адміністратор',
    TEAM: 'Команда',
    JURY: 'Журі'
};

export const TOURNAMENT_STATUSES: Record<TournamentStatus, string> = {
    DRAFT: 'Чернетка',
    REGISTRATION: 'Реєстрація',
    RUNNING: 'Активний',
    FINISHED: 'Завершений'
};

export const TASK_STATUSES: Record<TaskStatus, string> = {
    DRAFT: 'Чернетка',
    ACTIVE: 'Активне',
    SUBMISSION_CLOSED: 'Прийом закрито',
    EVALUATED: 'Оцінене'
};

export const SCORE_CATEGORIES = {
    backendQuality: 'Якість Backend коду',
    databaseQuality: 'База даних',
    frontendQuality: 'Якість Frontend',
    functionality: 'Виконання вимог',
    stability: 'Стабільність',
    usability: 'Зручність використання'
} as const;