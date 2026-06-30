import { describe, it, expect } from "vitest";
import { toLead } from "./leads";

describe("toLead", () => {
  it("maps an agency assessment user", () => {
    const lead = toLead(
      { name: "Jane Doe", company: "Acme Recruiting", email: "jane@acme.com" },
      "agency_assessment",
    );
    expect(lead).toEqual({
      userName: "Jane Doe",
      userEmail: "jane@acme.com",
      companyName: "Acme Recruiting",
      jobTitle: null,
      source: "agency_assessment",
    });
  });

  it("maps an inhouse assessment user with a job title", () => {
    const lead = toLead(
      { name: "Sam Lee", company: "Globex", email: "sam@globex.com", jobTitle: "Head of People" },
      "inhouse_assessment",
    );
    expect(lead.source).toBe("inhouse_assessment");
    expect(lead.jobTitle).toBe("Head of People");
    expect(lead.companyName).toBe("Globex");
  });

  it("maps an inhouse user without a job title to null", () => {
    const lead = toLead(
      { name: "Pat Kim", company: "Initech", email: "pat@initech.com" },
      "inhouse_assessment",
    );
    expect(lead.jobTitle).toBeNull();
  });

  it("leaves JAG-specific fields unset (table defaults apply)", () => {
    const lead = toLead(
      { name: "Jane Doe", company: "Acme", email: "jane@acme.com" },
      "agency_assessment",
    );
    expect(lead.companyWebsite).toBeUndefined();
    expect(lead.location).toBeUndefined();
    expect(lead.salaryBand).toBeUndefined();
    expect(lead.advertStatus).toBeUndefined();
    expect(lead.paymentAttempted).toBeUndefined();
    expect(lead.followUpStatus).toBeUndefined();
  });
});
