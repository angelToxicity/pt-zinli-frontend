import { z } from "zod";

export const postValidation = z.object({
    location: z.string(),
    image: z.string().min(1, { message: "Debe cargar una imagen"}),
    message: z.string().min(10, { message: "El campo mensaje debe tener al menos 10 caracteres"})
})

export type postType = {
    image:string|undefined;
    location:string;
    author:string;
    status:string;
    message:string;
}