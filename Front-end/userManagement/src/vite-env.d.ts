/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_CLOUDINARY_SECRET : string;
    readonly VITE_CLOUDINARY_API : string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}