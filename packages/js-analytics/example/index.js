import JsAnalytics from '../src/index';

/* CUSTOM WINDOW.GA */
const windowGA = (...args) => {
    console.warn('window.ga calls with:', args);
};

/* INIT */
JsAnalytics.init({
    ga: windowGA,
    enabled: true,
    logger: console,
    dimensions: {
        UserStatus: 1, // Session
        AccessType: 2, // User
        Valuable: 5, // Hit
        Action: 8, // Hit
        PaymentType: 11, // User
    }
});

/* SET USER ID */
JsAnalytics.setId(123456789);

/* TRACK PAGEVIEW */
JsAnalytics.trackPage({
    page: '/homepage',
    title: 'Home Page',
    dimensions: {
        Valuable: 'yes',
        Action: 'no'
    }
});

/* SET DIMENSION */
JsAnalytics.setDimension({
    UserStatus: 'logged',
    AccessType: 'premium',
    PaymentType: 'gwallet'
});

/* TRACK EVENT */
JsAnalytics.trackEvent({
    category: 'Categoria',
    action: 'Azione',
    label: 'Etichetta',
    value: 6,
    dimensions: {
        Valuable: 'yes',
        Action: 'yes'
    }
});
