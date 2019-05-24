/*
 * Copyright (c) 2018-2025, Wilson All rights reserved.
 *
 * Author: Wilson
 */

import Clipboard from './clipboard'

const install = function (Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = install
export default Clipboard
