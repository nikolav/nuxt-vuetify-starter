export default defineNuxtPlugin((nuxtapp) => {
  // declare `v-effect:<type>="<{ watch, duration?, onEnd? }>"` directive
  // apply `animate.css` effects to dom elements
  nuxtapp.vueApp.directive("effect", (el, binding) => {
    const {
      effect: { default: defaultType, duration: defaultDuration },
    } = useAppConfig();
    const value$ = get(binding, "value.watch");
    const duration = get(binding, "value.duration") || defaultDuration;
    const onEnd = get(binding, "value.onEnd") || noop;
    const type = get(binding, "arg") || defaultType;
    const ANIMATED_ = "animate__animated";
    const animation_ = `animate__${type}`;

    const animatecss_ = () =>
      new Promise((resolve) => {
        // @cleanup --remove-effect-classes
        const cleanup_ = (evt: any) => {
          evt.stopPropagation();
          el.classList.remove(ANIMATED_, animation_);
          resolve(evt);
        };
        el.addEventListener("animationend", cleanup_, { once: true });

        // effect config
        el.style.setProperty(
          "--animate-duration",
          `${isNumeric(duration) ? duration / 1000 + "s" : duration}`
        );

        // trigger effect
        el.classList.add(ANIMATED_, animation_);
      });

    // @value:changed --run-effect
    watch(
      () => toValue(value$),
      async (val) => {
        if (!val) return;
        try {
          onEnd(await animatecss_());
        } catch (error_) {
          // pass
        }
      }
    );
  });
});
// <CartButton v-effect:headShake="{ watch: isActive$ }"/>

// @@Attention seekers
// bounce: 1,
// flash: 1,
// headShake: 1,
// heartBeat: 1,
// jello: 1,
// pulse: 1,
// rubberBand: 1,
// shakeX: 1,
// shakeY: 1,
// swing: 1,
// tada: 1,
// wobble: 1,
// //
// // @@Back entrances
// backInDown: 1,
// backInLeft: 1,
// backInRight: 1,
// backInUp: 1,
// //
// // @@Back exits
// backOutDown: 1,
// backOutLeft: 1,
// backOutRight: 1,
// backOutUp: 1,
// //
// // @@Bouncing entrances
// bounceIn: 1,
// bounceInDown: 1,
// bounceInLeft: 1,
// bounceInRight: 1,
// bounceInUp: 1,
// //
// // @@Bouncing exits
// bounceOut: 1,
// bounceOutDown: 1,
// bounceOutLeft: 1,
// bounceOutRight: 1,
// bounceOutUp: 1,
// //
// // @@Fading entrances
// fadeIn: 1,
// fadeInDown: 1,
// fadeInDownBig: 1,
// fadeInLeft: 1,
// fadeInLeftBig: 1,
// fadeInRight: 1,
// fadeInRightBig: 1,
// fadeInUp: 1,
// fadeInUpBig: 1,
// fadeInTopLeft: 1,
// fadeInTopRight: 1,
// fadeInBottomLeft: 1,
// fadeInBottomRight: 1,
// //
// // @@Fading exits
// fadeOut: 1,
// fadeOutDown: 1,
// fadeOutDownBig: 1,
// fadeOutLeft: 1,
// fadeOutLeftBig: 1,
// fadeOutRight: 1,
// fadeOutRightBig: 1,
// fadeOutUp: 1,
// fadeOutUpBig: 1,
// fadeOutTopLeft: 1,
// fadeOutTopRight: 1,
// fadeOutBottomRight: 1,
// fadeOutBottomLeft: 1,
// //
// // @@Flippers
// flip: 1,
// flipInX: 1,
// flipInY: 1,
// flipOutX: 1,
// flipOutY: 1,
// //
// // @@Lightspeed
// lightSpeedInRight: 1,
// lightSpeedInLeft: 1,
// lightSpeedOutRight: 1,
// lightSpeedOutLeft: 1,
// //
// // @@Rotating entrances
// rotateIn: 1,
// rotateInDownLeft: 1,
// rotateInDownRight: 1,
// rotateInUpLeft: 1,
// rotateInUpRight: 1,
// //
// // @@Rotating exits
// rotateOut: 1,
// rotateOutDownLeft: 1,
// rotateOutDownRight: 1,
// rotateOutUpLeft: 1,
// rotateOutUpRight: 1,
// //
// // @@Specials
// hinge: 1,
// jackInTheBox: 1,
// rollIn: 1,
// rollOut: 1,
// //
// // @@Zooming entrances
// zoomIn: 1,
// zoomInDown: 1,
// zoomInLeft: 1,
// zoomInRight: 1,
// zoomInUp: 1,
// //
// // @@Zooming exits
// zoomOut: 1,
// zoomOutDown: 1,
// zoomOutLeft: 1,
// zoomOutRight: 1,
// zoomOutUp: 1,
// //
// // @@Sliding entrances
// slideInDown: 1,
// slideInLeft: 1,
// slideInRight: 1,
// slideInUp: 1,
// //
// // @@Sliding exits
// slideOutDown: 1,
// slideOutLeft: 1,
// slideOutRight: 1,
// slideOutUp: 1,
