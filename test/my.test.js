/**
 * LoginPage 测试样例
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'mobx-react';
import LoginPage from '../src/layouts/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { THEME_LIST } from '../src/constants/theme_config'

window.matchMedia = window.matchMedia || function() {
  return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
  };
};

describe('LoginPage', () => {
  test('renders App component', () => {
    const { getByText } = render(
      <Provider HomeStore>  
        <BrowserRouter>
          <LoginPage/>
        </BrowserRouter> 
      </Provider>
    );

    expect(screen.queryByText('记住密码')).toBeInTheDocument();
    expect(screen.queryByText(/记住/)).toBeInTheDocument();
    expect(getByText('登 录')).toBeInTheDocument();

    screen.debug();
  });
});  
