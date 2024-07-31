import { createBoard } from "@wixc3/react-board";

export default createBoard({
  name: "Settings",
  Board: () => (
    <div>
      <input type="checkbox" />
      <h1>Settings</h1>
      <nav>
        <a href="/home">Home</a> | <a href="/projects">Projects</a> |{" "}
        <a href="/about">About</a> | <a href="/contact">Contact Us</a>
      </nav>
    </div>
  ),
  isSnippet: true,
});
