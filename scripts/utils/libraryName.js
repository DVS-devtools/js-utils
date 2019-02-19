/* eslint-disable import/no-extraneous-dependencies */
const { upperFirst, camelCase } = require('lodash');

const upperCamelcase = text => upperFirst(camelCase(text));

function getLibraryName(packageName) {
    const isOrg = packageName.indexOf('@') === 0 && packageName.indexOf('/') > 0;
    if (isOrg) {
        return upperCamelcase(packageName.split('/')[1]);
    }
    return upperCamelcase(packageName);
}

module.exports = getLibraryName;
