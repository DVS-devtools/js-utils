/* eslint-disable import/no-extraneous-dependencies */
const { upperFirst, camelCase } = require('lodash');

/**
 * Convert dash-formatted-string to an UpperCamelCaseString
 * @param text
 */
const upperCamelcase = text => upperFirst(camelCase(text));

/**
 * From the given packageName (name field of a package.json), returns the computed Library name
 * if the package name starts with an org prefix (@something/...),
 * strip the org part when retrieving the name
 * @param packageName
 */
function getLibraryName(packageName) {
    const isOrg = packageName.indexOf('@') === 0 && packageName.indexOf('/') > 0;
    if (isOrg) {
        // get only the package name part, remove the @org part
        return upperCamelcase(packageName.split('/')[1]);
    }
    return upperCamelcase(packageName);
}

module.exports = getLibraryName;
