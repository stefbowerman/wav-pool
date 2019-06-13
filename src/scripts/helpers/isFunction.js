export default (arg) => {
  return arg && {}.toString.call(arg) === '[object Function]';
};