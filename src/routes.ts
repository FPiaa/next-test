/**
 * An array of public routes that don't need authentication
 */
export const publicRoutes: Readonly<string[]> = ["/", "/auth/new-verification"];

/**
 * An array of public routes that don't need authentication
 */
export const authRoutes: Readonly<string[]> = ["/auth/login", "/auth/register"];

/**
 * The prefix foi api authentication routes
 * Routes that start with this prefix as used for API authetication purposes
 */
export const apiAuthPrefix = "/api/auth" as const;

/**
 * Default redirect path after loggin in
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings" as const;
