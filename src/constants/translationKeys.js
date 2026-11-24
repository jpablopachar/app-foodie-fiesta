/**
 * Claves de traducción agrupadas por espacio de nombres y sección de la aplicación.
 * Cada valor corresponde a una clave utilizada para consultar los recursos de i18n.
 */
export const TRANSLATION_KEYS = {
  /** Textos compartidos entre las distintas páginas. */
  common: {
    navigation: {
      home: 'navigation.home',
      menu: 'navigation.menu',
      contact: 'navigation.contact',
      orders: 'navigation.orders',
      cart: 'navigation.cart',
    },
    actions: {
      login: 'actions.login',
      logout: 'actions.logout',
      subscribe: 'actions.subscribe',
      explore: 'actions.explore',
      addToCart: 'actions.addToCart',
    },
    product: {
      prep: 'product.prep',
      price: 'product.price',
    },
    language: {
      select: 'language.select',
    },
    footer: {
      rightsReserved: 'footer.rightsReserved',
    },
  },
  /** Textos de la página principal. */
  home: {
    hero: {
      titleBefore: 'hero.titleBefore',
      titleAfter: 'hero.titleAfter',
      description: 'hero.description',
      badges: {
        fastDelivery: 'hero.badges.fastDelivery',
        fastDeliveryDescription: 'hero.badges.fastDeliveryDescription',
        dishes: 'hero.badges.dishes',
        branches: 'hero.badges.branches',
        branchesDescription: 'hero.badges.branchesDescription',
        happyCustomers: 'hero.badges.happyCustomers',
        happyCustomersDescription: 'hero.badges.happyCustomersDescription',
        expertCooks: 'hero.badges.expertCooks',
      },
    },
    features: {
      title: 'features.title',
      fastDelivery: {
        title: 'features.fastDelivery.title',
        description: 'features.fastDelivery.description',
      },
      hotFoods: {
        title: 'features.hotFoods.title',
        description: 'features.hotFoods.description',
      },
      freshFoods: {
        title: 'features.freshFoods.title',
        description: 'features.freshFoods.description',
      },
      expertChefs: {
        title: 'features.expertChefs.title',
        description: 'features.expertChefs.description',
      },
    },
    popularFoods: {
      title: 'popularFoods.title',
    },
    testimonials: {
      title: 'testimonials.title',
      whatPeopleSay: 'testimonials.whatPeopleSay',
      reviewCount: 'testimonials.reviewCount',
      reviews: 'testimonials.reviews',
      verified: 'testimonials.verified',
    },
    description: 'description',
    footer: {
      columns: 'footer.columns',
      headline: 'footer.headline',
      description: 'footer.description',
      lookingFor: 'footer.lookingFor',
      emailPlaceholder: 'footer.emailPlaceholder',
      subscribe: 'footer.subscribe',
      contactTitle: 'footer.contactTitle',
      contactNumber: 'footer.contactNumber',
      emailAddress: 'footer.emailAddress',
      socialTitle: 'footer.socialTitle',
    },
  },
  /** Textos de autenticación. */
  auth: {
    login: {
      title: 'login.title',
      name: 'login.name',
      email: 'login.email',
      password: 'login.password',
      forgotPassword: 'login.forgotPassword',
      noAccount: 'login.noAccount',
      createAccount: 'login.createAccount',
      hasAccount: 'login.hasAccount',
    },
  },
}
