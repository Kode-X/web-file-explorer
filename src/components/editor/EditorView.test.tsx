import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditorView from "./EditorView";
import { act } from "react";

describe("EditorView", () => {
  const setFileContent = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders textarea when isEditing is true", () => {
    act(() => {
      render(
        <EditorView
          isEditing={true}
          fileContent="Some content"
          setFileContent={setFileContent}
        />
      );
    });

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.queryByText("Some content")).not.toBeInTheDocument();
  });

  test("renders pre element when isEditing is false", () => {
    act(() => {
      render(
        <EditorView
          isEditing={false}
          fileContent="Some content"
          setFileContent={setFileContent}
        />
      );
    });

    expect(screen.getByText("Some content")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  test("textarea value changes correctly and calls setFileContent", () => {
    act(() => {
      render(
        <EditorView
          isEditing={true}
          fileContent="Some content"
          setFileContent={setFileContent}
        />
      );
    });

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New content" } });

    expect(setFileContent).toHaveBeenCalledWith("New content");
  });
});
