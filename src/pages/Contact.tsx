export const Contact = () => {
  return (
    <>
      <header>
        <h1>Let's create something great together</h1>
        <h2>
          I'm always looking for new and exciting projects. Let's make something
          beautiful.
        </h2>
      </header>
      <form>
        <p>Contact me</p>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Contact;
