import dayjs from "dayjs";
import "dayjs/locale/sr";

// plugins

//  --deps
import pluginUtc from "dayjs/plugin/utc";
import pluginTimezone from "dayjs/plugin/timezone";

import pluginCustomParseFormat from "dayjs/plugin/customParseFormat";
import pluginIsLeapYear from "dayjs/plugin/isLeapYear";
import pluginObjectSupport from "dayjs/plugin/objectSupport";
import pluginArraySupport from "dayjs/plugin/arraySupport";
import pluginRelativeTime from "dayjs/plugin/relativeTime";
import pluginWeekday from "dayjs/plugin/weekday";
import pluginIsoWeek from "dayjs/plugin/isoWeek";
import pluginDayOfYear from "dayjs/plugin/dayOfYear";

//  --deps
import pluginWeekOfYear from "dayjs/plugin/weekOfYear";
import pluginWeekYear from "dayjs/plugin/weekYear";

import pluginQuarterOfYear from "dayjs/plugin/quarterOfYear";
import pluginToArray from "dayjs/plugin/toArray";
import pluginToObject from "dayjs/plugin/toObject";

import pluginMinMax from "dayjs/plugin/minMax";

// --durations
import pluginDuration from "dayjs/plugin/duration";

import pluginAdvancedFormat from "dayjs/plugin/advancedFormat";
import pluginLocalizedFormat from "dayjs/plugin/localizedFormat";

// dayjs/plugin/updateLocale --custom-locales
// dayjs/plugin/localeData
// dayjs/plugin/calendar
// dayjs/plugin/isSameOrBefore
// dayjs/plugin/isSameOrAfter
// dayjs/plugin/isBetween

// use .sr locale globally
dayjs.locale("sr");

// https://day.js.org/docs/en/parse/utc#:~:text=While%20in%20UTC%20mode%2C%20all%20display%20methods%20will%20display%20in%20UTC%20time%20instead%20of%20local%20time.
//  To switch from UTC to local time, you can use dayjs#utc or dayjs#local.
//  --deps
dayjs.extend(pluginUtc);
dayjs.extend(pluginTimezone);

// https://day.js.org/docs/en/parse/string-format#:~:text=Pass%20the%20locale%20key%20as%20the%20third%20parameter%20to%20parse%20locale%2Daware%20date%20time%20string.
dayjs.extend(pluginCustomParseFormat);

dayjs.extend(pluginIsLeapYear);
dayjs.extend(pluginObjectSupport);
dayjs.extend(pluginArraySupport);

// https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(pluginRelativeTime);

dayjs.extend(pluginWeekday);
dayjs.extend(pluginIsoWeek);
dayjs.extend(pluginDayOfYear);

//  --deps
dayjs.extend(pluginWeekOfYear);
dayjs.extend(pluginWeekYear);

dayjs.extend(pluginQuarterOfYear);
dayjs.extend(pluginToArray);
dayjs.extend(pluginToObject);
dayjs.extend(pluginMinMax);

// --durations
dayjs.extend(pluginDuration);

dayjs.extend(pluginAdvancedFormat);
dayjs.extend(pluginLocalizedFormat);

export default defineNuxtPlugin({
  name: "datetime",
  parallel: true,
  setup: (_nuxtapp) => {
    return {
      provide: {
        dayjs,
        // ##alias
        dd: dayjs,
      },
    };
  },
});
