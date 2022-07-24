/*
 * @Description: 
 * @version: 
 * @Author: shoen
 * @Date: 2021-11-21 15:36:13
 * @LastEditors: shoen
 * @LastEditTime: 2021-11-21 22:54:53
 */
const sum = require('../src/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});