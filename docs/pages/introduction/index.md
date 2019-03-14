## First, What's The Press?
Static website generators are now quite popular; and for a good reason: they remove the hassle of managing a server. Every now and then, I try a new generator, deploy a test on a GitHub page and it usually work pretty well. **So what's the problem with static site generator?**   
Well, in my opinion, they are still a pain to use: you need to have this *node* app installed, remember what is the command line to add a new blog post (or have a *npm* script for it, but you still need to remember how you configured it), and then you have to deal with two versions of your content: the one for editing, usually in *markdown*, and the one generated, in *html*.

**The Press** takes the other way: no building of *html*, no script to launch whatever  routine to process stuff, just writing content in *markdown* and add some metadata to your new article or page.

## How does the routing work?
While a regular website has routing like `www.website.com/articles/my-last-article`, The Press uses the `hash` to produce routes like that: `www.website.com/#articles/my-last-article`.  
The advantage of the hash is that it's purely client side, no server pinging, no page reload,  it's all managed dynamically by The Press.

## And then?
Without getting to much into detail, here is the essence of it:
- the file `config.json` is loaded from the root of the website. This file contains some metadata about the website as well as the subfolders to find `pages`and `articles` material.
- Reads the `list.json` files from the `pages` and `articles` folders. Those list contain *IDs* of pages and articles, respectively. Those *IDs* also happen to be the folder name and, later, the route under which to file the content. (they must be lowercase, dash separated words)
- For each page from the list, a folder and for each folder a `config.json` containing some metadata and a `index.md` with the content of the page (like the one you are currently reading)
- Internally index all the pages metadata, but the content will only be loaded on demand, when the routing takes us to a specific page
- For the article, it goes a bit differently because we may have quite a lot of articles so The Press loads only the list of *IDs* and will load later, on demand, the metadata and/or the content.
- The part in part of routing will look for few *URL* patterns like `#some-page`, `#articles/some-article`, `#tag/my-tag` or simply `#`. Then, it will extract the kind of data the user wants to see and the *ID* of it
- The queried content is loaded and the markdown is converted into *html*
- The builder part reads the *handlebars* template from `index.html` and inject the loaded content into the page

## Want to make your own?
The best way is to [download](https://raw.githubusercontent.com/jonathanlurie/thepress/master/samples/site.zip) a copy of this website and follow the [tutorials](https://thepress.jnth.io/) to build your very own.
