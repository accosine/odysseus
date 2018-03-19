const scripts = {
  youtube: 'youtube',
  gif: 'anim',
  soundcloud: 'soundcloud',
  vimeo: 'vimeo',
  instagram: 'instagram',
  gfycat: 'gfycat',
  fittext: 'fit-text',
  facebook: 'facebook',
  facebookcomments: 'facebook-comments',
  pinterest: 'pinterest',
  playbuzz: 'playbuzz',
  twitter: 'twitter',
  iframe: 'iframe',
};

export default usedShortcodes =>
  usedShortcodes
    .map(shortcode => (scripts[shortcode] ? scripts[shortcode] : false))
    .filter(Boolean);
