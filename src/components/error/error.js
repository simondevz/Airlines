import { useRouteError } from "react-router-dom";

function ErrorPage() {
  let error = useRouteError();
  console.log(error);

  return (
    <>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        {error.data.msg}
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        Status Code: {error.status}
      </p>
    </>
  );
}

export default ErrorPage;
