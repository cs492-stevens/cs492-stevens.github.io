AUTHOR = 'Ryan Tsang'
SITENAME = 'cs492-stevens'
SITEURL = ""

PATH = 'content'
STATIC_PATHS = [
    'images',
    'static/css',
    'static/js',
]
PAGE_PATHS = [
    'pages',
]
OUTPUT_PATH = 'docs'

THEME = 'theme/editorial'

TIMEZONE = 'US/Eastern'

DEFAULT_LANG = 'en'
DEFAULT_CATEGORY = 'misc'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# INDEX_SAVE_AS = 'blog.html'

# READERS = { 'html': None }

# Blogroll
LINKS = (
    ("Canvas", "canvas", "https://sit.instructure.com/courses/85333"),
    ("Gradescope", "gradescope", "https://www.gradescope.com/courses/1206265"),
    ("Discord", "discord", "#"),
    ("Github", "git-alt", "https://github.com/cs492-stevens"),
)

# Social widget
SOCIAL = (
    # ("You can add links in your config file", "#"),
    # ("Another social link", "#"),
)

STAFF = (
    ("Ryan Tsang", "rtsang1@stevens.edu", "GS247 M 3:00 - 5:00pm"),
    ("Aya Salama", "asalama@stevens.edu", "TBD"),
    ("Brayden Abo", "babo@stevens.edu", "GS226 T 12:00 - 2:00pm"),
    ("Nicole Young", "nyoung2@stevens.edu", "TBD"),
)

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
