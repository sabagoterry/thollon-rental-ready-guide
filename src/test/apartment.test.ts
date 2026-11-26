import { expect, it } from "vitest";
import {
  balconies,
  washingFacilities,
  apartmentAmenities,
  amenityList,
  sleepingCapacity,
  houseRules,
} from "@/lib/apartment";
import { guideInstructions } from "@/lib/guest-guide";

it("has exactly two balconies", () => {
  expect(balconies).toHaveLength(2);
});
it("has a south-facing front balcony", () => {
  expect(balconies.find((b) => b.position === "front")?.facing).toBe("south");
});
it("has a north-facing rear balcony", () => {
  expect(balconies.find((b) => b.position === "rear")?.facing).toBe("north");
});
it("has one full-size bathroom", () => {
  expect(washingFacilities.fullSizeBathrooms).toBe(1);
});
it("has one shower ensuite", () => {
  expect(washingFacilities.showerEnsuites).toBe(1);
});
it("offers free parking", () => {
  expect(apartmentAmenities.parkingFree).toBe(true);
});
it("offers towels on request", () => {
  expect(apartmentAmenities.towelsOnRequest).toBe(true);
});
it("offers linen on request", () => {
  expect(apartmentAmenities.linenOnRequest).toBe(true);
});
it("has skiing five minutes away", () => {
  expect(apartmentAmenities.skiingMinutes).toBe(5);
});
it("has hiking right outside", () => {
  expect(apartmentAmenities.hikingAtDoorstep).toBe(true);
});
it("comfortably sleeps four", () => {
  expect(sleepingCapacity.comfortableGuests).toBe(4);
});
it("also has a sofa bed", () => {
  expect(sleepingCapacity.sofaBed).toBe(true);
});
it("does not offer a separate cot", () => {
  expect(amenityList.some((a) => String(a.en) === "Cot")).toBe(false);
});
it("provides the travel cot only on request", () => {
  const item = amenityList.find((a) => a.en.startsWith("Travel cot"));
  expect(item && "onRequest" in item ? item.onRequest : false).toBe(true);
});
it("provides the high chair only on request", () => {
  const item = amenityList.find((a) => a.en.startsWith("High chair"));
  expect(item && "onRequest" in item ? item.onRequest : false).toBe(true);
});
it("says the apartment is on the second floor with three flights of stairs", () => {
  expect(houseRules.accessibility).toContain("2nd floor");
  expect(houseRules.accessibility).toContain("3 flights of stairs");
  expect(houseRules.accessibilityFr).toContain("2ᵉ étage");
  expect(houseRules.accessibilityFr).toContain("3 volées de marches");
});
it("says there is no lift at the moment", () => {
  expect(houseRules.accessibility.toLowerCase()).toContain("isn't a lift");
  expect(houseRules.accessibilityFr).toContain("pas d’ascenseur");
});
it("tells the guest assistant about the stairs and missing lift", () => {
  const guide = guideInstructions();
  expect(guide).toContain("Accessibility:");
  expect(guide).toContain("3 flights of stairs");
  expect(guide).toContain("isn't a lift");
});
