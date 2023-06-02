export function generateSlug(title: string): string {
  const slug = title.split(' ').join('-');
  return slug;
}
