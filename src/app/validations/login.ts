import { z } from "zod";

export const loginValidation = z.object({
    username: z.string().min(2, { message: "El campo usuario es requerido"}),
    password: z.string().min(12, { message: "El campo contraseña debe tener al menos 12 caracteres"})
})

export type loginType = {
    username:string;
    password:string;
}