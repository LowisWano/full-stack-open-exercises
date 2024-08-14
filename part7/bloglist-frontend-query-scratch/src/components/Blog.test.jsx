import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";

import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

const test_blog = {
  title: "This is the title",
  author: "Butcher D. Author",
  url: "https://www.youtube.com/watch?v=PmHlYDAxSOM",
  likes: 0,
  user: {
    id: "66ab2f9b09711f276ddb6d23",
    name: "hachikuji mayoi",
    username: "mayoi",
  },
};

const test_user = {
  name: "luis",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1aXMiLCJpZCI6IjY2YWI2NGFkNTY2MDNlZTUzYjg3MzkzMCIsImlhdCI6MTcyMjY4NjQxNX0.T1hGvQaRcvlOWZMKWbb4yGmHyYssEtZ7yEW_Mz33qxI",
  username: "luis",
};

describe("Blog component", () => {
  let container;
  let mockHandler;
  beforeEach(() => {
    mockHandler = vi.fn();
    container = render(
      <Blog blog={test_blog} user={test_user} updateLikesBlog={mockHandler} />,
    ).container;
  });

  test("Blog renders its title and author but not url and number of likes", () => {
    const element = screen.getByText(`${test_blog.title} ${test_blog.author}`);
    const div = container.querySelector(".showWhenVisible");
    expect(element).toBeDefined();
    expect(div).toHaveStyle("display: none");
  });

  test("URL and number of likes is shown when show button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const div = container.querySelector(".showWhenVisible");
    expect(div).not.toHaveStyle("display: none");
  });

  test("like button event handler is called twice when like button is clicked twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

test("form event handler is called with the right details when a new blog is created", async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlog createNewBlog={mockHandler} />);

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");
  const createButton = screen.getByText("create");

  await userEvent.type(title, "This is the title");
  await userEvent.type(author, "Butcher D. Author");
  await userEvent.type(url, "https://www.youtube.com/watch?v=PmHlYDAxSOM");
  await userEvent.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("This is the title");
  expect(mockHandler.mock.calls[0][0].author).toBe("Butcher D. Author");
  expect(mockHandler.mock.calls[0][0].url).toBe(
    "https://www.youtube.com/watch?v=PmHlYDAxSOM",
  );
});
