export const HOBBY_OPTIONS = [
  "Reading",
  "Gardening",
  "Brain Games",
  "Playing with Pet",
  "Sleeping",
  "Swimming",
] as const;

export type HobbyOption = (typeof HOBBY_OPTIONS)[number];
