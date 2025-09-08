import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { IntlProvider, addLocaleData } from 'react-intl';

import LocaleProvider from './locales/locale-provider';

var lang = null;
try {
    if(process.env.REACT_APP_LOCATION==='CHINESE'){
        lang = require( './locales/zh-Hans').default;
    }
    else {
        lang = require( './locales/en-US').default;
    }

    if (lang && lang.data) {
        addLocaleData(...lang.data);
    }

    ReactDOM.render(
        <LocaleProvider locale={lang}>
            <IntlProvider
                locale={lang.locale}
                messages={lang.messages}
                formats={lang.formats}
            >
                    <App />
            </IntlProvider>
        </LocaleProvider>, 
        document.getElementById('root'));
} catch (error) {
    console.error('Error loading locale:', error);
    // Fallback: render app without localization
    ReactDOM.render(<App />, document.getElementById('root'));
}

registerServiceWorker();
