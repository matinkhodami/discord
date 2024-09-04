import z from "zod"

export const InitialServerSchema = z.object({
    name: z.string().min(1,{
        message: 'server name is required!'
    }),
    imageUrl: z.string().min(1,{
        message: 'server image is required!'
    })
})