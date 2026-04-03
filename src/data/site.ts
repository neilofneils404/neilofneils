import site from './site.json';

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  domain: string;
  email: string;
  title: string;
  description: string;
  intro: string;
  socialLinks: SocialLink[];
  now: string[];
};

export const siteConfig = site as SiteConfig;
export const headerLinks = siteConfig.socialLinks.filter((link) => ['GitHub', '𝕏', 'X'].includes(link.label));
