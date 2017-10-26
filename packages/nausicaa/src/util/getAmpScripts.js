const scripts = {
  youtube: 'youtube',
  gif: 'anim',
};

export default usedShortcodes =>
  usedShortcodes
    .map(shortcode => (scripts[shortcode] ? scripts[shortcode] : false))
    .filter(x => x);
