import { formatDate } from '@/utils/formatDate';

export default {
  install(app) {
    app.config.globalProperties.$formatDate = formatDate;
  },
};