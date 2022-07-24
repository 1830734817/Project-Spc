/*
 * @Description: 修改主题，参考 
                 https://blog.csdn.net/lao_guolao_guo/article/details/107296775
                 https://github.com/mzohaibqc/antd-theme-generator
 * @version: 
 * @Author: shoen
 * @Date: 2020-11-25 14:02:55
 * @LastEditors: shoen
 * @LastEditTime: 2020-12-24 14:14:29
 */
const path = require('path');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, './src/css'),                // 自定义样式目录：all files with .less extension will be processed
  antDir: path.join(__dirname, './node_modules/antd'),         // antd包目录
  varFile: path.join(__dirname, './src/css/vars.less'),        // 自定义样式入口文件：default path is Ant Design default.less file
  mainLessFile: path.join(__dirname, './src/css/main.less'),   // 自定义样式入口文件
  themeVariables: [                                            // 需要改写的antd主题变量
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background',
    '@menu-item-color',
    '@menu-item-active-bg',
    '@menu-dark-item-active-bg',
    '@menu-dark-submenu-bg',
  ],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/color.less'), // 输出less文件路径
}

generateTheme(options)
  .then(less => {
    console.log('Theme generated successfully');
  })
  .catch(error => {
    console.log('Error', error);
  });
