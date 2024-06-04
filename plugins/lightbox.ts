import * as fancyappsui from "@fancyapps/ui";
import { type userSlideType } from "@fancyapps/ui/types/Carousel/types";
import { type OptionsType } from "@fancyapps/ui/types/Fancybox/options";

const { Fancybox } = fancyappsui;

const DEFAULT_OPTIONS = {
  // mainClass: ""
  // showClass
  // hideClass
  closeExisting: true,
  startIndex: 0,
  // Toolbar: {
  //   display: {
  //     left: [],
  //     middle: [
  //     "zoomIn",
  //     "zoomOut",
  // "toggle1to1",
  // "toggleZoom",
  // "panLeft",
  // "panRight",
  // "panUp",
  // "panDown",
  // "rotateCCW",
  // "rotateCW",
  // "flipX",
  // "flipY",
  // "fitX",
  // "fitY",
  // "reset",
  // "toggleFS"
  //     ],
  //     right: [
  //   "slideshow",
  //   "thumbs",
  //   "close",
  //   "infobar",
  //   "prev",
  //   "next",
  //   "download",
  //   "slideshow",
  //   "fullscreen",
  //      --custom
  //   "facebook",
  // ],
  //   },
  //   --custom-btn
  // items: {
  //   --name
  //   facebook: {
  //     --html
  //     tpl: `<button class="f-button"><svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></button>`,
  //       --actions
  //     click: () => {
  //       window.open(
  //         `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //           window.location.href
  //         )}&t=${encodeURIComponent(document.title)}`,
  //         "",
  //         "left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
  //       );
  //     },
  //   },
  // },
  // }
};
export default defineNuxtPlugin((_nuxtApp) => {
  // {
  //   src     : any # target to lightbox
  //   caption : string
  //   thumb   : string
  //   type    : "image" | "iframe" | "video" | "pdf" | "inline" | "html"| "ajax" | "youtube" | "vimeo"
  const open = (slides?: userSlideType[], options?: Partial<OptionsType>) =>
    Fancybox.show(slides, assign({}, DEFAULT_OPTIONS, options));
  const close = (closeAll: boolean = true) => Fancybox.close(closeAll);
  const instance = () => Fancybox.getInstance();
  const lightbox = {
    Fancybox,
    open,
    close,
    instance,
  };

  return {
    provide: { lightbox },
  };
});
