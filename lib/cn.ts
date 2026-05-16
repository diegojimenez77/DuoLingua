// Merges class names, filtering out falsy values.
// Replace with clsx + tailwind-merge for advanced conflict resolution.
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
