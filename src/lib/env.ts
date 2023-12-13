import zod from "zod";

// create validation schema

const envSchema = zod.object({
    // fill with validation rules (contains strings, that are not empty)
    DATABASE_URL: zod.string().nonempty(),
    GOOGLE_CLIENT_ID: zod.string().nonempty(),
    GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
    NEXTAUTH_URL: zod.string().nonempty(),
    NEXTAUTH_SECRET: zod.string().nonempty(),
})

export const env = envSchema.parse(process.env);
// the parse method validates that the actual env variables match the specified format in the envSchema
// exported as env, the validated env variables can be used in the server code (here with defined values for the google provider)