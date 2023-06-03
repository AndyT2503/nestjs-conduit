export function generateSlug(title: string): string {
  const slug = title.toLowerCase().split(' ').join('-');
  return slug;
}
