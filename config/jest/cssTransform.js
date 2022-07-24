/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-05-12 14:24:52
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-21 17:11:13
 */
'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform';
  },
};
