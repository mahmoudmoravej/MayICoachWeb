// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import Managers from "../route";

describe("Group of tests", () => {
  it.skip("renders loader data", async () => {
    // // ⚠️ This would usually be a component you import from your app code
    // function MyComponent() {
    //   const data = useLoaderData() as { message: string };
    //   return <p>Message: {data.message}</p>;
    // }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Managers,
        // loader() {
        //   return json({ message: "hello" });
        // },
      },
    ]);

    render(<RemixStub />);

    await waitFor(() => screen.findByText("Message: hello"));
    // expect(screen.getByText("Message: hello")).not.to.be.null;
  });
});
