import Vue from 'vue'
import moment from 'moment'

// {{表达式 | 过滤器}}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
