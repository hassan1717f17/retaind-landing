import { describe, it, expect } from "vitest";
import { assessmentSubmitSchema, inhouseAssessmentSubmitSchema } from "./api-contract";

describe("submit schema fingerprint field", () => {
  const agency = {
    user: { name: "A", company: "B", email: "a@b.com" },
    responses: [{ questionId: "q1", responseValue: "x" }],
  };
  const inhouse = {
    user: { name: "A", company: "B", email: "a@b.com", jobTitle: "Head" },
    responses: [{ questionId: "q1", responseValue: "x" }],
  };

  it("accepts a payload without a visitorId (fail open)", () => {
    expect(assessmentSubmitSchema.parse(agency)).toMatchObject(agency);
    expect(inhouseAssessmentSubmitSchema.parse(inhouse)).toMatchObject(inhouse);
  });

  it("accepts a payload with a visitorId", () => {
    expect(assessmentSubmitSchema.parse({ ...agency, visitorId: "v1" }).visitorId).toBe("v1");
    expect(inhouseAssessmentSubmitSchema.parse({ ...inhouse, visitorId: "v1" }).visitorId).toBe("v1");
  });
});
