/**
 * Breakpoint Helper Functions / constants
 * -----------------------------------------------------------------------------
 * A collection of functions that help with dealing with site breakpoints in JS
 * All breakpoint properties should be defined here
 *
 */

// Match those set in variables.scss
const breakpointMinWidths = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440
};

/**
 * Get one of the widths stored in the variable defined above
 *
 * @param {string} key - string matching one of the key names
 * @return {int} - pixel width
 */
export function getBreakpointMinWidth(key) {
  let w;

  if (breakpointMinWidths.hasOwnProperty(key)) {
    w = breakpointMinWidths[key];
  }

  return w;
}