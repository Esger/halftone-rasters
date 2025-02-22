import environment from './environment.js';
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-portal-attribute'))
        .feature(PLATFORM.moduleName('resources/index'));

    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
