import { defineField, defineType } from "sanity";


export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: 'title',
            }
        }),
        defineField({
            name: "author",
            type: "reference",
            to: [{ type: "author" }], 
        }),
        defineField({
            name: "views",
            type: "number",
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Category is required"),
        }),
        
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required().error("Image is required"), // https://i.ibb.co/M88xDfy/Home-Page-SEO.png
        }),
        
        defineField({
            name: "pitch",
            type: "markdown", // npm install sanity-plugin-markdown --legacy-peer-deps
        }),
        
    ],  
})