export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SultanaExpress",
    url: "https://sultana.express",
    logo: "https://sultana.express/logos/logo-dark.svg",
    description:
      "B2B marketplace connecting international buyers with verified Turkish textile manufacturers.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "sc@sultana.express",
      contactType: "customer service",
      availableLanguage: ["English", "Turkish"],
    },
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SultanaExpress",
    url: "https://sultana.express",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://sultana.express/en?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
