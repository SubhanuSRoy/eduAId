import { mutation } from "../_generated/server";
import { query } from "../_generated/server";
import { v } from "convex/values";

export const addNewClass = mutation({
  args: {
    topic: v.string({ minLength: 1 }),
    class_no: v.string(),
    student_id: v.string(),
    class_insights: v.optional(
      v.object({
        summary: v.string(),
        objective: v.string(),
        concepts_taught: v.string(),
        student_understanding_level: v.string(),
        gaps_identified: v.string(),
        teacher_imporvement_suggestions: v.string(),
        takeaways: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const classId = await ctx.db.insert("classes", args);
    console.log(
      "class created successfully: ",
      classId,
      "for student: ",
      args.student_id
    );
  },
});

export const getAllClasses = query({
  handler: async (ctx) => {
    return await ctx.db.query("classes").collect();
  },
});
