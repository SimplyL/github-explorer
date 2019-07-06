### Application setup

To run the application, rename .env.example file to .env and provide your personal token, which can be aquired here:
https://github.com/settings/tokens

### Notes

Contributor count is not provided by github repository search api,
I implemented a work arround using pagination query for contributor list api and extracting data from response headers.
This gives more results, but also has a limitation of 800 conributors.
