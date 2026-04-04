import site from './site.json';

export type SocialLink = {
  label: string;
  href: string;
};

export type AboutConfig = {
  name: string;
  headline: string;
  summary: string[];
  currently: string[];
};

export type SiteConfig = {
  name: string;
  domain: string;
  email: string;
  title: string;
  description: string;
  intro: string;
  positioning: string;
  about: AboutConfig;
  socialLinks: SocialLink[];
  now: string[];
};

export const siteConfig = site as SiteConfig;
export const headerLinks = siteConfig.socialLinks.filter((link) => ['GitHub', 'X', 'Email'].includes(link.label));
