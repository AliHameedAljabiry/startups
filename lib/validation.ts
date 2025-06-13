import { z } from 'zod';

export  const  formSchema = z.object({
    title: z.string().min(3, 'Title is required').max(100, 'Title must be less than 100 characters'),
    description: z.string().min(20, 'Description is required').max(500, 'Description must be less than 500 characters'),
    category: z.string().min(3, 'Category is required').max(20, 'Category must be less than 20 characters'),
    pitch: z.string().min(10),
    link: z.string().url().refine( async (url) => {
        try {
            const res = await fetch(url, {method: 'HEAD'});
            const contentType = res.headers.get('content-type');
            return contentType?.startsWith('image/');
                
        } catch {
            return false;
        }
    })
});