import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { v } from "convex/values";

export const addNewStudent = mutation({
  args: {
    name: v.string({ minLength: 1 }),
    email: v.string({ unique: true }),
    grade: v.string({ optional: true }), // Optional grade field
    course: v.string({ optional: true }),
    teacher_id: v.optional(v.string()),
    study_plan: v.optional(
      v.array(
        v.object({
          class_no: v.string(),
          topic: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const studentId = await ctx.db.insert("students", args);
    console.log("Student created successfully:", studentId);
  },
});

export const addStudyPlan = mutation({
  args: {
    id: v.id("students"),
    study_plan: v.array(
      v.object({
        class_no: v.string(),
        topic: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id } = args;

    const existingStudent = await ctx.db.get(id);
    console.log("Existing Student:", existingStudent);

    await ctx.db.patch(id, args.study_plan);
    console.log("Student updated successfully:", args);
    return args;
  },
});

export const getAllStudents = query({
  handler: async (ctx) => {
    return await ctx.db.query("students").collect();
  },
});
