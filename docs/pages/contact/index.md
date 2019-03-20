Follow me on Twitter [@jonathanlurie](https://twitter.com/jonathanlurie) and have a look at my [Github](https://github.com/jonathanlurie).

<style>
  input, textarea {
    border: solid 1px #ccc;
    font-size: 20px;
    padding: 8px;
    outline: none;
  }

  #contact-form {
    width: 100%;
  }

  #contact-form textarea {
    margin-top: 16px;
    margin-bottom: 16px;
    width: 100%;
    min-width: 100%;
    min-height: 150px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }

  #contact-form input[type="submit"] {
    width: 100%;
    transition: all 0.2s;
  }

  #contact-form input[type="submit"]:hover {
    background: #000;
    color: #FFF;
    border-color: #000;
  }


</style>

<form id="contact-form" method="post" action="https://formspree.io/&#104;&#101;&#108;&#108;&#111;&#64;&#106;&#111;&#110;&#97;&#116;&#104;&#97;&#110;&#108;&#117;&#114;&#105;&#101;&#46;&#102;&#114;">
  <div>
    <div class="grid">
      <input type="text" name="name" id="name" placeholder="Name" />
      <input type="email" name="_replyto" id="email" placeholder="Email" />
    </div>
    <textarea name="message" id="message" placeholder="Message" rows="4"></textarea>
    <input type="submit" value="Send Message" />
  </div>
</form>
