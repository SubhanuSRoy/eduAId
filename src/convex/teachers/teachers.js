import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { v } from "convex/values";

export const addNewTeacher = mutation({
  args: {
    name: v.string({ minLength: 1 }),
    email: v.string({ unique: true }),
    contact_number: v.string(),
    subjects_taught: v.string(),
    grade_levels: v.string(),
    years_of_experience: v.number(),
    short_bio: v.string(),
    teaching_methods: v.string(),
    qualifications: v.string(),
  },
  handler: async (ctx, args) => {
    const teacherId = await ctx.db.insert("teachers", args);
    const teacherAdded = await ctx.db.get(teacherId);
    console.log("Teacher created successfully:", teacherAdded);
    return teacherAdded;
  },
});



export const getTeacherByEmail = query({
  args: { email: v.optional(v.string()) }, // Email should be unique
  handler: async (ctx, args) => {
    const { email } = args;
    const teacher = await ctx.db
      .query("teachers")
      .filter((t) => t.email === email)
      .first();
    // Check if a teacher is found
    if (!teacher) {
      return null; // Return null if no teacher found by email
    }
    return teacher;
  },
});

export const updateTeacher = mutation({
  args: {
    id: v.id("teachers"), // ID of the teacher to update

    name: v.string({ optional: true }),
    contact_number: v.string({ optional: true }),
    subjects_taught: v.string({ optional: true }),
    grade_levels: v.string({ optional: true }),
    years_of_experience: v.number({ optional: true }),
    short_bio: v.string({ optional: true }),
    teaching_methods: v.string({ optional: true }),
    qualifications: v.string({ optional: true }),
  },
  handler: async (ctx, args) => {
    const { id } = args;

    // Optional: Get the existing teacher data for logging purposes
    const existingTeacher = await ctx.db.get(id);
    console.log("Existing teacher:", existingTeacher);

    await ctx.db.patch(id, args);
    console.log("Teacher updated successfully:", args);
    return args;
  },
});

export const deleteTeacher = mutation({
  args: {
    id: v.string({ required: true }),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete("teachers", id);
    console.log("Teacher deleted successfully:", id);
  },
});
