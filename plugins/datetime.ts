import dayjs from "dayjs";
// plugins
import pluginUtc from "dayjs/plugin/utc";
import pluginCustomParseFormat from "dayjs/plugin/customParseFormat";
// import pluginIsLeapYear from "dayjs/plugin/isLeapYear";
// import pluginObjectSupport from "dayjs/plugin/objectSupport";
//
dayjs.extend(pluginUtc);
dayjs.extend(pluginCustomParseFormat);
// dayjs.extend(pluginIsLeapYear);
// dayjs.extend(pluginObjectSupport);
//
export default defineNuxtPlugin({
  name: "datetime",
  parallel: true,
  setup: (nuxtapp) => {
    return {
      provide: {
        dayjs,
      },
    };
  },
});
