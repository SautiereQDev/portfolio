import { useEffect } from "react";
import seoData from "../data/seo.json";

interface SEOProps {
  page: "home" | "about" | "projects" | "services" | "contact";
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
}

export const SEO = ({
  page,
  customTitle,
  customDescription,
  customImage,
}: SEOProps) => {
  useEffect(() => {
    const pageData = seoData.pages[page];
    const globalData = seoData.global;

    // Title
    const title = customTitle ?? pageData.title;
    document.title = title;

    // Meta description
    const description = customDescription ?? pageData.description;
    updateMetaTag("description", description);

    // Keywords
    updateMetaTag("keywords", pageData.keywords);

    // Canonical URL
    updateLinkTag("canonical", pageData.canonical);

    // Open Graph
    updateMetaProperty("og:title", title);
    updateMetaProperty("og:description", description);
    updateMetaProperty("og:url", pageData.canonical);
    updateMetaProperty("og:image", customImage ?? globalData.defaultImage);
    updateMetaProperty("og:site_name", globalData.siteName);
    updateMetaProperty("og:type", globalData.type);
    updateMetaProperty("og:locale", globalData.locale);

    // Twitter Card
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", customImage ?? globalData.defaultImage);
    updateMetaTag("twitter:creator", globalData.twitterHandle);
  }, [page, customTitle, customDescription, customImage]);

  return null;
};

// Fonctions utilitaires pour mettre à jour les meta tags
const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(
    `meta[name="${name}"]`
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = content;
};

const updateMetaProperty = (property: string, content: string) => {
  let element = document.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.content = content;
};

const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
};

export default SEO;
