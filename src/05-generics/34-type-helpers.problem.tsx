type Icon = "home" | "settings" | "about";
type ButtonVariant = "primary" | "secondary" | "tertiary";

// How do we refactor this to make it DRY?
type LooseAutocomplete<T> = T | (string & {});
type LooseIcon = LooseAutocomplete<Icon>;
type LooseButtonVariant = LooseAutocomplete<ButtonVariant>;

export const icons: LooseIcon[] = [
  "home",
  "settings",
  "about",
  "any-other-string",
  // I should get autocomplete if I add a new item here!
];

export const buttonVariants: LooseButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "any-other-string",
  // I should get autocomplete if I add a new item here!
];
