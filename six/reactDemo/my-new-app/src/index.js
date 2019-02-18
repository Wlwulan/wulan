import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import FastClick from 'fastclick';//移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick。
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppContainer } from 'react-hot-loader';//热更新
import {Provider} from 'react-redux';//React-Redux 提供Provider组件，可以让容器组件拿到state。
import store from '@/store/store';
import './style/base.css';

FastClick.attach(document.body)
//ReactDOM.render(<App />, document.getElementById('root'));
//Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了
const render = Component => {
    ReactDOM.render(
      //绑定redux、热加载
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      document.getElementById('root'),
    )
  }
  
  render(Route);
  
  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./router/', () => {
      render(Route);
    })
  }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
