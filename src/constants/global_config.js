
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
window.globalParams = {
  locale :locale,
  moment :moment,
  env:process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
}
