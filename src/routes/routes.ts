export const ROUTES = {
    HOME: '/',
    AUTH: {
        BASE: '/auth',
        LOGIN: '/auth/login',
        RECOVER_PASSWORD: "/auth/recover-password",
        RESET_PASSWORD: "/auth/reset-password"
    },
    PROFILE: '/profile',
    TERMS_AND_CONDITIONS: "/terms-and-conditions",
    ADMIN: {
        BASE: '/admin',
        USERS: '/admin/users',
        SPACES: '/admin/spaces',
        SPACE_TYPES: '/admin/space-types',
        SPACE_RESOURCES: '/admin/space-resources',
        SPACE_STATUSES: '/admin/space-statuses',
        CAMPUSES: '/admin/campuses',
        ACADEMIC_AREAS: '/admin/academic-areas',
        FACULTIES: '/admin/faculties',
        ACADEMIC_PROGRAMS: '/admin/academic-programs',
        EVENT_MODALITIES: '/admin/event-modalities'
    }
}