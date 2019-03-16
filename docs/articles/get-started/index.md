## Start easily
The best way get started is to [download](https://raw.githubusercontent.com/jonathanlurie/thepress/master/samples/site.zip) a copy of this website and modify it.  
Once you uncompress the archive, you will see file that are mandatory for the *machinery* and file that are actual content.

## File structure
On the root directory, you will file files and folder that we can put in the following categories:

### Regular website folders and files
(folder in **bold**, files in *italic*)
- **assets**: contain some images
- **css**: contain the style sheets
- *favicon.png*: the little icon to show in the browser
- *index.html*: the entry point of the website

### Files and folders necessary to The Press
(folder in **bold**, files in *italic*)
- **js**: Javascript files, including `thepress.js`
- **articles**: the list of articles `list.json` and a folder for each article
- **pages**: the list of pages `list.json` and a folder for each page
- *config.json*: the main configuration file

## The main configuration file
As we've seen, there is a file named `config.json` at the root of the website.  Here is how it looks like:

``` js
{
  /* These are all the information you may show on your site */
  "site": {
    /* The title of your website */
    "title": "The Press",
    /* An optional subtitle */
    "subtitle": "The static site non-generator.",
    /* The author, most likely you */
    "author": "Jonathan Lurie",
    /* The logo, can also be an absolute URL */
    "logo": "assets/logo.png",
    /* An optional alternative logo */
    "logoAlternative": "assets/logo_white_alpha.png",
    /* The cover, usually a quite large image */
    "cover": "assets/cover_2000.jpg"
  },

  /* These are technical information to make The Press work properly */
  "content":{
    /* The directory to look for the pages, just unde the root dir */
    "pageDir": "pages",
    /* The directory to look for the articles, just unde the root dir */
    "articleDir": "articles",
    /* The number of articles to show on the list, aka. the pagination */
    "articlesPerPage": 2
  }
}
```
Note: JSON files are not compatible with comments but for the sake of this tutorial, I've added some anyway. Don't have comment in a JSON file you will actually use!

> **Important**   
> This configuration file **has** to be named `config.json` and must be at the root directory.

## The page folder
As shown in the section above, this folder is pointed by the property `pageDir` in the main configuration file. Inside this **pages** folder, you will find:
- The listing of pages `list.json`
- some folders, one per page

### Listing the pages
This file is a simple JSON array, and the order is the same as the menu order. You can decide later which page will show in the menu and which won't, but still, they all have to be in this list.

> **Important**   
> This listing file **has** to be named `list.json` and must be in the folder pointed by the field `pageDir`.

### Each page's folder
You may notice that the folders are all named with lower case and dash separated, aka. in *kebab case*. This string is actually the *ID* of the page and is the same as how it will show in the URL. The page listing file is actually a list of *IDs*.

Inside each individual page folder, you will again find the following:
- A file `config.json` specific to this very page
- A file `index.md` with the text content of the page in *markdown*
- Some image files you may wan to use in this page, including the *cover*

The file `config.json` is quite short and self explanatory, still, let's have a look at it:
``` js
{
  /* The page title */
  "title": "Introduction",
  
  /* The cover, to store in the same folder. Can also be an absolute path starting with 'http://' or 'https://' */
  "cover": "intro-cover.jpg",
  
  /* Do you want the menu to show a link to this page? */
  "showInMenu": true
}
```

The file `index.md` is a regular markdown file, and if you use images that are stored in the same directory, their paths must be **relative**. Example:

``` markdown
bla bla bla, next line is how we display an image in markdown  
![some optional alternative text](my-cover.jpg)
```
Here, The Press expects to find a file named `my-cover.jpg` in this page's folder.

> **Important**   
> The page configuration file as well as the content file **must** be named this way.

## The articles folder
Now, that you are familiar with how the page work in The Press, there won't be a lot of surprise, just some extra metadata relative to the article that the pages don't have.  
The articles' folder is one pointed by the field `articleDir` in the main configuration file. This folder contain the following:
- The listing of pages `list.json`
- some folders, one per article

### Listing the articles
This file is a simple JSON array, and the order is the same as the menu order. Unlike most blogging engine/platform, The Press does not sort your articles's metadata per date to decide the order automatically based on that. No, here, you decide by ordering this list, and if you want to follow your own ordering logic, do it.

> **Important**   
> This listing file **has** to be named `list.json` and must be in the folder pointed by the field `articleDir`.

### Each article's folder
Exactly like for the pages, the folders are named following the *kebab case* and this name serves also as article *ID*. You can chose this *ID*, it does not have to be a lowercase-dash-separated version of your article's title, but keep in mind it will also be the URL of the article.

Inside each individual article folder, you will again find the following:
- A file `config.json` specific to this very article
- A file `index.md` with the text content of the article in *markdown*
- Some image files you may wan to use in this page, including the *cover*

The file `config.json` is slightly longer than for the page:
``` js
{
  /* The title of the article */
  "title": "Get started",
  
  /* The author of this article, can be different from the main config author */
  "author": "Jonathan Lurie",
  
  /* The date, in whichever format you feel like showing on your site */
  "date": "16 March 2019",
  
  /* some tags, coma separated. Don`t bother with uppercase, they will be lowercased anyway*/
  /* Multiword tag must dash-separated, not space separated */
  "tags": "tutorial, howto",
  
  /* A sentence of two about what you are going to share */
  "excerpt": "Setup everything and get ready to write content!",
  
  /* The cover, to store in the same folder. Can also be an absolute path starting with 'http://' or 'https://' */
  "cover": "cover.jpg",
  
  /* Whether or not it will show on your website */
  "published": true
}

```

The file `index.md` is a regular markdown file, and if you use images that are stored in the same directory, their paths must be **relative**. Example:

``` markdown
bla bla bla, next line is how we display an image in markdown  
![some optional alternative text](my-cover.jpg)
```
Here, The Press expects to find a file named `my-cover.jpg` in this page's folder.

> **Important**   
> The article configuration file as well as the content file **must** be named this way.

## Run the example website
Since The Press is loading content dynamically, it needs a local web server to be tested. There are thousands of was to do that, the simpler is probably to a Python command (as you probably have Python shipped with your computer).  
In a terminal, change the directory to the root of your sample website:

(with Python 3)
```bash
$ cd /path/to/site
$ python -m http.server
```

(or with Python 2)
```bash
$ cd /path/to/site
$ python -m SimpleHTTPServer
```
Then, it shows a URL, open it in your web browser.

## What's next?
I can only advise you to use this archive you've downloaded and play with it before starting you own new thing. Modify metadata, edit content, add a dummy page, add some *lorem ipsum* articles, break it, fix it, experiment!
