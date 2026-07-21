export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
