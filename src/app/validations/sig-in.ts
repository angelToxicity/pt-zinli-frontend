import { z } from "zod";

export const signInValidation = z.object({
    username: z.string().min(2, { message: "El campo usuario es requerido"}),
    password: z.string().min(12, { message: "El campo contraseña debe tener al menos 12 caracteres"}).regex(/^(?=.*[A-Z]).+$/, {message: "Debe contener al menos una mayuscula"}).regex(/^(?=.*\d).+$/, {message: "Debe contener al menos un numero"}),
    confirm_password: z.string().min(12, { message: "El campo confirmar contraseña debe tener al menos 12 caracteres"}),
    name: z.string().min(3, { message: "El campo nombre debe tener al menos 3 caracteres"}),
    surname: z.string().min(5, { message: "El campo apellido debe tener al menos 5 caracteres"}),
    avatar: z.string().min(1, { message: "Debe cargar una imagen"})
}).refine(data => data.password == data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"]
})

export type signInType = {
    username:string;
    password:string;
    confirm_password:string;
    name:string;
    surname:string;
    avatar:string|undefined;
}