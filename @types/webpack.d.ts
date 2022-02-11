export interface WebpackBuildServerEnv {
    SSR: string;
    SERVER_OUTPUT_PATH: string;
}

export interface WebpackBuildClientEnv {
    CLIENT_OUTPUT_PATH: string;
}

export type WebpackBuildEnv = Partial<WebpackBuildServerEnv> & Partial<WebpackBuildClientEnv>;
