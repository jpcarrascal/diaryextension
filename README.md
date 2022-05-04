# Chrome extension for diary studies

**This README is still incomplete!**

This extension allows you to run a diary study on a web site. It prompts participants to enter a diary entry when they visit the site,
and uses a Google Form to collect the diary data.

## How it works

This extension is triggered under two conditions:
1. _When your participant visits the URL of interest._ The first time the participant visits this URL after installing the extension,
they will be asked for a username. This will happen only once.
When participants visit the URL (or domain) again (e.g., when they navigate within the domain or reload the page),
they will be asked to add a diary entry. They can accept to add an entry or they can skip it.
If they accept to do it, they won't be asked again until the next day.

2. _When the participant visits the diary form._ If a participant accepts to complete an entry,
they will be redirected to your Google Form.
The form will automatically store the participant's username and the URL they were visitng when they added the entry.

## Preparation and configuration:
Create your diary form in Google Forms. **Important:** make sure to include these two questions in your form:
- DIARY-USERNAME: Will be used to automatically collect the participant's user name
- DIARY-URL: Will collect the URL that was being visited when the participant decided to add a diary entry
_("DIARY-USERNAME" and "DIARY-URL" should be the question text.)_

Then, before distributing the diary, configure the extension:

1. In the _manifest.json_ file, go to the `content_scripts` section and change the value of the first `matches` element to the URL
that you want to trigger the diary, i.e., the site you want to test.
Use only the doman and add an asterisk (*) at the end if you want every page in the domain to trigger the diary.

2. Also in _manifest.json_, in `content_scripts`, change the value of the second `matches` to your Google Form URL.
Make sure to include everything until "vieform". _Remove anything else after that and end it with an asterisk (*)_.

3. In the _prompt.js_ file, change the contents of the `requestUsernameString`  and `requestEntryString` variables to your liking.
These variable are the messages displayed when collecting the username and when asking the participant to add a diary entry.
(tip: you can also change the language of these messages). Finally, the `secondsBeforePrompt`
will determine how long (in seconds) after opening a page the participant will be asked to complete a diary entry.

## Installation:
As this extension is not distributed through the Chrome store, study participants need to follow a different procedure.
It is explained here:
https://stackoverflow.com/questions/24577024/install-chrome-extension-form-outside-the-chrome-web-store


## TODO:
* Support for Firefox
* Test on other chromium browsers (Edge), and Safari.
* Implementing other trigger rules based in the number of visited pages, or nomber of times a specific page is visited

